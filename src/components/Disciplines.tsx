import { Gamepad2, LayoutGrid, BrainCircuit, TerminalSquare } from "lucide-react";
import { Reveal } from "./Reveal";

const disciplines = [
  {
    icon: Gamepad2,
    title: "Games",
    description:
      "Playable ideas — from tight arcade loops to strange, systemic worlds. Mechanics first, polish always.",
    tag: "Interactive",
  },
  {
    icon: LayoutGrid,
    title: "Apps",
    description:
      "Web and mobile products designed with intent. Fast, accessible, and genuinely pleasant to use.",
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
    title: "Programs",
    description:
      "Command-line tools, automations and engines. The quiet software that makes everything else possible.",
    tag: "Systems",
  },
];

export function Disciplines() {
  return (
    <section id="disciplines" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          What we build
        </p>
        <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Four disciplines, one obsession
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted">
          Every project starts as an experiment. These are the forms it takes.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
        {disciplines.map((d, i) => (
          <Reveal key={d.title} delay={i * 0.08}>
            <article className="glass group relative h-full overflow-hidden rounded-2xl p-8 transition-colors hover:bg-white/[0.06]">
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-white/10 to-white/[0.02] ring-1 ring-white/10">
                  <d.icon className="h-6 w-6 text-accent" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {d.tag}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                {d.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                {d.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
