import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

// Outcome figures from the Marapone deployments running in production today.
// NOTE: these are illustrative placeholders — swap in the real numbers before launch.
//
// The values are now plain text. They used to animate up from zero on scroll
// via <CountUp>, which turns a factual claim into a slot machine; a number that
// counts itself is asking to be watched rather than believed.
const stats = [
  { value: "12k+", label: "Documents & drawings audited on-prem" },
  { value: "8×", label: "Faster tender & invoice turnaround" },
  { value: "100%", label: "Runs on hardware the client already owns" },
  { value: "0", label: "Bytes of client data that leave the building" },
];

export function Metrics() {
  return (
    <Section id="metrics">
      <SectionHead
        index="04"
        label="The numbers"
        title="Proof, not promises"
        lede="What the work is actually doing in production — measured on the customers' own machines, where it runs."
      />

      <div className="mt-16 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.06}
            className={`border-b border-border py-8 pr-6 ${
              // Column rules only where a cell actually has a neighbour to its
              // left at that breakpoint.
              i % 2 === 1 ? "sm:border-l sm:pl-6" : ""
            } ${i > 0 ? "lg:border-l lg:pl-6" : "lg:border-l-0 lg:pl-0"}`}
          >
            <p className="text-[2.75rem] font-medium leading-none tracking-[-0.04em] text-foreground sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-4 max-w-[16rem] text-pretty text-sm leading-relaxed text-muted">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
