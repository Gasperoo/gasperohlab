import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { testimonials } from "@/lib/testimonials";

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

/**
 * Evidence, led by what other people say.
 *
 * The quotes now come from data (lib/testimonials.ts) rather than being set in
 * the markup, so this reads a list. With one quote it stays exactly as it was —
 * set at heading scale, nothing competing with it. With more it becomes a ruled
 * stack, each quote stepping down from the first: the lead quote is the
 * strongest thing on the page and shouldn't be flattened into a row of equal
 * cards the moment a second one arrives.
 */
export function SocialProof({ index = "03" }: { index?: string }) {
  const [lead, ...rest] = testimonials;

  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow lg:pt-2.5">
            <span className="text-muted">{index}</span>
            <span className="mx-2 opacity-40">/</span>
            In production
          </p>
        </Reveal>

        <div>
          <Reveal>
            <figure>
              <blockquote className="max-w-3xl text-pretty text-2xl font-medium leading-[1.35] tracking-[-0.025em] text-foreground sm:text-[2rem]">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <Attribution t={lead} className="mt-8" />
            </figure>
          </Reveal>

          {rest.length > 0 && (
            <div className="mt-12 border-t border-border">
              {rest.map((t, i) => (
                <Reveal key={t.author} delay={i * 0.06}>
                  <figure className="border-b border-border py-8">
                    <blockquote className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <Attribution t={t} className="mt-5" />
                  </figure>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.08}>
            <p
              className={`t-body max-w-2xl text-pretty ${
                rest.length > 0 ? "mt-10" : "mt-12 border-t border-border pt-10"
              }`}
            >
              Our work isn&apos;t a portfolio of concepts. The Marapone suite —
              private, owned AI for construction and logistics — is built here
              and deployed on customers&apos; own hardware today.
            </p>

            {/* Logos sit flattened to a single ink value until hovered, so they
                read as evidence rather than as a badge wall. */}
            <div className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-6">
              {products.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} — visit live`}
                  className="logo-mark relative block h-7 w-36"
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

function Attribution({
  t,
  className = "",
}: {
  t: (typeof testimonials)[number];
  className?: string;
}) {
  const credit = [t.role, t.org].filter(Boolean).join(", ");

  return (
    <figcaption
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${className}`}
    >
      <span className="text-foreground">{t.author}</span>
      {credit && (
        <>
          <span className="text-faint" aria-hidden>
            ·
          </span>
          {t.href ? (
            <a
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
            >
              {credit}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
          ) : (
            <span className="text-muted">{credit}</span>
          )}
        </>
      )}
    </figcaption>
  );
}
