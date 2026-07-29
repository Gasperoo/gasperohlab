"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline that fills across the top of the page as you read.
 *
 * Only mounted on the two long page types — case studies and notes — where a
 * reader genuinely can't tell how much is left. Everywhere else it would be
 * chrome measuring nothing.
 *
 * The width is written straight to the element's transform rather than through
 * state: a scroll handler that calls setState re-renders React on every frame
 * of a scroll, which is the one place on this site where that cost would
 * actually be visible. `scaleX` on a composited layer costs nothing.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      // A page shorter than the viewport has no progress to report.
      const ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
