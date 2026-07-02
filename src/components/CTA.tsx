"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ContactModal } from "./ContactModal";

export function CTA() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <Reveal>
        <div className="surface relative overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-16 sm:py-24">
          {/* Single restrained accent glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-208 max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[110px]" />

          <p className="eyebrow relative mb-4">Start a project</p>
          <h2 className="relative mx-auto max-w-2xl font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Have something worth building?
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted">
            A game, an app, an AI model, or a problem that doesn&apos;t have a
            name yet — tell us about it and we&apos;ll build the prototype.
          </p>

          <div className="relative mt-10 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </Reveal>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
