import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { notes, formatDate } from "@/lib/notes";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "Engineering write-ups and design notes from GASPEROHLAB — why the work is built the way it is, and why some of it was cut.",
  alternates: {
    canonical: "/lab",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "GASPEROHLAB — The Lab" },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/lab",
    title: "The Lab · GASPEROHLAB",
    description:
      "Engineering write-ups and design notes on how the work is built.",
  },
};

export default function LabIndex() {
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
          label="The lab notebook"
          title="The thinking behind the work."
          lede="Engineering write-ups and design notes from inside the products — why they are built the way they are, and why some of them were cut. Published when there is something worth reporting, not on a schedule."
        >
          <a
            href="/feed.xml"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-foreground"
          >
            <Rss className="h-3.5 w-3.5" />
            Subscribe via RSS
          </a>
        </PageHero>

        {/* The full index as a ruled table. The old page promoted one lead post
            into a large card and put the rest in a grid, which made the archive
            look like a shop rather than a notebook. */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
            {notes.map((note, i) => (
              <Reveal key={note.slug} delay={Math.min(i, 6) * 0.05}>
                <Link
                  href={`/lab/${note.slug}`}
                  className="group row-hover grid gap-3 border-b border-border py-8 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
                >
                  <p className="eyebrow">
                    {note.kind}
                    <span className="mx-2 opacity-40">/</span>
                    {formatDate(note.date)}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10">
                    <div className="max-w-2xl">
                      <h2 className="t-h3 flex items-start gap-1.5 text-xl sm:text-2xl">
                        {note.title}
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </h2>
                      {/* Tags are not rendered here. They earn their keep as
                          search terms and as the input to the related-notes
                          list; printed under every row they were three generic
                          lowercase words competing with the excerpt. */}
                      <p className="t-body mt-3 text-pretty text-[0.9375rem]">
                        {note.excerpt}
                      </p>
                    </div>
                    <span className="eyebrow shrink-0">
                      {note.readingTime} min
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
