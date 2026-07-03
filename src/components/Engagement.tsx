import { Rocket, Boxes, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const models = [
  {
    icon: Rocket,
    tag: "Start here",
    title: "Prototype sprint",
    body: "Weeks, not months. We build the smallest real version of your idea and put it in front of the problem — so you learn whether it's worth going further before committing to a roadmap.",
    includes: ["A working prototype", "An honest read on feasibility", "A clear go / no-go"],
  },
  {
    icon: Boxes,
    tag: "Prototype earns it",
    title: "Build to production",
    body: "The prototype survives contact with reality, so we take it the rest of the way — engineered, accessible and shipped. You own the code and the decisions behind it.",
    includes: ["Production-grade build", "Full source, no black boxes", "Ongoing ownership"],
  },
  {
    icon: ShieldCheck,
    tag: "Your hardware",
    title: "Private AI deployment",
    body: "Domain-tuned models running entirely on your own infrastructure. Nothing leaves the building and there's no cloud meter — the same way we build and ship Marapone.",
    includes: ["On-prem, offline-capable", "Trained on your domain", "Bought once, owned forever"],
  },
];

export function Engagement() {
  return (
    <section
      id="engagement"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">Ways to work with us</p>
        <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Three ways in.
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          Most engagements start small and earn their way forward. Pick the one
          that fits where you are — or just tell us the problem and we&apos;ll say
          which makes sense.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {models.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.08}>
            <div className="surface flex h-full flex-col rounded-xl p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background-elevated text-accent">
                  <m.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {m.tag}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                {m.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                {m.body}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
                {m.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
