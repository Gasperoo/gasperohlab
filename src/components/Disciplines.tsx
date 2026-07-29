import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

// Icons are gone. Each of these used to sit in a bordered, rounded tile with a
// lucide glyph — the visual signature of a template, and four in a row read as
// decoration rather than information. The index carries the same job.
const disciplines = [
  {
    title: "Games",
    tag: "Interactive",
    description:
      "Playable systems — from tight arcade loops to strange, systemic worlds. Mechanics first, polish always.",
  },
  {
    title: "Applications",
    tag: "Product",
    description:
      "Web and mobile products built with intent. Fast, accessible and genuinely pleasant to use.",
  },
  {
    title: "AI models",
    tag: "Intelligence",
    description:
      "Custom models and intelligent systems — training, fine-tuning and wiring intelligence into real tools.",
  },
  {
    title: "Systems & tooling",
    tag: "Infrastructure",
    description:
      "Command-line tools, automations and engines. The quiet software that makes everything else possible.",
  },
];

export function Disciplines() {
  return (
    <Section id="disciplines">
      <SectionHead
        index="01"
        label="What we build"
        title="Four disciplines, one team"
        lede="Every project starts as a question. These are the forms the answers take."
      />

      {/* A ruled list rather than a card grid: each row is a hairline and three
          columns — index, name, description. */}
      <div className="mt-16 border-t border-border">
        {disciplines.map((d, i) => (
          <Reveal
            key={d.title}
            delay={i * 0.05}
            className="grid gap-3 border-b border-border py-8 transition-colors duration-300 hover:bg-black/[0.022] lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
          >
            <p className="eyebrow">
              <span className="text-muted">0{i + 1}</span>
              <span className="mx-2 opacity-40">/</span>
              {d.tag}
            </p>
            <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
              <h3 className="t-h3 text-xl">{d.title}</h3>
              <p className="t-body max-w-xl text-pretty">{d.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
