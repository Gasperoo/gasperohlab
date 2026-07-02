"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

/**
 * Fixed, full-viewport ambient background:
 * warm grid, a slowly rotating conic aurora, drifting amber/orange/red orbs,
 * a cursor-following spotlight, and a vignette. Purely decorative.
 */
export function Background() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.2);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const px = useTransform(sx, (v) => `${v * 100}%`);
  const py = useTransform(sy, (v) => `${v * 100}%`);

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${px} ${py}, rgba(255, 106, 43, 0.10), transparent 70%)`;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Rotating conic aurora, far back */}
      <div className="absolute left-1/2 top-[-30%] h-[130vh] w-[130vh] -translate-x-1/2 opacity-60 blur-[90px]">
        <div className="aurora h-full w-full rounded-full" />
      </div>

      {/* Faint grid, masked toward the top */}
      <div className="absolute inset-0 grid-bg" />

      {/* Drifting gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,176,32,0.22), transparent 60%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,106,43,0.20), transparent 60%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,61,90,0.16), transparent 60%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cursor-following spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* Vignette to keep edges dark and text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 0%, transparent 52%, rgba(7,5,6,0.88) 100%)",
        }}
      />
    </div>
  );
}
