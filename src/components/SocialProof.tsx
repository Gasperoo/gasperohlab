import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

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
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
      <Reveal className="surface overflow-hidden rounded-2xl p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">In production</p>
            <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Already running real businesses.
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
              Our work isn&apos;t a portfolio of concepts. The Marapone suite —
              private, owned AI for construction and logistics — is built here and
              deployed on customers&apos; own hardware today.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
              {products.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} — visit live`}
                  className="group relative block h-8 w-40 opacity-70 transition hover:opacity-100"
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="160px"
                    className="object-contain object-left"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quote from the product team */}
          <figure className="flex flex-col justify-center border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <blockquote className="text-pretty text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              &ldquo;We wanted AI our clients could actually own — running in their
              own building, with the source in their hands and no meter ticking.
              The lab shipped exactly that, in production.&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
                M
              </span>
              <span className="text-sm">
                <span className="font-semibold text-foreground">The Marapone team</span>
                <a
                  href="https://marapone.com"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 inline-flex items-center gap-0.5 text-muted transition-colors hover:text-accent"
                >
                  marapone.com
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </span>
            </figcaption>
          </figure>
        </div>
      </Reveal>
    </section>
  );
}
