import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const experiments = [
  {
    name: "Untitled Game Engine",
    kind: "Game / Systems",
    status: "In progress",
    description:
      "A lightweight engine for rapidly prototyping playable ideas — physics, input and rendering in one small package.",
    accent: "from-accent/20 to-transparent",
  },
  {
    name: "Signal",
    kind: "App",
    status: "Prototype",
    description:
      "A focused productivity app that turns scattered thoughts into structured, actionable plans.",
    accent: "from-accent-2/20 to-transparent",
  },
  {
    name: "Model Zoo",
    kind: "AI",
    status: "Research",
    description:
      "A growing collection of fine-tuned models exploring what small, specialised AI can do on-device.",
    accent: "from-accent-3/20 to-transparent",
  },
];

export function Experiments() {
  return (
    <section id="experiments" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Selected experiments
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Things currently taking shape
          </h2>
        </div>
        <p className="max-w-xs text-pretty text-muted">
          A living lab — some ship, some don&apos;t. All of them teach us
          something.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {experiments.map((e, i) => (
          <Reveal key={e.name} delay={i * 0.1}>
            <a
              href="#contact"
              className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${e.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {e.status}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <h3 className="relative mt-8 text-xl font-semibold tracking-tight">
                {e.name}
              </h3>
              <p className="relative mt-1 font-mono text-xs uppercase tracking-widest text-accent/80">
                {e.kind}
              </p>
              <p className="relative mt-4 text-pretty text-sm leading-relaxed text-muted">
                {e.description}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
