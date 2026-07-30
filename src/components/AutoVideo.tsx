"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/lib/use-media-query";

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
 *
 * Renders a fragment: the video, plus a pause control positioned absolutely.
 * **The caller must give the clip a positioned frame** (every call site wraps
 * it in a bordered container already; those containers carry `relative`).
 */
export function AutoVideo({ src, poster, className, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  // Set once the reader presses pause, and never cleared. Scrolling a clip out
  // of view and back would otherwise restart something they explicitly
  // stopped, which is the exact failure the control exists to prevent.
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;

    // Autoplay is only permitted for muted video; set it as a property too,
    // since the attribute alone has historically been unreliable in Safari.
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (held) return;
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
  }, [reduced, held]);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setHeld(false);
      video.play().catch(() => {});
    } else {
      setHeld(true);
      video.pause();
    }
  }

  return (
    <>
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
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* WCAG 2.2.2: anything that moves for more than five seconds needs a way
          to stop it, and these loop indefinitely. Under reduced motion the
          native controls already provide one, so this stays out of the way.

          Quiet rather than hidden while playing. A control revealed only on
          hover can't be found by someone who doesn't already know it's there,
          and a paused clip with no visible way to restart it is its own trap —
          so it dims to sixty percent and never disappears. */}
      {!reduced && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${label ?? "clip"}` : `Play ${label ?? "clip"}`}
          className={`absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/85 text-foreground backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 ${
            playing ? "opacity-60" : "opacity-100"
          }`}
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      )}
    </>
  );
}
