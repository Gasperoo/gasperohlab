import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

// The same four gates every project passes through, shared with /about.
// Here they're drawn as a pipeline; the About page tells the fuller story.
const steps = [
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
    <section
      id="process"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            From a question to production.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            No two projects look the same, but they all move through the same
            four gates. Most ideas don&apos;t make it past the second — and that
            is exactly the point.
          </p>
        </div>
        <Link
          href="/about"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground"
        >
          The full method
          <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <div className="relative mt-14">
        {/* Connecting line behind the step badges (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-border lg:block"
        />

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-sm font-semibold text-accent">
                0{i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
