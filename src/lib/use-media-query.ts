"use client";

import { useCallback, useSyncExternalStore } from "react";

// There's no media state to read while rendering on the server. `false` is the
// safe answer for every query the site asks: it means "no reduced-motion
// request" — what the stylesheet assumes by default — and "assume the narrow
// layout", so nothing optional gets server-rendered and then thrown away. The
// real value arrives on hydration.
const getServerSnapshot = () => false;

/**
 * A media query as live state.
 *
 * Reading `matchMedia` inside an effect and calling `setState` with the result
 * both trips the cascading-render lint rule and misses the case where the query
 * flips while the page is open — a motion preference toggled, a window
 * resized past a breakpoint. `useSyncExternalStore` is the intended shape for
 * subscribing to something outside React like this.
 *
 * `subscribe` and `getSnapshot` are memoised on the query, because React reads
 * them as effect dependencies: fresh closures every render would tear the
 * listener down and put it back on every render.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Whether the reader has asked the OS to reduce motion. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
