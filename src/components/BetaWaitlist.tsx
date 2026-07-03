"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  /** Project name, sent along so we know which waitlist this is. */
  project: string;
  /** Platforms offered as pickers; omit for a platform-less beta. */
  platforms?: string[];
  /** Optional line under the heading. */
  blurb?: string;
};

export function BetaWaitlist({ project, platforms, blurb }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  // When the form was shown — the server uses this as a bot time-trap.
  const renderedAt = useRef<number>(0);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project,
          name: data.get("name"),
          email: data.get("email"),
          platform: platform || data.get("platform"),
          note: data.get("note"),
          company: data.get("company"), // honeypot
          renderedAt: renderedAt.current,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(
          body?.error || "Something went wrong. Please try again in a moment."
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="beta" className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
      <Reveal className="surface relative overflow-hidden rounded-2xl p-8 sm:p-10">
        {/* accent glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

        {status === "success" ? (
          <div className="relative flex flex-col items-center py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/30">
              <Check className="h-7 w-7 text-emerald-400" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
              You&apos;re on the list
            </h3>
            <p className="mt-2 max-w-sm text-pretty text-sm text-muted">
              We&apos;ll email you the moment the beta opens, with your invite
              and everything you need to start playing.
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow relative mb-3">Play the beta</p>
            <h2 className="relative font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Join the beta waitlist
            </h2>
            <p className="relative mt-3 max-w-xl text-pretty leading-relaxed text-muted">
              {blurb ??
                "Leave your email and we'll notify you the moment the beta opens, with instructions on how to play and get set up."}
            </p>

            <form
              onSubmit={onSubmit}
              className="relative mt-7 grid gap-4 sm:grid-cols-2"
            >
              <Field label="Name" htmlFor="wl-name" optional>
                <input
                  id="wl-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email" htmlFor="wl-email" required>
                <input
                  id="wl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>

              {platforms && platforms.length > 0 && (
                <div className="sm:col-span-2">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
                    Which platform are you on?
                    <span className="font-normal text-muted/60">(optional)</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => {
                      const active = platform === p;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPlatform(active ? "" : p)}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                            active
                              ? "border-accent/60 bg-accent/15 text-foreground"
                              : "border-border bg-white/[0.03] text-muted hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="sm:col-span-2">
                <Field label="Anything else?" htmlFor="wl-note" optional>
                  <textarea
                    id="wl-note"
                    name="note"
                    rows={3}
                    placeholder="Tell us how you'd use it, or leave blank."
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>

              {/* Honeypot — hidden from people, tempting to bots. */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="wl-company">Company</label>
                <input
                  id="wl-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs text-accent sm:col-span-2"
                >
                  {error}
                </p>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Joining…
                    </>
                  ) : status === "error" ? (
                    "Try again"
                  ) : (
                    "Notify me"
                  )}
                </button>
                <p className="mt-3 text-xs text-faint">
                  No spam — just one email when the beta is ready.
                </p>
              </div>
            </form>
          </>
        )}
      </Reveal>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-white/[0.03] px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent/60 focus:bg-white/[0.05]";

function Field({
  label,
  htmlFor,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted"
      >
        {label}
        {required && <span className="text-accent">*</span>}
        {optional && (
          <span className="font-normal text-muted/60">(optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}
