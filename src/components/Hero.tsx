import { ArrowRight } from "lucide-react";

/**
 * Typographic hero.
 *
 * The old hero was a voxel character with a cursor-tracked fire reveal running
 * a rAF loop that rewrote a CSS mask every frame. It's gone — along with the
 * character, the accent glow behind it, the parallax and the scroll hint. What
 * carries the section now is one sentence set large, and a ruled fact strip
 * underneath it.
 *
 * The one thing that moves is the scan — a hairline crossing the sheet every
 * seventeen seconds, described in full at `.hero-scan` in globals.css. It reads
 * through both themes off two tokens, and it is the site's fifth use of the
 * accent, which is why it is a single semi-transparent pixel.
 *
 * This is a server component: both the entrance and the scan are pure CSS, so
 * nothing here waits on hydration and the LCP text paints with the first frame.
 */

// Staggered by hand rather than by a variants tree — four elements don't
// warrant an animation library on the critical path.
const delays = ["0.05s", "0.14s", "0.23s", "0.32s", "0.44s"];

const facts = [
  { label: "Based", value: "Toronto, Canada" },
  { label: "Founded", value: "2025" },
  { label: "Disciplines", value: "Games · Apps · AI · Systems" },
  { label: "Model", value: "Independent, no investors" },
];

// The strip reflows from a 2×2 to a 1×4, which moves which cells sit against a
// rule. Spelled out per cell rather than derived, because "has a neighbour to
// the left at this breakpoint" isn't something an index expression can say
// legibly across two column counts.
const cellRules = [
  "border-b border-border pr-5 lg:border-b-0 lg:pr-6",
  "border-b border-l border-border pl-5 lg:border-b-0 lg:pl-6 lg:pr-6",
  "pr-5 lg:border-l lg:border-border lg:pl-6 lg:pr-6",
  "border-l border-border pl-5 lg:pl-6",
];

export function Hero() {
  return (
    <section id="top">
      {/* Full-bleed wrapper so the scan crosses the whole sheet rather than
          stopping at the content column's margins. `isolate` keeps its stacking
          local, so the band can never end up over the type. */}
      <div className="relative isolate">
        <div className="hero-scan" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-[76rem] px-5 pt-36 pb-16 sm:px-8 sm:pt-44 sm:pb-20">
          <div className="rise" style={{ animationDelay: delays[0] }}>
            <p className="eyebrow flex items-center gap-2.5">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden
              />
              Independent software lab
            </p>
          </div>

          {/* Set in caps by CSS rather than typed that way, so assistive tech and
            anyone copying the line still get the sentence. Caps at this size
            need the tracking opened back up — -0.042em is set for lowercase
            with descenders to lean on, and it collides without them. */}
          <h1
            className="rise t-hero mt-8 max-w-4xl text-balance uppercase tracking-[-0.02em]"
            style={{ animationDelay: delays[1] }}
          >
            We design and ship applications, AI Models, and games.
          </h1>

          <p
            className="rise t-lede mt-8 max-w-xl text-pretty"
            style={{ animationDelay: delays[2] }}
          >
            GASPEROHLAB takes hard problems from a single question all the way
            to production — engineering software people actually use, not slide
            decks.
          </p>

          <div
            className="rise mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
            style={{ animationDelay: delays[3] }}
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              View selected work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>

      {/* Fact strip — the page's ruled grid, introduced immediately so the
          structure is established before the reader scrolls. */}
      <div
        className="rise border-t border-border"
        style={{ animationDelay: delays[4] }}
      >
        <dl className="mx-auto grid w-full max-w-[76rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className={`py-6 lg:py-7 ${cellRules[i]}`}>
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-2.5 text-sm text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
