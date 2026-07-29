"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { Check, Loader2, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  // When the form was shown — the server uses this as a bot time-trap.
  const renderedAt = useRef<number>(0);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    renderedAt.current = Date.now();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Reset back to the form a moment after closing.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
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
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
            onClick={onClose}
            aria-hidden
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-background-elevated p-8"
            style={{ boxShadow: "var(--shadow-panel)" }}
          >

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-faint transition-colors hover:bg-black/5 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div className="relative py-4">
                <p className="eyebrow flex items-center gap-2">
                  <Check className="h-3.5 w-3.5" />
                  Sent
                </p>
                <h3 className="t-h3 mt-5 text-2xl">Message sent</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                  Thanks for reaching out — we&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 w-full rounded-md border border-border-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow relative">Contact us</p>
                <h3 className="t-h3 relative mt-4 text-2xl">Tell us about it</h3>

                <form onSubmit={onSubmit} className="relative mt-6 space-y-4">
                  <Field label="Name" htmlFor="cf-name" required>
                    <input
                      ref={firstFieldRef}
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Email" htmlFor="cf-email" required>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Phone" htmlFor="cf-phone" optional>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Message" htmlFor="cf-message" required>
                    <textarea
                      id="cf-message"
                      name="message"
                      required
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

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
                    <label htmlFor="cf-company">Company</label>
                    <input
                      id="cf-company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs text-accent-text"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : status === "error" ? (
                      "Try again"
                    ) : (
                      "Send message"
                    )}
                  </button>
                </form>
              </>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
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
