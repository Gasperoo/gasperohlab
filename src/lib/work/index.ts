import type { Project, Discipline } from "./types";

import { maraponeai } from "./projects/maraponeai";
import { blueprintAuditor } from "./projects/blueprint-auditor";
import { aiEstimator } from "./projects/ai-estimator";
import { scopeguard } from "./projects/scopeguard";
import { yugidex } from "./projects/yugidex";
import { nexusmind } from "./projects/nexusmind";
import { orbit } from "./projects/orbit";

export * from "./types";

/**
 * The archive, in display order.
 *
 * This was one 863-line file — eleven case studies' worth of prose in a single
 * array literal, where editing the copy on one project meant scrolling past all
 * the others and every diff touched the same file. Each project is now its own
 * module under `projects/`, and this list is the only place their order is
 * decided.
 *
 * Order is editorial, not chronological: the platform first, then the tools
 * built on it, then the work still in the lab.
 *
 * Four entries used to sit here that no longer do. The Construction and
 * Logistics suites are now chapters inside the MaraponeAI case study, and the
 * two mobile companions are `companion` blocks inside those chapters — each was
 * restating the platform's argument at less depth, and the construction page in
 * particular was showing the Blueprint Auditor's screens as its own. What's left
 * is one system page and the three tools that go deep enough to be worth their
 * own read. Both retired suite URLs redirect to their chapter anchor; see
 * `redirects` in next.config.ts.
 */
export const projects: Project[] = [
  maraponeai,
  blueprintAuditor,
  aiEstimator,
  scopeguard,
  yugidex,
  nexusmind,
  orbit,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const caseStudySlugs = projects
  .filter((p) => p.caseStudy)
  .map((p) => p.slug);

/**
 * The shared view-transition name for a project's cover image.
 *
 * Both the card and the case-study hero derive it from the slug, so the two
 * can't drift apart — a mismatched pair doesn't error, it just silently stops
 * morphing, which is exactly the kind of bug nobody notices for a year.
 */
export const coverTransitionName = (slug: string) => `cover-${slug}`;

/** Where a project sits in the archive, for previous/next links. */
export function projectNeighbours(slug: string) {
  const withCase = projects.filter((p) => p.caseStudy);
  const i = withCase.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  return { previous: withCase[i - 1], next: withCase[i + 1] };
}

/**
 * Other case studies worth reading after this one.
 *
 * Previously this was `projects.filter(...).slice(0, 3)` — the same three
 * projects at the foot of every case study, chosen by array position and
 * related to what you'd just read only by coincidence. Now it prefers the same
 * discipline, then falls back to filling the remaining slots from the rest of
 * the archive so the section never renders half-empty.
 *
 * `exclude` keeps the footer from re-offering links the page already made: the
 * MaraponeAI chapters link the three construction tools directly, and without
 * this the "more work" list underneath was the identical three rows.
 */
export function relatedProjects(
  slug: string,
  limit = 3,
  exclude: Iterable<string> = []
): Project[] {
  const current = getProject(slug);
  if (!current) return [];

  const skip = new Set(exclude);
  const candidates = projects.filter(
    (p) => p.slug !== slug && p.caseStudy && !skip.has(p.slug)
  );
  const sameDiscipline = candidates.filter(
    (p) => p.discipline === current.discipline
  );
  const rest = candidates.filter((p) => p.discipline !== current.discipline);

  return [...sameDiscipline, ...rest].slice(0, limit);
}

/** Disciplines that actually have work behind them, in a fixed display order. */
export function presentDisciplines(order: Discipline[]): Discipline[] {
  return order.filter((d) => projects.some((p) => p.discipline === d));
}
