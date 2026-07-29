import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";
import { projects } from "@/lib/work";

/**
 * Figures under a heading that says "Proof, not promises".
 *
 * The previous version shipped invented volumetrics — "12k+ documents audited",
 * "8× faster turnaround" — under a comment admitting they were placeholders to
 * be swapped before launch. They never were. Numbers like that are the easiest
 * thing on a portfolio to disprove, and they were sitting directly beneath a
 * claim of proof.
 *
 * Everything here is now true by construction rather than by measurement. Two
 * of the four are counted from the work archive and cannot drift from it; the
 * other two are architectural guarantees of how the work is built and
 * delivered. Nothing asserts a speed-up or a volume, because nothing on this
 * site can source one.
 *
 * Measured outcomes belong on the individual case studies, where a figure can
 * be attributed to a specific deployment.
 */
export function Metrics({ index = "04" }: { index?: string }) {
  const released = projects.filter((p) => p.status === "Released").length;
  const building = projects.filter((p) => p.status === "In Production").length;

  const stats = [
    { value: String(released), label: "Products released into production" },
    { value: String(building), label: "More being built in the lab right now" },
    { value: "0", label: "Bytes of client data that leave the building" },
    { value: "100%", label: "Source handed over — no black boxes" },
  ];

  return (
    <Section id="metrics">
      <SectionHead
        index={index}
        label="The numbers"
        title="Proof, not promises"
        lede="What the lab has actually put into production, and the guarantees that come with it — counted from the archive, not estimated."
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
