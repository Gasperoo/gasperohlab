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
    <section id="beta" className="mx-auto w-full max-w-[76rem] px-5 pt-20 sm:px-8">
      <Reveal className="border-t border-border pt-10">

        {status === "success" ? (
          <div className="py-2">
            <p className="eyebrow flex items-center gap-2">
              <Check className="h-3.5 w-3.5" />
              Confirmed
            </p>
            <h3 className="t-h2 mt-5 text-[1.75rem] sm:text-[2rem]">
              You&apos;re on the list
            </h3>
            <p className="t-body mt-4 max-w-md text-pretty">
              We&apos;ll email you the moment the beta opens, with your invite
              and everything you need to start playing.
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow">Play the beta</p>
            <h2 className="t-h2 mt-5 text-[1.75rem] sm:text-[2rem]">
              Join the beta waitlist
            </h2>
            <p className="t-body mt-4 max-w-xl text-pretty">
              {blurb ??
                "Leave your email and we'll notify you the moment the beta opens, with instructions on how to play and get set up."}
            </p>

            <form
              onSubmit={onSubmit}
              className="relative mt-9 grid max-w-2xl gap-5 sm:grid-cols-2"
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
                  <span className="mb-2 flex items-center gap-1.5 text-xs text-muted">
                    Which platform are you on?
                    <span className="text-faint">(optional)</span>
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
                          className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-muted hover:border-border-strong hover:text-foreground"
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
                  className="rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs text-accent-text sm:col-span-2"
                >
                  {error}
                </p>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
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
  "w-full rounded-md border border-border bg-black/[0.015] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-border-strong focus:bg-black/[0.03]";

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
        className="mb-2 flex items-center gap-1.5 text-xs text-muted"
      >
        {label}
        {required && <span className="text-faint">*</span>}
        {optional && <span className="text-faint">(optional)</span>}
      </label>
      {children}
    </div>
  );
}
