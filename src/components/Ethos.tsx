import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const principles = [
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
];

const stats: { count?: number; value?: string; suffix?: string; label: string }[] = [
  { count: 3, label: "Products in production" },
  { count: 4, label: "Disciplines under one roof" },
  { value: "2025", label: "Founded" },
  { count: 100, suffix: "%", label: "Independently owned" },
];

export function Ethos() {
  return (
    <section
      id="ethos"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4">The ethos</p>
          <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            A lab, not a factory.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted">
            GASPEROHLAB exists to explore. We move between games, apps, AI and
            systems freely, letting each discipline sharpen the others. The goal
            isn&apos;t volume — it&apos;s finding the ideas that deserve to become
            real, and building them properly.
          </p>

          <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-border">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-background-elevated p-6 ${
                  i % 2 === 0 ? "border-r border-border" : ""
                } ${i < 2 ? "border-b border-border" : ""}`}
              >
                <dt className="flex items-baseline font-display text-4xl font-bold tracking-tight">
                  {s.count != null ? <CountUp value={s.count} /> : s.value}
                  {s.suffix && <span className="text-accent">{s.suffix}</span>}
                </dt>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="flex flex-col gap-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="surface rounded-xl p-6 sm:p-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
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
