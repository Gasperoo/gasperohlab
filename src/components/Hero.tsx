"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax fade as the hero scrolls away. Nothing flashy.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-28 pb-24 text-center sm:px-6"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex w-full max-w-4xl flex-col items-center"
      >
        {/* Status line — calm, factual */}
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium tracking-wide text-muted">
            Independent software lab
          </span>
        </motion.div>

        {/* Wordmark — solid, tight, engineered */}
        <motion.h1
          variants={item}
          className="font-display text-[12vw] font-bold leading-[0.92] tracking-[-0.04em] text-foreground sm:text-[9rem] lg:text-[10rem]"
        >
          GASPEROH<span className="text-accent">LAB</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-balance text-xl font-medium leading-snug text-foreground sm:text-2xl"
        >
          We design and ship games, applications and AI models.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          An independent lab that takes hard problems from prototype to
          production — engineering software people actually use, not slide decks.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            View our work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover"
          >
            Start a project
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#disciplines"
        aria-label="Scroll to content"
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-border p-1.5"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-muted"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
}
