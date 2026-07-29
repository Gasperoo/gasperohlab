import type { Project, Discipline } from "./types";

import { maraponeai } from "./projects/maraponeai";
import { maraponeConstruction } from "./projects/marapone-construction";
import { blueprintAuditor } from "./projects/blueprint-auditor";
import { aiEstimator } from "./projects/ai-estimator";
import { scopeguard } from "./projects/scopeguard";
import { maraponeLogistics } from "./projects/marapone-logistics";
import { maraponeConstructionApp } from "./projects/marapone-construction-app";
import { maraponeLogisticsApp } from "./projects/marapone-logistics-app";
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
 * Order is editorial, not chronological: the platform first, then the suites
 * built on it, then the tools, then the work still in the lab.
 */
export const projects: Project[] = [
  maraponeai,
  maraponeConstruction,
  blueprintAuditor,
  aiEstimator,
  scopeguard,
  maraponeLogistics,
  maraponeConstructionApp,
  maraponeLogisticsApp,
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
 */
export function relatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return [];

  const candidates = projects.filter((p) => p.slug !== slug && p.caseStudy);
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
