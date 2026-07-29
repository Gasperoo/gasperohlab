import { Resend } from "resend";
import { isRateLimited, record } from "@/lib/store";

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
// Same but keeps newline (0x0A) so message bodies stay multi-line.
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
  if (await isRateLimited(`rl:contact:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_SECONDS)) {
    return Response.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  // 4) Validate & normalise.
  const name = oneLine(body.name, 100);
  const email = oneLine(body.email, 254).toLowerCase();
  const phone = oneLine(body.phone, 40);
  const message = String(body.message ?? "")
    .replace(/\r\n/g, "\n")
    .replace(CONTROL_CHARS_KEEP_NL, "")
    .trim()
    .slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  // 5) Lightweight spam heuristic — flag messages stuffed with links.
  const linkCount = (message.match(/https?:\/\//gi) || []).length;
  if (linkCount > 6) {
    return Response.json({ ok: true });
  }

  // 6) Keep a copy, if a store is configured.
  //
  //    Unlike a waitlist signup, a contact message is genuinely *about* being
  //    delivered — a copy sitting in Redis that nobody reads is not a reply.
  //    So this is a backstop, not the source of truth, and a failure to write
  //    it never blocks the send.
  await record("contact", { name, email, phone, message });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return Response.json(
      { error: "Email service is not configured yet." },
      { status: 503 }
    );
  }

  // 7) Build a safe email. Recipient is fixed; the visitor's address only
  //    appears as reply-to and as escaped text in the body.
  const html = `
    <h2 style="margin:0 0 12px">New contact form message</h2>
    <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p style="margin:0 0 4px"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p style="margin:12px 0 4px"><strong>Message:</strong></p>
    <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
  `;
  const text =
    `New contact form message\n\n` +
    `Name: ${name}\nEmail: ${email}\n` +
    (phone ? `Phone: ${phone}\n` : "") +
    `\n${message}\n`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      html,
      text,
    });
    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact send failed:", err);
    return Response.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}

// Reject non-POST verbs cleanly.
export async function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
