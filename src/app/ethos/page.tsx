import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { EthosStats } from "@/components/Ethos";
import { Ownership } from "@/components/Ownership";
import { principles } from "@/lib/ethos";
import { type Discipline } from "@/lib/work";

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
        <PageHero
          label="What we believe"
          title="A lab, not a factory."
          lede="GASPEROHLAB exists to explore. We move between games, apps, AI and systems freely, letting each discipline sharpen the others. A factory optimises for throughput; a lab optimises for learning. We stay small on purpose, keep the loop between idea and working software short, and let the work that survives that pressure be the work we put our name on."
        />

        <section className="mx-auto w-full max-w-[76rem] px-5 sm:px-8">
          <EthosStats />
        </section>

        {/* Principles */}
        <Section>
          <SectionHead
            index="01"
            label="The principles"
            title="Five rules we actually keep"
          />

          <div className="mt-16 border-t border-border">
            {principles.map((p, i) => (
              <Reveal
                key={p.title}
                delay={Math.min(i, 4) * 0.05}
                className="grid gap-2 border-b border-border py-8 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
              >
                <span className="eyebrow">Principle 0{i + 1}</span>
                <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
                  <h3 className="t-h3 text-xl">{p.title}</h3>
                  <p className="t-body max-w-xl text-pretty">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Manifesto — the one moment on the site where type is allowed to get
            large without a section header in front of it. */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <blockquote className="mx-auto max-w-4xl text-balance text-center text-3xl font-medium leading-[1.25] tracking-[-0.03em] sm:text-[2.75rem]">
                Is it real, does it work, and would we stake our name on it?
                Nothing leaves the lab until the answer is yes, three times over.
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* What we won't do */}
        <Section>
          <SectionHead
            index="02"
            label="And what we won't"
            title="The list of things we say no to"
            lede="An ethos is as much about what you refuse as what you chase. These are the defaults everyone else in the category accepts — and the ones we don't."
          />

          <ul className="mt-16 border-t border-border">
            {refusals.map((r, i) => (
              <Reveal
                as="li"
                key={i}
                delay={Math.min(i, 4) * 0.05}
                className="flex gap-6 border-b border-border py-6 sm:gap-10"
              >
                <span className="eyebrow shrink-0 pt-1.5">
                  No {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-body max-w-2xl text-pretty">{r}</span>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Four disciplines, one roof */}
        <Section>
          <SectionHead
            index="03"
            label="One roof"
            title="Four disciplines that sharpen each other"
            lede="Games, apps, AI and systems don't sit in separate teams here. The simulation work that makes a game feel alive is the same instinct that makes a planning tool feel calm; the model we train for one firm sharpens the tools we build for everyone."
          />

          <div className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-4 lg:gap-0">
            {disciplines.map((d, i) => (
              <Reveal
                key={d.key}
                delay={i * 0.06}
                className={`lg:pr-8 ${i > 0 ? "lg:border-l lg:border-border lg:pl-8" : ""}`}
              >
                <span className="eyebrow">0{i + 1}</span>
                <h3 className="t-h3 mt-5 text-xl">{d.label}</h3>
                <p className="t-body mt-3 text-pretty text-[0.9375rem]">
                  {d.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Ownership — the ethos, applied */}
        <Ownership index="04" />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
