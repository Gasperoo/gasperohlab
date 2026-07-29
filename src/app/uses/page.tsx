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
import { uses, type UseItem } from "@/lib/uses";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The tools, languages and infrastructure GASPEROHLAB builds with — for this site and for the private AI systems we ship on customers' own hardware.",
  alternates: { canonical: "/uses" },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/uses",
    title: "Uses · GASPEROHLAB",
    description:
      "The tools, languages and infrastructure the lab builds with.",
  },
};

/** External links open away; internal ones use the client router. */
function ItemLink({ item }: { item: UseItem }) {
  const label = (
    <span className="t-h3 flex items-start gap-1.5 text-lg">
      {item.name}
      {item.href && (
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      )}
    </span>
  );

  if (!item.href) return label;
  if (item.href.startsWith("/")) {
    return (
      <Link href={item.href} className="group inline-flex">
        {label}
      </Link>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex"
    >
      {label}
    </a>
  );
}

export default function UsesPage() {
  const jsonLd = graph(breadcrumbs([{ name: "Uses", path: "/uses" }]));
  const total = uses.reduce((n, g) => n + g.items.length, 0);

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
          label="Uses"
          title="What we build with, and why."
          lede="Not a list of logos. Every entry here is something the work actually depends on, with the reason it beat the alternative — because the reason is the only part of a stack list worth reading."
          facts={[
            { label: "Entries", value: String(total) },
            { label: "Versions pinned", value: "None — see package.json" },
            { label: "Updated", value: "July 2026" },
          ]}
        />

        {uses.map((group, gi) => (
          <section key={group.heading} className="border-t border-border">
            <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
              <Reveal className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
                <p className="eyebrow lg:pt-2.5">
                  <span className="text-muted">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 opacity-40">/</span>
                  {group.heading}
                </p>
                {group.lede && (
                  <p className="t-lede max-w-2xl text-pretty">{group.lede}</p>
                )}
              </Reveal>

              <div className="mt-12 border-t border-border">
                {group.items.map((item, i) => (
                  <Reveal
                    key={item.name}
                    delay={Math.min(i, 6) * 0.04}
                    className="row-hover grid gap-2 border-b border-border py-6 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
                  >
                    <span className="eyebrow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
                      <ItemLink item={item} />
                      <p className="t-body max-w-xl text-pretty text-[0.9375rem]">
                        {item.note}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8">
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-faint">
              No desk, keyboard or editor section. Everything on this page is
              something the shipped work demonstrably depends on, and a workspace
              list would be the first thing here that isn&apos;t.
            </p>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
