import type { Metadata } from "next";
import { CircleSlash2 } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Ownership } from "@/components/Ownership";
import { principles, stats } from "@/lib/ethos";
import { disciplineIcon, type Discipline } from "@/lib/work";

// What we deliberately don't do — the counterpoint to the principles.
const refusals = [
  "Rent software back to you. You buy it once, you get the source, and it keeps working when the invoice is paid.",
  "Ship black boxes. If we can't open it and explain it, we won't hand it over.",
  "Take a roadmap from a committee. No investors steering, no quarterly theatre, no feature by consensus.",
  "Confuse motion with progress. Most of our ideas die in the second week — on purpose — so the survivors are worth it.",
  "Chase every discipline halfway. Depth over breadth, every time. Saying no is part of the craft.",
];

// The four disciplines under one roof, and why they share it.
const disciplines: { key: Discipline; label: string; body: string }[] = [
  {
    key: "Game",
    label: "Games",
    body: "Systemic games where the story is whatever the simulation did to you this run.",
  },
  {
    key: "App",
    label: "Apps",
    body: "Calm, focused tools for people who've bounced off bloated software.",
  },
  {
    key: "AI",
    label: "AI",
    body: "Private, owned models that run on your own hardware and never phone home.",
  },
  {
    key: "Program",
    label: "Systems",
    body: "The engines, pipelines and tooling that hold everything else together.",
  },
];

export const metadata: Metadata = {
  title: "Ethos",
  description:
    "What GASPEROHLAB believes — a lab, not a factory. Curiosity first, build to learn, ship what matters, own the whole stack.",
  alternates: { canonical: "/ethos" },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/ethos",
    title: "Ethos · GASPEROHLAB",
    description:
      "A lab, not a factory. The principles behind what we build — and what we cut.",
  },
};

export default function EthosPage() {
  return (
    <>
      <Background />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-36 pb-12 sm:px-6 sm:pt-44">
          <Reveal>
            <p className="eyebrow mb-4">What we believe</p>
            <h1 className="max-w-3xl font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              A lab, not a<span className="text-accent"> factory.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              GASPEROHLAB exists to explore. We move between games, apps, AI and
              systems freely, letting each discipline sharpen the others. A
              factory optimises for throughput; a lab optimises for learning. We
              stay small on purpose, keep the loop between idea and working
              software short, and let the work that survives that pressure be the
              work we put our name on.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-background-elevated p-6">
                  <dt className="flex items-baseline font-display text-4xl font-bold tracking-tight">
                    {s.count != null ? <CountUp value={s.count} /> : s.value}
                    {s.suffix && <span className="text-accent">{s.suffix}</span>}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Principles */}
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">The principles</p>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Five rules we actually keep.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <div className="surface h-full rounded-xl p-6 sm:p-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-pretty leading-relaxed text-muted">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Manifesto pull-quote */}
        <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <blockquote className="border-l-2 border-accent pl-6 sm:pl-8">
              <p className="text-pretty font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                Is it real, does it work, and would we stake our name on it?
                Nothing leaves the lab until the answer is yes, three times over.
              </p>
            </blockquote>
          </Reveal>
        </section>

        {/* What we won't do */}
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow mb-4">And what we won&apos;t</p>
              <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                The list of things we say no to.
              </h2>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                An ethos is as much about what you refuse as what you chase.
                These are the defaults everyone else in the category accepts —
                and the ones we don&apos;t.
              </p>
            </Reveal>

            <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border">
              {refusals.map((r, i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={Math.min(i, 4) * 0.05}
                  className="flex items-start gap-4 bg-background-elevated p-6"
                >
                  <CircleSlash2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                  <span className="text-pretty leading-relaxed text-muted">
                    {r}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Four disciplines, one roof */}
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-4">One roof</p>
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Four disciplines that sharpen each other.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              Games, apps, AI and systems don&apos;t sit in separate teams here.
              The simulation work that makes a game feel alive is the same
              instinct that makes a planning tool feel calm; the model we train
              for one firm sharpens the tools we build for everyone. We move
              between them on purpose — the best ideas rarely respect the line.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((d, i) => {
              const Icon = disciplineIcon[d.key];
              return (
                <Reveal key={d.key} delay={(i % 2) * 0.08}>
                  <div className="surface h-full rounded-xl p-6 sm:p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background-elevated text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight">
                      {d.label}
                    </h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                      {d.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Ownership — the ethos, applied */}
        <Ownership />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
