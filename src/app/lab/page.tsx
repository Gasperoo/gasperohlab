import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
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
  const [lead, ...rest] = notes;

  return (
    <>
      <Background />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <section className="mx-auto max-w-5xl px-5 pt-36 pb-12 sm:px-6 sm:pt-44">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal>
              <p className="eyebrow mb-4">The lab notebook</p>
              <h1 className="max-w-3xl font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                What we&apos;re learning,<span className="text-accent"> out loud.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                We build to learn. This is where some of that gets written down —
                devlogs, engineering notes, and the reasoning behind what makes it
                out of the lab and what doesn&apos;t.
              </p>
              <a
                href="/feed.xml"
                className="group mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-foreground"
              >
                <Rss className="h-3.5 w-3.5 text-accent" />
                Subscribe via RSS
              </a>
            </Reveal>

            {/* Lab character — framed visual beside the intro */}
            <Reveal delay={0.1}>
              <div className="surface relative hidden aspect-square overflow-hidden rounded-2xl lg:block">
                <div className="absolute inset-0 grid-bg opacity-70" />
                <div
                  className="absolute inset-0 -z-0 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(var(--accent-rgb),0.22), transparent 70%)",
                  }}
                />
                <Image
                  src="/alt/alt1.jpg"
                  alt="GASPEROHLAB voxel character, molten variant"
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-contain object-bottom p-5"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-8 sm:px-6">
          {/* Lead post */}
          <Reveal>
            <Link
              href={`/lab/${lead.slug}`}
              className="surface surface-hover-fx group block overflow-hidden rounded-2xl p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                <span className="text-accent">{lead.kind}</span>
                <span>·</span>
                <span>{formatDate(lead.date)}</span>
                <span>·</span>
                <span>{lead.readingTime} min read</span>
              </div>
              <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
                {lead.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Read the note
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          {/* The rest */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.map((note, i) => (
              <Reveal key={note.slug} delay={i * 0.06}>
                <Link
                  href={`/lab/${note.slug}`}
                  className="surface surface-hover-fx group flex h-full flex-col rounded-2xl p-7"
                >
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                    <span className="text-accent">{note.kind}</span>
                    <span>·</span>
                    <span>{note.readingTime} min</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                    {note.title}
                  </h3>
                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted">
                    {note.excerpt}
                  </p>
                  <span className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                    {formatDate(note.date)}
                  </span>
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
