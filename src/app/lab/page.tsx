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
    "Notes from GASPEROHLAB — devlogs, engineering write-ups and the thinking behind what we build and what we cut.",
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
      "Devlogs, engineering write-ups and the thinking behind what we build.",
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
          title="What we're learning, out loud."
          lede="We build to learn. This is where some of that gets written down — devlogs, engineering notes, and the reasoning behind what makes it out of the lab and what doesn't."
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
                  className="group grid gap-3 border-b border-border py-8 transition-colors duration-300 hover:bg-black/[0.022] lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
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
