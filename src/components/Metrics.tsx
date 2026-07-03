import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

// Outcome figures from the Marapone deployments running in production today.
// NOTE: these are illustrative placeholders — swap in the real numbers before launch.
const stats: {
  count?: number;
  value?: string;
  prefix?: string;
  suffix?: string;
  label: string;
}[] = [
  { count: 12, suffix: "k+", label: "Documents & drawings audited on-prem" },
  { count: 8, suffix: "×", label: "Faster tender & invoice turnaround" },
  { count: 100, suffix: "%", label: "Runs on hardware the client already owns" },
  { value: "0", label: "Bytes of client data that leave the building" },
];

export function Metrics() {
  return (
    <section
      id="metrics"
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24"
    >
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">The numbers</p>
        <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Proof, not promises.
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          What the work is actually doing in production — measured on the
          customers&apos; own machines, where it runs.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="bg-background-elevated p-7 sm:p-8"
          >
            <div className="flex items-baseline font-display text-5xl font-bold tracking-tight sm:text-6xl">
              {s.prefix && <span className="text-accent">{s.prefix}</span>}
              {s.count != null ? <CountUp value={s.count} /> : s.value}
              {s.suffix && <span className="text-accent">{s.suffix}</span>}
            </div>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
