export type LogKind = "Shipped" | "Changed" | "Cut" | "Started";

export type LogEntry = {
  /**
   * Either a full ISO date or a bare year.
   *
   * Most product milestones are only known to the year, and inventing a month
   * to make the sort key uniform would be a small lie in a log whose entire
   * value is that it isn't one. Descending string sort happens to do the right
   * thing anyway: "2026-07-29" sorts above "2026", so dated entries lead their
   * year and the undated ones close it.
   */
  date: string;
  kind: LogKind;
  title: string;
  body: string;
  /** Optional link to the thing being described. */
  href?: string;
};

/**
 * The shipping log — what got built, changed, and thrown away.
 *
 * The lab's stated method is that most ideas die at the second gate. That's an
 * easy thing to claim and a hard thing to evidence, and a changelog listing
 * only launches would quietly contradict it. So the cuts are entries here too,
 * with the same weight as the releases.
 *
 * Newest first.
 */
export const log: LogEntry[] = [
  {
    date: "2026-07-29",
    kind: "Changed",
    title: "Six Marapone entries become four",
    body: "The two suites and their two mobile companions had case studies of their own, each retelling the platform's argument at less depth than the platform did. All four are now chapters and companion blocks inside the MaraponeAI case study; the Blueprint Auditor, AI Estimator and ScopeGuard write-ups stay where they are, because those go deep enough to be worth the click.",
    href: "/work/maraponeai",
  },
  {
    date: "2026-07-29",
    kind: "Changed",
    title: "The site gets a second face",
    body: "Every colour on the site moved behind a token, which made a dark theme a palette rather than a rewrite. Picked up a command palette, a durable waitlist and a shipping log — the page you're reading — on the way through.",
  },
  {
    date: "2026-07-29",
    kind: "Cut",
    title: "The voxel character, and the fire that followed the cursor",
    body: "The landing page had a character with an on-fire layer revealed by a cursor-tracked mask. It was cheap to run and people liked it, but it was the loudest thing on a site whose argument is restraint, and it was the first thing every visitor met.",
  },
  {
    date: "2026-07-29",
    kind: "Changed",
    title: "Ink & Bone flips to paper",
    body: "The near-monochrome system stayed; the sheet went from near-black to a warm off-white, and the rocket mark was replaced by the circuit-G monogram set in the accent rather than reversed out of a filled tile.",
  },
  {
    date: "2026-07-24",
    kind: "Changed",
    title: "Performance, mobile and SEO pass",
    body: "Case-study clips stopped preloading until they were actually on screen, the header's backdrop blur became desktop-only, and every route got real metadata and structured data.",
  },
  {
    date: "2026-07-16",
    kind: "Cut",
    title: "Project Halcyon",
    body: "An Unreal Engine 5 project that got as far as a case study on this site before we accepted it wasn't going to earn the attention it needed. Replaced in the archive by NexusMind, which had.",
    href: "/work/nexusmind",
  },
  {
    date: "2026-07-05",
    kind: "Shipped",
    title: "The Lab, and an RSS feed for it",
    body: "Writing got its own section, per-note OpenGraph images and a feed — on the theory that a lab that never publishes what it learned is just a studio with better branding.",
    href: "/lab",
  },
  {
    date: "2026-07-03",
    kind: "Cut",
    title: "Beta waitlists on the two companion apps",
    body: "Added and removed inside a day. The construction and logistics companion apps ship to existing suite customers, so a public waitlist was collecting addresses we had no plan for.",
  },
  {
    date: "2026-07-02",
    kind: "Cut",
    title: "Marapone Copilot",
    body: "A second AI product alongside MaraponeAI, before it was clear it was the same product wearing a different name. Folded back into the platform.",
    href: "/work/maraponeai",
  },
  {
    date: "2026",
    kind: "Shipped",
    title: "ScopeGuard",
    body: "Scope-gap analysis across tender documents — finds what the drawings say and the specification doesn't, before it becomes a change order.",
    href: "/work/scopeguard",
  },
  {
    date: "2026",
    kind: "Shipped",
    title: "AI Estimator",
    body: "Estimating, risk and scenario modelling on the customer's own hardware, reading their own historical cost data.",
    href: "/work/ai-estimator",
  },
  {
    date: "2026",
    kind: "Shipped",
    title: "Blueprint Auditor",
    body: "Drawing review, takeoff and deficiency tracking against the Ontario Building Code — running entirely on-prem.",
    href: "/work/blueprint-auditor",
  },
  {
    date: "2026",
    kind: "Started",
    title: "Five more in the lab",
    body: "YuGi-Dex, NexusMind, Orbit and the two Marapone companion apps entered production. Some of them won't finish, and this log will say so.",
    href: "/work",
  },
  {
    date: "2025",
    kind: "Shipped",
    title: "Marapone Construction & Logistics Suites",
    body: "The two industry suites built on MaraponeAI, deployed on customers' own infrastructure.",
    href: "/work/maraponeai#construction",
  },
  {
    date: "2025",
    kind: "Shipped",
    title: "MaraponeAI",
    body: "Domain-tuned models running on hardware the customer already owns. Bought once, source included, nothing leaving the building. Everything above is built on it.",
    href: "/work/maraponeai",
  },
  {
    date: "2025",
    kind: "Started",
    title: "GASPEROHLAB",
    body: "Founded in Toronto. Independent, no investors.",
  },
];

/** Formats either a bare year or a full ISO date for display. */
export function formatLogDate(date: string): string {
  if (/^\d{4}$/.test(date)) return date;
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const logByKind = (kind: LogKind) => log.filter((e) => e.kind === kind);
