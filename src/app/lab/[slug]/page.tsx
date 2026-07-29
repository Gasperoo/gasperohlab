import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import {
  notes,
  getNote,
  formatDate,
  author,
  headingId,
  noteNeighbours,
  relatedNotes,
  tableOfContents,
  type Note,
  type NoteBlock,
} from "@/lib/notes";
import { breadcrumbs, graph, orgRef, siteUrl } from "@/lib/schema";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  const url = `${siteUrl}/lab/${slug}`;
  return {
    title: note.title,
    description: note.excerpt,
    keywords: note.tags,
    alternates: { canonical: `/lab/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${note.title} · GASPEROHLAB`,
      description: note.excerpt,
      publishedTime: note.date,
      authors: [author],
      tags: note.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} · GASPEROHLAB`,
      description: note.excerpt,
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const toc = tableOfContents(note);
  const related = relatedNotes(slug);
  const { newer, older } = noteNeighbours(slug);

  const jsonLd = graph(
    {
      "@type": "BlogPosting",
      "@id": `${siteUrl}/lab/${slug}#post`,
      headline: note.title,
      description: note.excerpt,
      datePublished: note.date,
      dateModified: note.date,
      articleSection: note.kind,
      ...(note.tags?.length ? { keywords: note.tags.join(", ") } : {}),
      // Code listings are excluded — a word count that includes source is a
      // reading-time estimate nobody can act on.
      wordCount: note.body
        .flatMap((b) => {
          if (b.type === "list") return b.items;
          if (b.type === "code") return [];
          if (b.type === "figure") return [b.caption ?? ""];
          return [b.text];
        })
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length,
      timeRequired: `PT${note.readingTime}M`,
      image: `${siteUrl}/lab/${slug}/opengraph-image`,
      inLanguage: "en",
      author: orgRef,
      publisher: orgRef,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntityOfPage: `${siteUrl}/lab/${slug}`,
    },
    breadcrumbs([
      { name: "Lab", path: "/lab" },
      { name: note.title, path: `/lab/${slug}` },
    ])
  );

  return (
    <>
      <Background />
      <Nav />
      <ReadingProgress />
      <JsonLd data={jsonLd} />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <article className="mx-auto w-full max-w-2xl px-5 pt-32 pb-12 sm:px-8 sm:pt-40">
          <Reveal>
            <Link
              href="/lab"
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              The Lab
            </Link>
          </Reveal>

          <Reveal className="mt-10">
            <p className="eyebrow">
              {note.kind}
              <span className="mx-2 opacity-40">/</span>
              {formatDate(note.date)}
              <span className="mx-2 opacity-40">/</span>
              {note.readingTime} min read
            </p>
            <h1 className="t-h1 mt-6 text-balance">{note.title}</h1>
            {/* No byline. With `founder` unset the credit resolved to "By
                GASPEROHLAB" on the lab's own site — a line that reads as a
                placeholder because it tells the reader nothing. The author is
                still carried in the OpenGraph tags and the JSON-LD graph, where
                a machine does need to be told. */}
            <p className="t-lede mt-6 text-pretty">{note.excerpt}</p>
          </Reveal>

          {/* Contents. A ruled block rather than a floating sidebar — these
              posts are short enough that a sticky rail would be furniture, but
              long enough that a reader deciding whether to commit wants to see
              the shape first. */}
          {toc.length > 1 && (
            <Reveal className="mt-10 border-y border-border py-6">
              <p className="eyebrow">Contents</p>
              <ol className="mt-4 flex flex-col gap-2.5">
                {toc.map((item, i) => (
                  <li key={item.id} className="flex gap-4">
                    <span className="eyebrow shrink-0 pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${item.id}`}
                      className="text-pretty text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          <div className="mt-12 border-t border-border pt-10">
            {note.body.map((block, i) => (
              <Reveal key={i} delay={Math.min(i, 4) * 0.03}>
                <NoteBlockView block={block} />
              </Reveal>
            ))}
          </div>

          {note.tags && note.tags.length > 0 && (
            <Reveal className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-8">
              <span className="eyebrow">Filed under</span>
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border px-2.5 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </Reveal>
          )}
        </article>

        {/* Sequential neighbours. Position in the archive is a real
            relationship; "the first two other notes" was not. */}
        {(newer || older) && (
          <nav
            aria-label="More notes"
            className="mx-auto w-full max-w-2xl px-5 pb-4 sm:px-8"
          >
            <div className="grid border-y border-border sm:grid-cols-2">
              {older ? <NeighbourLink note={older} direction="older" /> : <span />}
              {newer && <NeighbourLink note={newer} direction="newer" />}
            </div>
          </nav>
        )}

        {related.length > 0 && (
          <section className="mx-auto w-full max-w-2xl px-5 pb-8 sm:px-8">
            <p className="eyebrow mt-10">Related</p>
            <div className="mt-6 border-t border-border">
              {related.map((n) => (
                <Link
                  key={n.slug}
                  href={`/lab/${n.slug}`}
                  className="group row-hover flex items-baseline justify-between gap-6 border-b border-border py-5"
                >
                  <span className="t-h3 flex items-start gap-1.5">
                    {n.title}
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </span>
                  <span className="eyebrow shrink-0">{n.kind}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}

function NeighbourLink({
  note,
  direction,
}: {
  note: Note;
  direction: "older" | "newer";
}) {
  const older = direction === "older";
  return (
    <Link
      href={`/lab/${note.slug}`}
      rel={older ? "prev" : "next"}
      className={`group row-hover flex flex-col gap-2 py-6 ${
        older ? "sm:pr-6" : "sm:items-end sm:border-l sm:border-border sm:pl-6"
      }`}
    >
      <span className="eyebrow flex items-center gap-2">
        {older && <ArrowLeft className="h-3 w-3" />}
        {older ? "Older" : "Newer"}
        {!older && <ArrowRight className="h-3 w-3" />}
      </span>
      <span className={`t-h3 text-pretty ${older ? "" : "sm:text-right"}`}>
        {note.title}
      </span>
    </Link>
  );
}

function NoteBlockView({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          className="t-h3 mt-12 scroll-mt-28 text-xl sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l border-border-strong pl-6 text-pretty text-lg leading-relaxed text-foreground">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-6 border-t border-border">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="border-b border-border py-3 text-pretty leading-relaxed text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <figure className="mt-8">
          <pre className="code-block">
            <code>{block.code}</code>
          </pre>
          {/* The language sits in the caption rather than as a floating badge
              over the corner of the block — a label is information, a badge is
              a sticker. */}
          {(block.caption || block.lang) && (
            <figcaption className="eyebrow mt-3 flex flex-wrap items-center gap-2">
              {block.lang && <span>{block.lang}</span>}
              {block.caption && block.lang && <span className="opacity-40">/</span>}
              {block.caption && (
                <span className="normal-case tracking-normal">
                  {block.caption}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      );
    case "figure":
      return (
        <figure className="mt-8">
          <div className="overflow-hidden rounded-lg border border-border bg-background-elevated">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 42rem"
              className="h-auto w-full object-contain"
            />
          </div>
          {block.caption && (
            <figcaption className="eyebrow mt-3 normal-case tracking-normal">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return <p className="t-body mt-6 text-pretty">{block.text}</p>;
  }
}
