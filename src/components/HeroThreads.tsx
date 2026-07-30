"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * The hero's backdrop: a field of red filaments, fanning out from behind the
 * headline toward the right edge of the sheet.
 *
 * This is the site's one WebGL surface, so everything here is about keeping it
 * from costing anything it hasn't earned:
 *
 *  - `ogl` and the shader are a separate chunk, fetched only after the page is
 *    idle. The hero is the LCP element and it is server-rendered text; nothing
 *    about it waits on this.
 *  - It never mounts at all below the layout's wide breakpoint, or for a reader
 *    who has asked for reduced motion. Both are checked before the import, so
 *    on a phone the chunk is never even requested.
 *  - The shader itself stops rendering when the canvas scrolls off or the tab
 *    is hidden — see Threads.
 *
 * Colour comes from `--threads-line`, read off the document at runtime, because
 * a shader uniform can't reference a CSS variable and this palette's rule is
 * that no component hard-codes a colour. Opacity and the mask that keeps the
 * filaments clear of the type are `.hero-threads` in globals.css.
 */

// Split out so `ogl` stays off the critical path. `ssr: false` keeps it out of
// the server bundle entirely — there is nothing for it to prerender but an
// empty div, and it would only ever run in the browser.
const Threads = dynamic(() => import("./Threads").then((m) => m.Threads), {
  ssr: false,
});

const COLOR_TOKEN = "--threads-line";

// The theme lives in a `data-theme` attribute on <html>, stamped before React
// exists (see lib/theme). Watching the attribute rather than subscribing to the
// theme store keeps this correct no matter who changes it.
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getLineColor = () =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(COLOR_TOKEN)
    .trim();

const getServerLineColor = () => "";

/**
 * `#rgb` / `#rrggbb` to the 0–1 channel triple a uniform wants.
 *
 * Null rather than a fallback colour when the token isn't a hex it recognises:
 * the caller then renders nothing. A guessed default would be a red nobody
 * chose sitting under the headline, which is worse than no backdrop.
 */
function toChannels(hex: string): [number, number, number] | null {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function HeroThreads() {
  // One query, not two: the effect is desktop-only *and* motion, so a reader
  // who opts out of motion and a reader on a phone are the same case here.
  const wanted = useMediaQuery(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
  );

  // Compiling a shader and creating a GL context are both main-thread work.
  // Hold them until the browser says it has nothing better to do, so they can't
  // land in the middle of the hero's first paint.
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    // Safari only got requestIdleCallback recently, so fall back to a timer
    // long enough to be past the hero's paint.
    if (typeof window.requestIdleCallback !== "function") {
      const timer = window.setTimeout(() => setIdle(true), 600);
      return () => window.clearTimeout(timer);
    }
    const handle = window.requestIdleCallback(() => setIdle(true));
    return () => window.cancelIdleCallback(handle);
  }, []);

  const hex = useSyncExternalStore(
    subscribeToTheme,
    getLineColor,
    getServerLineColor
  );
  const color = useMemo(() => toChannels(hex), [hex]);

  if (!wanted || !idle || !color) return null;

  return (
    <div className="hero-threads" aria-hidden>
      <Threads
        color={color}
        amplitude={1.5}
        distance={0}
        enableMouseInteraction={false}
      />
    </div>
  );
}
