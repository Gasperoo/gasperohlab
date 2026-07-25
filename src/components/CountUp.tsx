"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// The same easeOutExpo curve the rest of the site animates on, as a plain
// function of progress — cubic-bezier(0.16, 1, 0.3, 1) in spirit.
const easeOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const DURATION = 1400;

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 *
 * Hand-rolled on rAF rather than an animation library: this is one number on a
 * marketing page, and pulling in a motion runtime for it meant every page with a
 * stat block shipped the whole library.
 */
export function CountUp({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    // With reduced motion the final number is rendered outright, so there's
    // nothing to animate towards.
    if (!el || reduced) return;

    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        raf = requestAnimationFrame(step);
      },
      { rootMargin: "-60px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={className}>
      {reduced ? value : display}
    </span>
  );
}
