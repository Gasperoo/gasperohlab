"use client";

import { motion } from "framer-motion";

/**
 * Fixed, full-viewport ambient background:
 * faint grid, slow-drifting gradient orbs, and a vignette.
 * Purely decorative — sits behind all content.
 */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Faint grid, masked toward the top */}
      <div className="absolute inset-0 grid-bg" />

      {/* Drifting gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(110,231,255,0.22), transparent 60%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(167,139,250,0.20), transparent 60%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(240,171,252,0.14), transparent 60%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette to keep edges dark and text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 0%, transparent 55%, rgba(5,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
