"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useContact } from "./ContactProvider";
import { availability } from "@/lib/site";

/**
 * Closing call to action.
 *
 * Previously a centred, rounded card with an accent glow bleeding out of its
 * top edge. Now it's a full-width ruled band with the ask on the left and the
 * action on the right — the same grammar as every other section, so the page
 * ends in its own voice rather than in a banner.
 *
 * Two changes since. The dialog is no longer owned here — it lives at the root
 * so the header can open it too (see ContactProvider), which also means the
 * eight pages that render this band no longer each mount their own copy. And
 * the band now leads with whether the lab is actually taking work: "have
 * something worth building?" is a question, while "taking one new project for
 * Q4" is an answer, and the answer is what makes someone write.
 */
export function CTA() {
  const openContact = useContact();

  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-2.5">
              {availability.open && (
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden
                />
              )}
              {availability.open ? availability.note : "Start a project"}
            </p>
            <h2 className="t-h1 mt-6 max-w-2xl text-balance">
              Have something worth building?
            </h2>
            <p className="t-lede mt-6 max-w-lg text-pretty">
              A game, an app, an AI model, or a problem that doesn&apos;t have a
              name yet — tell us about it and we&apos;ll build the prototype.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:pb-2">
            <button
              type="button"
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
