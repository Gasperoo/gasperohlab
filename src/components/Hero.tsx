"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
  const stageRef = useRef<HTMLDivElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax fade as the hero scrolls away. Nothing flashy.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Cursor spotlight: a soft radial mask follows the pointer and reveals the
  // "on fire" character layered over the calm base. Driven by a smoothed rAF
  // loop writing the CSS mask directly — cheap, no canvas re-serialization.
  useEffect(() => {
    const section = ref.current;
    const stage = stageRef.current;
    const fire = fireRef.current;
    if (!section || !stage || !fire) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (reduce || noHover) return;

    const R = 190; // spotlight radius (px)
    const target = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let active = false;
    let raf = 0;

    // Track over the whole section; express coordinates relative to the
    // character stage so the mask lines up with the fire layer.
    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!active) {
        active = true;
        smooth.x = target.x;
        smooth.y = target.y;
      }
    };
    const onLeave = () => {
      active = false;
    };

    const loop = () => {
      smooth.x += (target.x - smooth.x) * 0.14;
      smooth.y += (target.y - smooth.y) * 0.14;
      const mask = active
        ? `radial-gradient(circle ${R}px at ${smooth.x.toFixed(1)}px ${smooth.y.toFixed(
            1,
          )}px, #000 0%, #000 40%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.18) 80%, transparent 92%)`
        : "radial-gradient(circle 0px at -200px -200px, #000, transparent)";
      fire.style.webkitMaskImage = mask;
      fire.style.maskImage = mask;
      raf = requestAnimationFrame(loop);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-24 sm:px-6 lg:pt-24"
    >
      {/* ---- Character with cursor-spotlight fire reveal (absolute so the
              wordmark can never squeeze it) ---- */}
      <motion.div
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        ref={stageRef}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[48%] w-full max-w-md -translate-x-1/2 sm:h-[56%] sm:max-w-lg lg:left-auto lg:right-0 lg:h-[86%] lg:w-[52%] lg:max-w-none lg:translate-x-0 xl:right-4"
      >
        {/* Separate element for base opacity so the Framer scroll-fade (inline
            opacity on the parent) doesn't clobber the mobile dimming. */}
        <div className="relative h-full w-full opacity-35 sm:opacity-45 lg:opacity-100">
          {/* Soft red glow behind the character */}
          <div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(var(--accent-rgb),0.26), transparent 70%)",
            }}
          />
          {/* Base: calm red character */}
          <Image
            src="/hero/hero-character.png"
            alt="GasperohLab voxel character"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 50vw"
            className="object-contain object-bottom lg:object-right-bottom"
          />
          {/* Reveal: on-fire character, masked to the cursor spotlight */}
          <div
            ref={fireRef}
            className="pointer-events-none absolute inset-0 lg:pointer-events-auto"
            style={{
              maskImage:
                "radial-gradient(circle 0px at -200px -200px, #000, transparent)",
              WebkitMaskImage:
                "radial-gradient(circle 0px at -200px -200px, #000, transparent)",
              willChange: "mask-image",
            }}
          >
            <Image
              src="/hero/hero-character-fire.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="object-contain object-bottom lg:object-right-bottom"
            />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl">
        {/* ---- Wordmark + copy ---- */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left"
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
            className="font-display text-[13vw] font-bold leading-[0.9] tracking-[-0.04em] text-foreground sm:text-[7rem] lg:text-[5.5rem] xl:text-[6.25rem]"
          >
            GASPEROH<span className="text-accent">LAB</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-balance text-xl font-medium leading-snug text-foreground sm:text-2xl"
          >
            We design and ship games, applications and AI models.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            An independent lab that takes hard problems from prototype to
            production — engineering software people actually use, not slide
            decks.
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
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#disciplines"
        aria-label="Scroll to content"
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
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
