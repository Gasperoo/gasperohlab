import { Resend } from "resend";
import { isRateLimited, record, hasDurableStore } from "@/lib/store";

// This handler processes untrusted user input, so it must run per-request.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@gasperohlab.com";
// Must be a sender on a domain you've verified in Resend.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "GASPEROHLAB <noreply@gasperohlab.com>";

// --- Rate limiting --------------------------------------------------------
// Shared with the waitlist handler and backed by Redis when it's configured;
// see lib/store.ts. The in-memory fallback there is the behaviour this file
// used to implement inline, which was really "five per serverless instance".
const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_SECONDS = 10 * 60;

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Control chars: everything 0x00-0x1F plus DEL (0x7F).
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
// Same but keeps newline (0x0A) so free-text stays multi-line.
const CONTROL_CHARS_KEEP_NL = /[\u0000-\u0009\u000B-\u001F\u007F]/g;

// Collapse to a single line and strip control chars so a value can't be
// used to inject email headers.
function oneLine(v: unknown, max: number): string {
  return String(v ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(CONTROL_CHARS, "")
    .trim()
    .slice(0, max);
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // Reject anything that isn't JSON from our form.
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // 1) Honeypot — real users never fill the hidden "company" field.
  //    Silently accept so bots don't learn they were caught.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  // 2) Time-trap — reject submissions that are implausibly fast (bots) or
  //    from a stale page.
  const renderedAt = Number(body.renderedAt);
  if (Number.isFinite(renderedAt)) {
    const elapsed = Date.now() - renderedAt;
    if (elapsed < 2500 || elapsed > 6 * 60 * 60 * 1000) {
      return Response.json({ ok: true });
    }
  }

  // 3) Rate limit per IP.
  if (await isRateLimited(`rl:waitlist:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_SECONDS)) {
    return Response.json(
      { error: "Too many signups. Please try again later." },
      { status: 429 }
    );
  }

  // 4) Validate & normalise.
  const project = oneLine(body.project, 120) || "Unknown project";
  const name = oneLine(body.name, 100);
  const email = oneLine(body.email, 254).toLowerCase();
  const platform = oneLine(body.platform, 60);
  const note = String(body.note ?? "")
    .replace(/\r\n/g, "\n")
    .replace(CONTROL_CHARS_KEEP_NL, "")
    .trim()
    .slice(0, 2000);

  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // 5) Persist before sending anything.
  //
  //    This is the whole point of the store. A signup used to exist only as an
  //    email: if Resend was down, or the message landed in the wrong folder,
  //    the address was gone — and the person who typed it had already been
  //    told they were on the list. Writing it down first means the email is a
  //    notification rather than the record.
  const stored = await record("waitlist", {
    project,
    name,
    email,
    platform,
    note,
  });

  if (!stored && hasDurableStore) {
    // Configured but unreachable. Better to ask them to try again than to
    // accept a signup we know we've lost.
    console.error("Waitlist store is configured but the write failed.");
    return Response.json(
      { error: "Could not add you to the waitlist. Please try again." },
      { status: 502 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // With a durable store the signup is safe even with no mail configured, so
    // this is only fatal when the email *is* the only record.
    console.error("RESEND_API_KEY is not set — cannot notify about signup.");
    if (!stored) {
      return Response.json(
        { error: "Signups aren't configured yet. Please try again later." },
        { status: 503 }
      );
    }
    return Response.json({ ok: true });
  }

  // 6) Build a safe email. Recipient is fixed; the visitor's address only
  //    appears as reply-to and as escaped text in the body.
  const html = `
    <h2 style="margin:0 0 12px">New beta waitlist signup</h2>
    <p style="margin:0 0 4px"><strong>Project:</strong> ${escapeHtml(project)}</p>
    ${name ? `<p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>` : ""}
    <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${platform ? `<p style="margin:0 0 4px"><strong>Platform:</strong> ${escapeHtml(platform)}</p>` : ""}
    ${note ? `<p style="margin:12px 0 4px"><strong>Note:</strong></p><p style="white-space:pre-wrap;margin:0">${escapeHtml(note)}</p>` : ""}
  `;
  const text =
    `New beta waitlist signup\n\n` +
    `Project: ${project}\n` +
    (name ? `Name: ${name}\n` : "") +
    `Email: ${email}\n` +
    (platform ? `Platform: ${platform}\n` : "") +
    (note ? `\n${note}\n` : "");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Beta waitlist — ${project}`,
      html,
      text,
    });
    if (error) throw error;
  } catch (err) {
    console.error("Waitlist notification failed:", err);
    // The signup is already on disk, so it succeeded — the failure is ours to
    // chase in the logs, not theirs to retry. Telling them otherwise would
    // produce a duplicate entry and an accurate impression that we lost it.
    if (!stored) {
      return Response.json(
        { error: "Could not add you to the waitlist. Please try again." },
        { status: 502 }
      );
    }
  }

  return Response.json({ ok: true });
}

// Reject non-POST verbs cleanly.
export async function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
