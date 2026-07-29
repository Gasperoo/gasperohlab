import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

const models = [
  {
    tag: "Start here",
    title: "Prototype sprint",
    body: "Weeks, not months. We build the smallest real version of your idea and put it in front of the problem — so you learn whether it's worth going further before committing to a roadmap.",
    includes: [
      "A working prototype",
      "An honest read on feasibility",
      "A clear go / no-go",
    ],
  },
  {
    tag: "Prototype earns it",
    title: "Build to production",
    body: "The prototype survives contact with reality, so we take it the rest of the way — engineered, accessible and shipped. You own the code and the decisions behind it.",
    includes: [
      "Production-grade build",
      "Full source, no black boxes",
      "Ongoing ownership",
    ],
  },
  {
    tag: "Your hardware",
    title: "Private AI deployment",
    body: "Domain-tuned models running entirely on your own infrastructure. Nothing leaves the building and there's no cloud meter — the same way we build and ship Marapone.",
    includes: [
      "On-prem, offline-capable",
      "Trained on your domain",
      "Bought once, owned forever",
    ],
  },
];

export function Engagement() {
  return (
    <Section id="engagement">
      <SectionHead
        index="07"
        label="Ways to work with us"
        title="Three ways in"
        lede="Most engagements start small and earn their way forward. Pick the one that fits where you are — or just tell us the problem and we'll say which makes sense."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {models.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.07} className="h-full">
            <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-7">
              <span className="eyebrow">{m.tag}</span>
              <h3 className="t-h3 mt-5 text-xl">{m.title}</h3>
              <p className="t-body mt-3 flex-1 text-pretty text-[0.9375rem]">
                {m.body}
              </p>

              {/* Included items are a hairline-ruled list. The old version used
                  accent dots, which put brand colour on nine bullets. */}
              <ul className="mt-7 border-t border-border">
                {m.includes.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-3 text-sm text-foreground last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
