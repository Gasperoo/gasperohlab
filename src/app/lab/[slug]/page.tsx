import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { notes, getNote, formatDate } from "@/lib/notes";

const siteUrl = "https://gasperohlab.com";

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
    alternates: { canonical: `/lab/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${note.title} · GASPEROHLAB`,
      description: note.excerpt,
      publishedTime: note.date,
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

  const others = notes.filter((n) => n.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.excerpt,
    datePublished: note.date,
    author: { "@type": "Organization", name: "GASPEROHLAB" },
    publisher: { "@type": "Organization", name: "GASPEROHLAB" },
    mainEntityOfPage: `${siteUrl}/lab/${slug}`,
  };

  return (
    <>
      <Background />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <article className="mx-auto max-w-2xl px-5 pt-32 pb-12 sm:px-6 sm:pt-40">
          <Reveal>
            <Link
              href="/lab"
              className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              The Lab
            </Link>
          </Reveal>

          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              <span className="text-accent">{note.kind}</span>
              <span>·</span>
              <span>{formatDate(note.date)}</span>
              <span>·</span>
              <span>{note.readingTime} min read</span>
            </div>
            <h1 className="mt-5 font-display text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {note.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              {note.excerpt}
            </p>
          </Reveal>

          <div className="mt-10 border-t border-border pt-8">
            {note.body.map((block, i) => (
              <Reveal key={i} delay={Math.min(i, 4) * 0.03}>
                <NoteBlockView block={block} />
              </Reveal>
            ))}
          </div>
        </article>

        {others.length > 0 && (
          <section className="mx-auto max-w-2xl px-5 pb-8 sm:px-6">
            <div className="border-t border-border pt-8">
              <p className="eyebrow mb-5">Keep reading</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/lab/${n.slug}`}
                    className="surface surface-hover-fx group flex flex-col rounded-xl p-5"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {n.kind}
                    </span>
                    <span className="mt-2 flex items-center gap-1.5 font-semibold tracking-tight">
                      {n.title}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}

function NoteBlockView({ block }: { block: import("@/lib/notes").NoteBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-display text-xl font-bold tracking-tight sm:text-2xl">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-accent pl-5 text-pretty text-lg font-medium leading-relaxed text-foreground">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-pretty leading-relaxed text-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="mt-5 text-pretty leading-relaxed text-muted">{block.text}</p>
      );
  }
}
