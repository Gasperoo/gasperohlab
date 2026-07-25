"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Accessible description — these are silent UI captures, so it's short. */
  label?: string;
};

/**
 * A muted, looping product clip that only ever loads when it's actually on
 * screen.
 *
 * A plain `<video autoPlay>` starts fetching as soon as the browser sees it, so
 * a case study with four clips pulled its whole video budget on load whether or
 * not the reader ever scrolled that far. Here `preload="none"` means nothing is
 * requested until an IntersectionObserver calls `play()`, and scrolling away
 * pauses again so offscreen clips stop burning decode time and battery.
 *
 * With reduced motion requested we never autoplay — the poster stands in and
 * native controls let the reader start it themselves.
 */
export function AutoVideo({ src, poster, className, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;

    // Autoplay is only permitted for muted video; set it as a property too,
    // since the attribute alone has historically been unreliable in Safari.
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Can reject if the tab is backgrounded or the policy blocks it —
          // there's nothing to recover, so let the poster stand in.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // Start a little before the clip scrolls in so it isn't blank on arrival.
      { rootMargin: "200px 0px", threshold: 0 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
      aria-label={label}
    />
  );
}
