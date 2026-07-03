import { KeyRound, Server, CircleSlash2 } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  {
    icon: KeyRound,
    title: "The source is yours",
    body: "You get the code, not a login. Nothing we build is a black box you can't open or a dependency you can't replace.",
  },
  {
    icon: Server,
    title: "It runs on your metal",
    body: "Deployed on hardware you already own. Your data never leaves the building, so there's nothing to leak and nothing to trust us with.",
  },
  {
    icon: CircleSlash2,
    title: "No meter, ever",
    body: "You buy it once. No per-seat pricing, no per-token bill, no subscription quietly ticking against you for the life of the product.",
  },
];

export function Ownership() {
  return (
    <section
      id="ownership"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-4">You own it</p>
        <h2 className="font-display text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Software you own — not software you rent.
        </h2>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
          Most AI vendors want your data in their cloud and a meter running
          against you forever. We build the opposite. The way we ship Marapone&apos;s
          private AI is the way we like to work generally: it&apos;s yours, it runs
          where you say, and it keeps working when the invoice is paid.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="surface group h-full rounded-xl p-7 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background-elevated text-accent">
                <p.icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
