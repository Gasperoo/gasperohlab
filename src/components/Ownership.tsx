import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";

const pillars = [
  {
    title: "The source is yours",
    body: "You get the code, not a login. Nothing we build is a black box you can't open or a dependency you can't replace.",
  },
  {
    title: "It runs on your metal",
    body: "Deployed on hardware you already own. Your data never leaves the building, so there's nothing to leak and nothing to trust us with.",
  },
  {
    title: "No meter, ever",
    body: "You buy it once. No per-seat pricing, no per-token bill, no subscription quietly ticking against you for the life of the product.",
  },
];

export function Ownership({ index = "05" }: { index?: string }) {
  return (
    <Section id="ownership">
      <SectionHead
        index={index}
        label="You own it"
        title="Software you own — not software you rent"
        lede="Most AI vendors want your data in their cloud and a meter running against you forever. We build the opposite: it's yours, it runs where you say, and it keeps working when the invoice is paid."
      />

      {/* Three columns divided by rules rather than three bordered cards. The
          content is one argument in three parts, and rules say that; boxes say
          three unrelated features. */}
      <div className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-3 lg:gap-0">
        {pillars.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.08}
            className={`lg:pr-10 ${i > 0 ? "lg:border-l lg:border-border lg:pl-10" : ""}`}
          >
            <span className="eyebrow">0{i + 1}</span>
            <h3 className="t-h3 mt-5 text-xl">{p.title}</h3>
            <p className="t-body mt-3 max-w-md text-pretty">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
