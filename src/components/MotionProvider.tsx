"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "framer-motion";

const loadFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Wraps the app so the `m.*` components scattered through it can animate.
 *
 * The point is the deferral: `m` on its own is an inert element proxy, and the
 * animation engine arrives in a separate chunk once the page is interactive.
 * `strict` makes the mistake that would undo all of this — reaching for the
 * eager `motion.*` components again — a build-time error rather than a silent
 * regression back to a single large bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
