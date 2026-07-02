/**
 * Fixed, full-viewport backdrop. Deliberately quiet: a neutral base, a faint
 * engineering grid that fades out, one restrained accent glow at the top, and a
 * vignette to keep the edges dark. No orbs, no aurora, no cursor spotlight.
 */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Faint grid, masked toward the top */}
      <div className="absolute inset-0 grid-bg" />

      {/* Single, subtle accent glow behind the hero */}
      <div
        className="absolute left-1/2 -top-72 h-136 w-208 max-w-[120vw] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,59,71,0.12), transparent 70%)",
        }}
      />

      {/* Vignette — keeps edges dark and text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 0%, transparent 55%, rgba(6,7,8,0.9) 100%)",
        }}
      />
    </div>
  );
}
