"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// There's no media state to read while rendering on the server. `false` matches
// what the stylesheet assumes by default, and the real value arrives on hydration.
const getServerSnapshot = () => false;

/**
 * Whether the reader has asked the OS to reduce motion, as live state.
 *
 * Reading `matchMedia` inside an effect and calling `setState` with the result
 * both trips the cascading-render lint rule and misses the case where the
 * preference is toggled while the page is open. `useSyncExternalStore` is the
 * intended shape for subscribing to something outside React like this.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
