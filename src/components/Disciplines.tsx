import { Gamepad2, LayoutGrid, BrainCircuit, TerminalSquare } from "lucide-react";
import { Reveal } from "./Reveal";

const disciplines = [
  {
    icon: Gamepad2,
    title: "Games",
    description:
      "Playable systems — from tight arcade loops to strange, systemic worlds. Mechanics first, polish always.",
    tag: "Interactive",
  },
  {
    icon: LayoutGrid,
    title: "Applications",
    description:
      "Web and mobile products built with intent. Fast, accessible and genuinely pleasant to use.",
    tag: "Product",
  },
  {
    icon: BrainCircuit,
    title: "AI Models",
    description:
      "Custom models and intelligent systems — training, fine-tuning and wiring intelligence into real tools.",
    tag: "Intelligence",
  },
  {
    icon: TerminalSquare,
    title: "Systems & Tools",
    description:
      "Command-line tools, automations and engines. The quiet software that makes everything else possible.",
    tag: "Infrastructure",
  },
];

export function Disciplines() {
  return (
    <section
      id="disciplines"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">What we build</p>
        <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Four disciplines, one team
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          Every project starts as a question. These are the forms the answers
          take.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {disciplines.map((d, i) => (
          <Reveal
            key={d.title}
            delay={i * 0.06}
            className="group relative bg-background-elevated p-8 transition-colors duration-200 hover:bg-surface sm:p-10"
          >
            {/* Accent rule that appears on hover */}
            <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                <d.icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                {d.tag}
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
              {d.title}
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted">
              {d.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
