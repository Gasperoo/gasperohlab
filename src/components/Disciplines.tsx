import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";
import { projects } from "@/lib/work";
import type { Discipline } from "@/lib/work";

/**
 * The four disciplines, ordered by how much work actually sits behind them.
 *
 * This list used to open with Games — against an archive of nine applications,
 * one AI platform and a single game in production. Leading with the thinnest
 * strand is the fastest way to make a reader who then scrolls to the work feel
 * they've been sold something. So the order follows the evidence, each row
 * carries a live count from the archive, and the lighter strands say what they
 * are rather than implying a body of work that isn't there.
 *
 * Which is why AI now sits last despite MaraponeAI being the largest thing the
 * lab has built: the rule is the count, the count is rendered beside every
 * heading, and an order that flattered the flagship would be contradicted on
 * the same line. Re-check this order — and the copy in these rows — whenever
 * the archive gains an entry.
 *
 * Icons are gone. Each of these used to sit in a bordered, rounded tile with a
 * lucide glyph — the visual signature of a template, and four in a row read as
 * decoration rather than information. The index carries the same job.
 */
const disciplines: {
  title: string;
  tag: string;
  key: Discipline;
  description: string;
}[] = [
  {
    title: "Applications",
    tag: "Product",
    key: "App",
    description:
      "Web and mobile products built with intent. Fast, accessible and genuinely pleasant to use — the bulk of what the lab ships.",
  },
  {
    title: "Systems & tooling",
    tag: "Infrastructure",
    key: "Program",
    description:
      "The engines, analysers and command-line tools underneath everything above — and, lately, two that ship under their own names because the hard part was never the interface.",
  },
  {
    title: "Games",
    tag: "Interactive",
    key: "Game",
    description:
      "Playable systems, built the same way as everything else: the simulation has to be true before any of it is fun. Mechanics first, polish always.",
  },
  {
    title: "AI models",
    tag: "Intelligence",
    key: "AI",
    description:
      "Domain-tuned models that run on the customer's own hardware. One entry, and the largest thing here — the platform the construction and logistics work is built on.",
  },
];

export function Disciplines({ index = "01" }: { index?: string }) {
  return (
    <Section id="disciplines">
      <SectionHead
        index={index}
        label="What we build"
        title="Four disciplines, one team"
        lede="Every project starts as a question. These are the forms the answers take — heaviest first."
      />

      {/* A ruled list rather than a card grid: each row is a hairline and three
          columns — index, name, description. */}
      <div className="mt-16 border-t border-border">
        {disciplines.map((d, i) => {
          const count = projects.filter((p) => p.discipline === d.key).length;
          return (
            <Reveal
              key={d.title}
              delay={i * 0.05}
              className="row-hover grid gap-3 border-b border-border py-8 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
            >
              <p className="eyebrow">
                <span className="text-muted">0{i + 1}</span>
                <span className="mx-2 opacity-40">/</span>
                {d.tag}
              </p>
              <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
                <h3 className="t-h3 flex items-baseline gap-2.5 text-xl">
                  {d.title}
                  {/* A count, not a badge. Zero is left blank rather than shown
                      as "0 projects", which would be a boast about nothing. */}
                  {count > 0 && (
                    <span className="eyebrow shrink-0">
                      {count} shipped
                    </span>
                  )}
                </h3>
                <p className="t-body max-w-xl text-pretty">{d.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
