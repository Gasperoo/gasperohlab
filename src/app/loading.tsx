/**
 * Route-level loading state.
 *
 * Every page opens the same way — eyebrow, headline, lede, then a ruled strip —
 * so the placeholder is that shape rather than a spinner. It reserves roughly
 * the right amount of vertical space, which keeps the header from jumping when
 * the real content lands.
 *
 * Nothing pulses. A shimmering skeleton is a promise that something is nearly
 * ready, and on a site this size the pages are static and the wait is a few
 * frames; an animation would draw more attention than the delay it covers.
 */
export default function Loading() {
  return (
    <div
      className="relative z-10 flex-1"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <div className="mx-auto w-full max-w-[76rem] px-5 pt-36 pb-14 sm:px-8 sm:pt-44 sm:pb-20">
        <div className="h-2.5 w-28 rounded-sm bg-surface" />
        <div className="mt-9 h-10 w-full max-w-2xl rounded-sm bg-surface sm:h-14" />
        <div className="mt-3 h-10 w-3/5 max-w-lg rounded-sm bg-surface sm:h-14" />
        <div className="mt-8 h-4 w-full max-w-xl rounded-sm bg-surface" />
        <div className="mt-2.5 h-4 w-4/5 max-w-lg rounded-sm bg-surface" />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto grid w-full max-w-[76rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="py-6 lg:py-7">
              <div className="h-2.5 w-16 rounded-sm bg-surface" />
              <div className="mt-3.5 h-3.5 w-28 rounded-sm bg-surface" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
