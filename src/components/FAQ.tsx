"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

const faqs = [
  {
    q: "What do you actually take on?",
    a: "Hard, interesting problems across games, applications, AI models and the systems that hold them together. If it can be prototyped, pressure-tested and shipped — and we can say why it matters — it's a fit. If it's a slide deck looking for a rubber stamp, it isn't.",
  },
  {
    q: "How does an engagement start?",
    a: "With a conversation and a prototype, not a 40-page statement of work. We make the smallest real version we can and put it in front of the problem early, so we both learn whether it's worth building before anyone's committed to a long roadmap.",
  },
  {
    q: "Do we own what you build?",
    a: "Yes. Ownership is a principle, not an upsell — the way we build Marapone's private AI (deployed on the customer's own hardware, source included, no subscriptions) is the way we like to work generally. No black boxes you can't open, no dependencies you can't replace.",
  },
  {
    q: "Can you build private / on-prem AI?",
    a: "It's a core competency. MaraponeAI runs domain-tuned models entirely on-premise — nothing leaves the building and there's no cloud meter. If data sensitivity or cost rules out a hosted API, this is exactly the kind of thing we do.",
  },
  {
    q: "How long does something take?",
    a: "A working prototype is usually weeks, not months — that's the whole point of moving as a lab. Production timelines depend on scope, but we keep the loop between idea and shippable software as short as we honestly can.",
  },
  {
    q: "What does it cost?",
    a: "It depends on what you're building, so we won't pretend a number here means anything. Tell us about the problem and we'll come back with an honest scope — including whether we think it's worth doing at all.",
  },
];

/**
 * Disclosure row.
 *
 * The panel is always in the DOM and collapsed with a grid-rows trick rather
 * than an AnimatePresence height animation. It costs no JS, keeps the answers
 * present for find-in-page, and — because `grid-template-rows` is animatable —
 * still opens smoothly to a height nobody had to measure.
 */
function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="flex gap-4 sm:gap-8">
          <span className="eyebrow w-6 shrink-0 pt-1.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-pretty text-base text-foreground sm:text-lg">
            {q}
          </span>
        </span>
        <Plus
          className={`mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:text-foreground ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="t-body max-w-2xl text-pretty pb-6 pl-0 text-[0.9375rem] sm:pl-[3.5rem]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionHead
        index="10"
        label="Before you ask"
        title="How working with the lab works"
        lede="The short version of the questions we get most. Anything not here, just ask us directly."
      />

      <Reveal className="mt-16 border-t border-border">
        {faqs.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </Reveal>
    </Section>
  );
}
