"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Fades + slides content in the first time it scrolls into view.
 *
 * This is the most-used component on the site (60+ instances), so it runs on a
 * bare IntersectionObserver and a CSS transition rather than an animation
 * library — the transform is composited off the main thread and each instance
 * costs one observer entry instead of a full animation state machine. The
 * observer disconnects as soon as it fires, since the reveal only happens once.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      // Matches the previous framer viewport margin: wait until it's 80px in.
      { rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal${shown ? " reveal-in" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
