import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { notes, formatDate } from "@/lib/notes";

// Surface the three most recent notes on the home page. /lab has the full set.
const latest = notes.slice(0, 3);

export function FromTheLab() {
  return (
    <section
      id="lab"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">From the lab</p>
          <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            What we&apos;re learning, out loud.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted">
            Devlogs, engineering notes and the reasoning behind what makes it out
            of the lab — and what doesn&apos;t.
          </p>
        </div>
        <Link
          href="/lab"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground"
        >
          All notes
          <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((note, i) => (
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
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors group-hover:text-foreground">
                {formatDate(note.date)}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
