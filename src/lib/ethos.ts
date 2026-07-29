/** Shared source for the ethos — used by the home-page section and /ethos. */
import { projects } from "./work";

export type Principle = { title: string; body: string };

export const principles: Principle[] = [
  {
    title: "Curiosity first",
    body: "Every project begins with a question, not a spec. We chase the interesting problem and see where it leads.",
  },
  {
    title: "Build to learn",
    body: "Prototypes over pitch decks. The fastest way to understand an idea is to make it real and press on it.",
  },
  {
    title: "Ship what matters",
    body: "Not everything survives the lab — and that's the point. We keep the work that earns its place in production.",
  },
  {
    title: "Depth over breadth",
    body: "We'd rather build one thing properly than ten things halfway. Focus is a feature, and saying no is part of the craft.",
  },
  {
    title: "Own the whole stack",
    body: "From the model to the metal, we build and hold our own tools. No black boxes we can't open, no dependencies we can't replace.",
  },
];

/**
 * Figures render as written — the count/suffix split existed only to feed the
 * scroll-triggered <CountUp>, which no longer exists.
 *
 * The first two are counted from the archive rather than typed. "3 products in
 * production" was written when there were three; there are now eleven, and it
 * had been quietly wrong for months while sitting two sections below a list
 * that contradicted it. Anything derivable from the work should be derived
 * from the work.
 */
export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  {
    value: String(projects.filter((p) => p.status === "Released").length),
    label: "Products in production",
  },
  {
    value: String(new Set(projects.map((p) => p.discipline)).size),
    label: "Disciplines with work behind them",
  },
  { value: "2025", label: "Founded" },
  { value: "100%", label: "Independently owned" },
];
