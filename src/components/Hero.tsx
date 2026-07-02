"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordmark: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax + fade as the hero scrolls away
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-28 pb-24 text-center"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex w-full max-w-5xl flex-col items-center"
      >
        <motion.a
          variants={item}
          href="#projects"
          className="glass border-gradient group mb-9 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          An independent lab for bold experiments
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        {/* Kinetic wordmark */}
        <motion.h1
          variants={wordmark}
          style={{ scale: markScale }}
          className="font-display text-[15vw] font-bold leading-[0.9] tracking-[-0.03em] sm:text-[11vw] lg:text-[9rem]"
        >
          <span className="text-gradient-anim">GASPEROH</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground/90 sm:text-3xl"
        >
          We build the software that doesn&apos;t exist yet.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
        >
          GASPEROH LAB is a one-of-a-kind studio turning restless curiosity into
          real software — games, applications, AI models and programs. We
          experiment relentlessly, then ship the things worth keeping.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-accent via-accent-2 to-accent-3 px-6 py-3 text-sm font-semibold text-background shadow-[0_8px_30px_-8px_rgba(255,106,43,0.6)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Explore the work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
          <a
            href="#contact"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            Start a project
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-border p-1.5"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent-2"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
