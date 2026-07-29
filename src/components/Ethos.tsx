import Link from "next/link";
import { Reveal } from "./Reveal";
import { Section, SectionHead, TextLink } from "./Section";
import { principles, stats } from "@/lib/ethos";

export function Ethos() {
  return (
    <Section id="ethos">
      <SectionHead
        index="08"
        label="The ethos"
        title="A lab, not a factory"
        lede="A factory optimises for throughput. A lab optimises for learning. We stay small on purpose, keep the loop between idea and working software as short as we can, and let the work that survives that pressure be the work we put our name on."
        action={
          <Link href="/ethos" className="group inline-flex">
            <TextLink>Read the full ethos</TextLink>
          </Link>
        }
      />

      {/* Principles as a numbered ruled list — one column of statements read
          top to bottom, which is how a set of principles is actually read. */}
      <div className="mt-16 border-t border-border">
        {principles.map((p, i) => (
          <Reveal
            key={p.title}
            delay={Math.min(i, 4) * 0.05}
            className="grid gap-2 border-b border-border py-7 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
          >
            <span className="eyebrow">Principle 0{i + 1}</span>
            <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
              <h3 className="t-h3">{p.title}</h3>
              <p className="t-body max-w-xl text-pretty text-[0.9375rem]">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <EthosStats className="mt-14" />
    </Section>
  );
}

// Reflows 2×2 → 1×4, so which cells sit against a column rule changes with the
// breakpoint. Spelled out per cell for the same reason as the hero strip.
const statRules = [
  "pr-6",
  "border-l border-border pl-6 pr-6",
  "pr-6 lg:border-l lg:border-border lg:pl-6",
  "border-l border-border pl-6",
];

/** Shared with /ethos, which shows the same figures under its own hero. */
export function EthosStats({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 border-t border-border lg:grid-cols-4 ${className}`}>
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.06}
          className={`py-6 ${statRules[i]} ${i < 2 ? "border-b border-border lg:border-b-0" : ""}`}
        >
          <dt className="text-[2rem] font-medium leading-none tracking-[-0.035em] text-foreground">
            {s.value}
          </dt>
          <dd className="mt-3 text-sm text-muted">{s.label}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
