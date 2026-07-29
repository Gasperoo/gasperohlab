import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

// Marapone is the private-AI suite the lab builds and ships — its products are
// running in production today. These link out to the live suites.
const products = [
  {
    name: "Marapone Construction",
    logo: "/logos/marapone-construction.png",
    href: "https://marapone.com/construction",
  },
  {
    name: "Marapone",
    logo: "/logos/marapone.png",
    href: "https://marapone.com",
  },
];

export function SocialProof() {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow lg:pt-2.5">
            <span className="text-muted">03</span>
            <span className="mx-2 opacity-40">/</span>
            In production
          </p>
        </Reveal>

        <div>
          {/* The quote leads. It's the strongest thing on the page, so it gets
              set at heading scale and nothing competes with it — no card, no
              border, no avatar tile. */}
          <Reveal>
            <figure>
              <blockquote className="max-w-3xl text-pretty text-2xl font-medium leading-[1.35] tracking-[-0.025em] text-foreground sm:text-[2rem]">
                &ldquo;We wanted AI our clients could actually own — running in
                their own building, with the source in their hands and no meter
                ticking. The lab shipped exactly that, in production.&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="text-foreground">The Marapone team</span>
                <span className="text-faint" aria-hidden>
                  ·
                </span>
                <a
                  href="https://marapone.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
                >
                  marapone.com
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                </a>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="t-body mt-12 max-w-2xl text-pretty border-t border-border pt-10">
              Our work isn&apos;t a portfolio of concepts. The Marapone suite —
              private, owned AI for construction and logistics — is built here
              and deployed on customers&apos; own hardware today.
            </p>

            {/* Logos sit greyscale until hovered, so they read as evidence
                rather than as a badge wall. */}
            <div className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-6">
              {products.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} — visit live`}
                  className="relative block h-7 w-36 opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="144px"
                    className="object-contain object-left"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
