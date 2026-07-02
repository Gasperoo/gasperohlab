import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const principles = [
  {
    title: "Curiosity first",
    body: "Every project begins with a question, not a spec. We chase the interesting thing and see where it leads.",
  },
  {
    title: "Build to learn",
    body: "Prototypes over pitch decks. The fastest way to understand an idea is to make it real and press on it.",
  },
  {
    title: "Ship what matters",
    body: "Not everything survives the lab — and that's the point. We keep the experiments worth keeping.",
  },
];

const stats: { value: string; count?: number; label: string }[] = [
  { value: "∞", label: "Ideas in the pipeline" },
  { value: "4", count: 4, label: "Disciplines under one roof" },
  { value: "1", count: 1, label: "Independent lab" },
  { value: "0", count: 0, label: "Rules we won't break" },
];

export function Ethos() {
  return (
    <section id="ethos" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            The ethos
          </p>
          <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            A lab, not a factory.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted">
            GASPEROH LAB exists to explore. We move between games, apps, AI and
            systems freely, letting each discipline sharpen the others. The goal
            isn&apos;t volume — it&apos;s finding the ideas that deserve to become
            real.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-background-elevated p-6">
                <dt className="font-display text-4xl font-bold tracking-tight text-gradient">
                  {s.count != null ? <CountUp value={s.count} /> : s.value}
                </dt>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="flex flex-col gap-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="glass rounded-2xl p-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-pretty leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
