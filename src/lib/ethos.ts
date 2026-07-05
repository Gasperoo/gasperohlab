/** Shared source for the ethos — used by the home-page section and /ethos. */

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

export type Stat = { count?: number; value?: string; suffix?: string; label: string };

export const stats: Stat[] = [
  { count: 3, label: "Products in production" },
  { count: 4, label: "Disciplines under one roof" },
  { value: "2025", label: "Founded" },
  { count: 100, suffix: "%", label: "Independently owned" },
];
