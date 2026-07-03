"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

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

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-pretty text-base font-medium text-foreground sm:text-lg">
          {q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-accent/40 group-hover:text-accent ${
            open ? "rotate-45" : ""
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-pretty leading-relaxed text-muted">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section
      id="faq"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4">Before you ask</p>
          <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            How working with the lab works.
          </h2>
          <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted">
            The short version of the questions we get most. Anything not here,
            just ask us directly.
          </p>
        </Reveal>

        <Reveal>
          <div>
            {faqs.map((f, i) => (
              <Item key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
