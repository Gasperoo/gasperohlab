import Link from "next/link";
import { Reveal } from "./Reveal";
import { Section, SectionHead, TextLink } from "./Section";

// The same four gates every project passes through, shared with /about.
export const steps = [
  {
    title: "Ask",
    body: "We start with a question worth answering, not a spec. If we can't say why it matters, we don't start.",
  },
  {
    title: "Prototype",
    body: "The smallest real version we can build, put in front of the actual problem — early, while walking away is still cheap.",
  },
  {
    title: "Pressure-test",
    body: "We break it on purpose. What survives contact with real use moves forward; what doesn't gets cut, cleanly.",
  },
  {
    title: "Ship & own",
    body: "What earns it goes to production — engineered, accessible, and still ours to maintain long after launch.",
  },
];

export function HowWeWork() {
  return (
    <Section id="process">
      <SectionHead
        index="06"
        label="How we work"
        title="From a question to production"
        lede="No two projects look the same, but they all move through the same four gates. Most ideas don't make it past the second — and that is exactly the point."
        action={
          <Link href="/about" className="group inline-flex">
            <TextLink>The full method</TextLink>
          </Link>
        }
      />

      {/* A pipeline read left to right, marked by a rule above each step rather
          than by numbered circles on a connector line. */}
      <ol className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.07}>
            <div className="border-t border-border-strong pt-5">
              <span className="eyebrow">Step 0{i + 1}</span>
              <h3 className="t-h3 mt-4 text-xl">{step.title}</h3>
              <p className="t-body mt-3 text-pretty text-[0.9375rem]">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
