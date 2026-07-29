import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { notes, getNote, formatDate } from "@/lib/notes";
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

  const jsonLd = graph(
    {
      "@type": "BlogPosting",
      "@id": `${siteUrl}/lab/${slug}#post`,
      headline: note.title,
      description: note.excerpt,
      datePublished: note.date,
      dateModified: note.date,
      articleSection: note.kind,
      wordCount: note.body
        .flatMap((b) =>
          b.type === "list" ? b.items : "text" in b ? [b.text] : []
        )
        .join(" ")
        .split(/\s+/).length,
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
            <p className="t-lede mt-6 text-pretty">{note.excerpt}</p>
          </Reveal>

          <div className="mt-12 border-t border-border pt-10">
            {note.body.map((block, i) => (
              <Reveal key={i} delay={Math.min(i, 4) * 0.03}>
                <NoteBlockView block={block} />
              </Reveal>
            ))}
          </div>
        </article>

        {others.length > 0 && (
          <section className="mx-auto w-full max-w-2xl px-5 pb-8 sm:px-8">
            <p className="eyebrow border-t border-border pt-10">Keep reading</p>
            <div className="mt-6 border-t border-border">
              {others.map((n) => (
                <Link
                  key={n.slug}
                  href={`/lab/${n.slug}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-border py-5 transition-colors duration-300 hover:bg-black/[0.022]"
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

function NoteBlockView({ block }: { block: import("@/lib/notes").NoteBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="t-h3 mt-12 text-xl sm:text-2xl">{block.text}</h2>
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
    default:
      return (
        <p className="t-body mt-6 text-pretty">{block.text}</p>
      );
  }
}
