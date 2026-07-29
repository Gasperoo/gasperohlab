import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Section";
import { PageHero } from "./PageHero";
import { steps } from "./HowWeWork";
import { founder } from "@/lib/site";

const story = [
  "GASPEROHLAB started in 2025 out of a simple frustration: too much good software dies in slide decks. We wanted a place where an idea could be built, pressed on, and either earn its keep or be cut — without a committee standing in the way.",
  "So we kept it small and independent. No investors steering the roadmap, no quarterly theatre. Just a tight team that owns its tools end to end and moves between disciplines freely, because the best ideas rarely respect the line between a game, an app and a model.",
  "Some of what we make ships under our own name. Some of it powers other companies quietly — like Marapone, the private AI suite we build for the construction and logistics industries. All of it has to survive the same test: is it real, does it work, and would we stake our name on it?",
];

export function About() {
  return (
    <>
      <PageHero
        label="About the lab"
        title="A small lab with a long attention span."
        lede="GASPEROHLAB is an independent software lab. We take hard, interesting problems from a single question all the way to production — across games, applications, AI models and the systems that hold them together."
        facts={[
          { label: "Founded", value: "2025" },
          { label: "Based", value: "Toronto, Canada" },
          { label: "Ownership", value: "Independent, no investors" },
        ]}
      />

      <Section id="story">
        <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow lg:pt-2.5">
              <span className="text-muted">01</span>
              <span className="mx-2 opacity-40">/</span>
              Our story
            </p>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal>
              <h2 className="t-h2 text-balance">Why a lab, not a studio</h2>
            </Reveal>
            {/* The lede paragraph is set larger than the ones that follow, so
                the entry point into the copy is obvious without a pull-quote. */}
            {story.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={`text-pretty ${
                    i === 0
                      ? "t-lede mt-7"
                      : "t-body mt-6 text-[0.9375rem] sm:text-base"
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* "A small lab with a long attention span" is a story about people, and
          the page told it without naming any. This renders only once there's a
          real person in lib/site.ts — an invented founder would be worse than
          the omission it fixes. */}
      {founder && (
        <Section id="founder">
          <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow lg:pt-2.5">
                <span className="text-muted">02</span>
                <span className="mx-2 opacity-40">/</span>
                Who&apos;s behind it
              </p>
            </Reveal>

            <div className="max-w-2xl">
              <Reveal>
                <h2 className="t-h2 text-balance">{founder.name}</h2>
                <p className="eyebrow mt-4">{founder.role}</p>
                <p className="t-lede mt-7 text-pretty">{founder.bio}</p>
              </Reveal>

              {founder.sameAs && founder.sameAs.length > 0 && (
                <Reveal delay={0.06}>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                    {founder.sameAs.map((href) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                      >
                        {new URL(href).hostname.replace(/^www\./, "")}
                      </a>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </Section>
      )}

      <Section id="method">
        <SectionHead
          index={founder ? "03" : "02"}
          label="How we work"
          title="From a question to production"
          lede="No two projects look the same, but they all move through the same four gates. Most ideas don't make it past the second — and that is exactly the point."
        />

        <ol className="mt-16 border-t border-border">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.06}
              className="grid gap-2 border-b border-border py-8 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
            >
              <span className="eyebrow">Gate 0{i + 1}</span>
              <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
                <h3 className="t-h3 text-xl">{step.title}</h3>
                <p className="t-body max-w-xl text-pretty">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
