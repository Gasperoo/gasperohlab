import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { CaseGallery } from "./CaseGallery";
import { AutoVideo } from "./AutoVideo";
import { getProject, type Chapter } from "@/lib/work";

/**
 * One product built on a platform, rendered inside the platform's case study.
 *
 * The hard part of folding two suites into the MaraponeAI page was not the
 * markup, it was making a long page navigable. Three rules do that work:
 *
 *  - Each chapter opens on a heavy rule and a numbered eyebrow, so scrolling
 *    past a chapter boundary is unmistakable in peripheral vision.
 *  - Prose stays at reading width while media runs to the full grid, exactly as
 *    on a standalone case study — the reader's eye keeps its measure.
 *  - Only the platform's own live link is an accent button. A chapter's is a
 *    text link, because four filled buttons down one page is a pricing table.
 *
 * Every video below the fold is poster-first (see AutoVideo), which is what
 * keeps a page carrying three videos and thirty stills from costing what it
 * looks like it costs.
 */
const WRAP = "mx-auto w-full max-w-[76rem] px-5 sm:px-8";

export function CaseChapter({
  chapter,
  index,
}: {
  chapter: Chapter;
  /** 1-based, shown as the chapter number. */
  index: number;
}) {
  const tools = (chapter.tools ?? [])
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.caseStudy));

  return (
    <section
      id={chapter.id}
      // scroll-mt clears the fixed header when arriving by fragment — both from
      // the chapter index above and from the redirected suite URLs.
      className="scroll-mt-24 pt-20"
    >
      <div className={WRAP}>
        <Reveal className="border-t-2 border-border-strong pt-10">
          <p className="eyebrow">
            {String(index).padStart(2, "0")}
            <span className="mx-2 opacity-40">/</span>
            {chapter.name}
          </p>
          <h2 className="t-h2 mt-5 max-w-3xl text-balance">{chapter.tagline}</h2>

          {chapter.body.map((para, i) => (
            <p key={i} className="t-body mt-5 max-w-2xl text-pretty">
              {para}
            </p>
          ))}

          {chapter.liveUrl && (
            <a
              href={chapter.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-2 text-sm text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {chapter.liveLabel ?? "Visit the product page"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </Reveal>

        {chapter.heroVideo && (
          <Reveal className="mt-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-background-elevated">
              <AutoVideo
                className="h-full w-full object-cover"
                src={chapter.heroVideo}
                poster={chapter.heroImage}
                label={`${chapter.name} — preview`}
              />
            </div>
          </Reveal>
        )}

        {chapter.metrics && chapter.metrics.length > 0 && (
          <Reveal className="mt-12">
            <dl className="grid border-t border-border sm:grid-cols-3">
              {chapter.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`border-b border-border py-7 pr-6 ${
                    i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""
                  }`}
                >
                  <dt className="text-[1.75rem] font-medium leading-none tracking-[-0.035em] text-foreground">
                    {m.value}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {chapter.gallery && chapter.gallery.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <p className="eyebrow">Inside the suite</p>
            </Reveal>
            <div className="mt-6">
              <CaseGallery shots={chapter.gallery} />
            </div>
          </div>
        )}

        {chapter.integrations && chapter.integrations.length > 0 && (
          <Reveal className="mt-14 border-t border-border pt-10">
            <p className="eyebrow">Plugs into the tools you already use</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-7">
              {chapter.integrations.map((it) => (
                <div key={it.name} className="logo-mark relative h-7 w-28">
                  <Image
                    src={it.src}
                    alt={it.name}
                    fill
                    sizes="112px"
                    className="object-contain object-left"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {chapter.companion && (
          <div className="mt-14 border-t border-border pt-10">
            <Reveal>
              <p className="eyebrow">The companion app</p>
              <h3 className="t-h3 mt-5 text-xl sm:text-2xl">
                {chapter.companion.heading}
              </h3>
              {chapter.companion.body.map((para, i) => (
                <p key={i} className="t-body mt-4 max-w-2xl text-pretty">
                  {para}
                </p>
              ))}
              {chapter.companion.status && (
                <p className="eyebrow mt-6">{chapter.companion.status}</p>
              )}
            </Reveal>
            {chapter.companion.shots && chapter.companion.shots.length > 0 && (
              <div className="mt-8">
                <CaseGallery shots={chapter.companion.shots} phone />
              </div>
            )}
          </div>
        )}

        {/* The deep dives. A chapter orients; these are the proofs, and they stay
            separate pages — pulling their prose in here would have cost the
            detail that makes them worth reading. */}
        {tools.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <Reveal>
              <p className="eyebrow">The tools, in full</p>
            </Reveal>
            <div className="mt-6 border-t border-border">
              {tools.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="group row-hover grid gap-2 border-b border-border py-6 lg:grid-cols-[15rem_1fr] lg:items-baseline lg:gap-12"
                  >
                    <h4 className="t-h3 flex items-center gap-1.5 text-lg">
                      {p.name.replace(/^Marapone /, "")}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </h4>
                    <p className="t-body max-w-2xl text-pretty text-[0.9375rem]">
                      {p.caseStudy?.tagline}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {chapter.stack && chapter.stack.length > 0 && (
          <Reveal className="mt-12 border-t border-border pt-8">
            <p className="eyebrow">Built with</p>
            <p className="mt-5 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-muted">
              {chapter.stack.join(", ")}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
