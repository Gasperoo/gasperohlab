import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, graph } from "@/lib/schema";
import { log, formatLogDate, logByKind, type LogKind } from "@/lib/log";

export const metadata: Metadata = {
  title: "Shipping log",
  description:
    "What GASPEROHLAB shipped, changed and threw away — a dated log of the work, including the ideas that didn't survive.",
  alternates: { canonical: "/log" },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/log",
    title: "Shipping log · GASPEROHLAB",
    description:
      "What we shipped, changed and threw away — including the ideas that didn't survive.",
  },
};

/**
 * Only "Cut" is marked in colour.
 *
 * The whole argument for publishing this page is that the cuts are on it, so
 * they get the one accent dot; a legend where every kind is a different colour
 * would turn a document into a dashboard.
 */
const kindTone: Record<LogKind, string> = {
  Shipped: "bg-foreground",
  Started: "bg-faint",
  Changed: "bg-faint",
  Cut: "bg-accent",
};

export default function LogPage() {
  const jsonLd = graph(
    breadcrumbs([{ name: "Shipping log", path: "/log" }])
  );

  return (
    <>
      <Background />
      <Nav />
      <JsonLd data={jsonLd} />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <PageHero
          label="The record"
          title="Everything we shipped — and everything we cut."
          lede="We say most ideas die at the second gate. This is the evidence. Releases, rewrites and abandonments in one list, because a changelog that only lists launches quietly argues the opposite."
          facts={[
            { label: "Shipped", value: String(logByKind("Shipped").length) },
            { label: "Cut", value: String(logByKind("Cut").length) },
            { label: "Entries", value: String(log.length) },
          ]}
        />

        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
            <ol className="border-t border-border">
              {log.map((entry, i) => {
                // Roughly half the entries point at something — a case study,
                // a note — and half describe work that has no page of its own.
                // The row is a link only when there's somewhere to go, rather
                // than always being one and sometimes going nowhere.
                const row = (
                  <>
                    <p className="eyebrow flex items-center gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${kindTone[entry.kind]}`}
                        aria-hidden
                      />
                      {formatLogDate(entry.date)}
                    </p>

                    <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
                      <div>
                        <h2 className="t-h3 flex items-start gap-1.5 text-lg">
                          {entry.title}
                          {entry.href && (
                            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                          )}
                        </h2>
                        <p className="eyebrow mt-3">{entry.kind}</p>
                      </div>
                      <p className="t-body max-w-xl text-pretty text-[0.9375rem]">
                        {entry.body}
                      </p>
                    </div>
                  </>
                );

                const shape =
                  "grid gap-3 border-b border-border py-8 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16";

                return (
                  <Reveal
                    as="li"
                    key={`${entry.date}-${entry.title}`}
                    delay={Math.min(i, 6) * 0.04}
                  >
                    {entry.href ? (
                      <Link href={entry.href} className={`group row-hover ${shape}`}>
                        {row}
                      </Link>
                    ) : (
                      <div className={shape}>{row}</div>
                    )}
                  </Reveal>
                );
              })}
            </ol>

            <p className="mt-10 max-w-xl text-pretty text-sm leading-relaxed text-faint">
              Product milestones before this site existed are recorded to the
              year rather than the day — we&apos;d rather be vague than invent a
              date.
            </p>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
