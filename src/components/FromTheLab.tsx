import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Section, SectionHead, TextLink } from "./Section";
import { notes, formatDate } from "@/lib/notes";

// Surface the three most recent notes on the home page. /lab has the full set.
const latest = notes.slice(0, 3);

export function FromTheLab({ index = "09" }: { index?: string }) {
  return (
    <Section id="lab">
      <SectionHead
        index={index}
        label="From the lab"
        title="The thinking behind the work"
        lede="Engineering write-ups and design notes on how the products are built — and why some of them were cut."
        action={
          <Link href="/lab" className="group inline-flex">
            <TextLink>All notes</TextLink>
          </Link>
        }
      />

      {/* An index of notes, set as rows. A blog roll is a list; three cards
          side by side made three short posts look like a product tier table. */}
      <div className="mt-16 border-t border-border">
        {latest.map((note, i) => (
          <Reveal key={note.slug} delay={i * 0.06}>
            <Link
              href={`/lab/${note.slug}`}
              className="group row-hover grid gap-3 border-b border-border py-7 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
            >
              <p className="eyebrow">
                {note.kind}
                <span className="mx-2 opacity-40">/</span>
                {formatDate(note.date)}
              </p>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10">
                <div className="max-w-2xl">
                  <h3 className="t-h3 flex items-center gap-1.5 text-xl">
                    {note.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </h3>
                  <p className="t-body mt-2.5 text-pretty text-[0.9375rem]">
                    {note.excerpt}
                  </p>
                </div>
                <span className="eyebrow shrink-0">{note.readingTime} min</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
