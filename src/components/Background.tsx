/**
 * Fixed, full-viewport backdrop.
 *
 * Flat ink with a single grain layer. The old backdrop carried an engineering
 * grid, an accent glow and a vignette — three effects competing for attention
 * behind content that should have had all of it. What's left is texture you
 * notice only at close range, which is the point.
 */
export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-background"
    >
      <div className="grain absolute inset-0" />
    </div>
  );
}
