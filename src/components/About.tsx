import Image from "next/image";
import { Reveal } from "./Reveal";

const story = [
  "GASPEROHLAB started in 2025 out of a simple frustration: too much good software dies in slide decks. We wanted a place where an idea could be built, pressed on, and either earn its keep or be cut — without a committee standing in the way.",
  "So we kept it small and independent. No investors steering the roadmap, no quarterly theatre. Just a tight team that owns its tools end to end and moves between disciplines freely, because the best ideas rarely respect the line between a game, an app and a model.",
  "Some of what we make ships under our own name. Some of it powers other companies quietly — like Marapone, the private AI suite we build for the construction and logistics industries. All of it has to survive the same test: is it real, does it work, and would we stake our name on it?",
];

const process = [
  {
    title: "Ask",
    body: "Every build starts with a question worth answering, not a spec handed down. If we can't say why it matters, we don't start.",
  },
  {
    title: "Prototype",
    body: "We make the smallest real version we can and put it in front of the problem. Working software beats a plan every time.",
  },
  {
    title: "Pressure-test",
    body: "We break it on purpose. What survives contact with real use moves forward; what doesn't gets cut, cleanly.",
  },
  {
    title: "Ship & own",
    body: "The work that earns it goes to production — and we keep owning it. No black boxes, no abandoned code.",
  },
];

export function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-5 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">About the lab</p>
            <h1 className="max-w-3xl font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              A small lab with a<span className="text-accent"> long</span> attention
              span.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              GASPEROHLAB is an independent software lab. We take hard, interesting
              problems from a single question all the way to production — across
              games, applications, AI models and the systems that hold them
              together.
            </p>
          </Reveal>

          {/* Framed character visual */}
          <Reveal delay={0.1}>
            <div className="surface relative aspect-square overflow-hidden rounded-2xl">
              <div className="absolute inset-0 grid-bg opacity-70" />
              <div
                className="absolute inset-0 -z-0 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(var(--accent-rgb),0.22), transparent 70%)",
                }}
              />
              <Image
                src="/hero/hero-character-fire.png"
                alt="GASPEROHLAB voxel character"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-contain object-bottom p-6"
              />
              <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                Est. 2025 · Independent
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Our story</p>
            <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Why a lab, not a studio.
            </h2>

            {/* Character — a cooler counterpart to the fire hero above */}
            <div className="surface relative mt-8 hidden aspect-square max-w-[240px] overflow-hidden rounded-2xl lg:block">
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div
                className="absolute inset-0 -z-0 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(120,180,255,0.20), transparent 70%)",
                }}
              />
              <Image
                src="/alt/alt3.jpg"
                alt="GASPEROHLAB voxel character, frozen variant"
                fill
                sizes="240px"
                className="object-contain object-bottom p-4"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            {story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-pretty text-lg leading-relaxed text-muted">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            From a question to production.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
            No two projects look the same, but they all move through the same
            four gates. Most ideas don&apos;t make it past the second — and that
            is exactly the point.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {process.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.06}
              className="group relative bg-background-elevated p-8 transition-colors duration-200 hover:bg-surface sm:p-10"
            >
              <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
