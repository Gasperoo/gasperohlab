import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { CaseGallery } from "@/components/CaseGallery";
import { AutoVideo } from "@/components/AutoVideo";
import { BetaWaitlist } from "@/components/BetaWaitlist";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, graph, orgRef } from "@/lib/schema";
import { getProject, projects, caseStudySlugs } from "@/lib/work";

const siteUrl = "https://gasperohlab.com";

// The case study keeps its structure — hero, overview, numbered sections,
// motion, gallery, integrations, stack. Only the surface changes: same widths
// and rhythm as the rest of the redesign, hairline rules instead of card
// borders, and the build-progress meter dropped.
const WRAP = "mx-auto w-full max-w-[76rem] px-5 sm:px-8";
const PROSE = "mx-auto w-full max-w-3xl px-5 sm:px-8";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  const title = project.name;
  const description = project.caseStudy.tagline;
  const url = `${siteUrl}/work/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { type: "article", url, title: `${title} · GASPEROHLAB`, description },
    twitter: { card: "summary_large_image", title: `${title} · GASPEROHLAB`, description },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const cs = project.caseStudy;
  const heroMedia = cs.heroVideo || cs.heroImage || project.cover;

  // The page is an article; the thing it's about is the product. Games and apps
  // model cleanly as SoftwareApplication — the AI models and internal programs
  // don't, so those stay the more general CreativeWork.
  const isSoftware =
    project.discipline === "App" || project.discipline === "Game";

  const jsonLd = graph(
    {
      "@type": "Article",
      "@id": `${siteUrl}/work/${slug}#article`,
      headline: `${project.name} — case study`,
      description: cs.tagline,
      image: `${siteUrl}/work/${slug}/opengraph-image`,
      inLanguage: "en",
      author: orgRef,
      publisher: orgRef,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntityOfPage: `${siteUrl}/work/${slug}`,
      about: { "@id": `${siteUrl}/work/${slug}#project` },
    },
    {
      "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
      "@id": `${siteUrl}/work/${slug}#project`,
      name: project.name,
      description: cs.tagline,
      url: `${siteUrl}/work/${slug}`,
      ...(cs.liveUrl ? { sameAs: [cs.liveUrl] } : {}),
      ...(project.cover ? { image: `${siteUrl}${project.cover}` } : {}),
      creator: orgRef,
      genre: project.discipline,
      dateCreated: String(project.year),
      ...(isSoftware ? { applicationCategory: project.discipline } : {}),
      ...(cs.stack?.length ? { keywords: cs.stack.join(", ") } : {}),
    },
    breadcrumbs([
      { name: "Work", path: "/work" },
      { name: project.name, path: `/work/${slug}` },
    ])
  );

  // "More work" — a couple of other case studies to keep people moving.
  const more = projects.filter((p) => p.slug !== slug && p.caseStudy).slice(0, 3);

  const meta = [
    { label: "What we did", value: cs.role },
    { label: "Timeframe", value: cs.timeframe },
    { label: "Discipline", value: project.discipline },
    { label: "Status", value: `${project.status} · ${project.year}` },
  ];

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
        {/* ---- Header ---- */}
        <section>
          <div className={`${WRAP} pt-32 pb-14 sm:pt-40 sm:pb-16`}>
            <Reveal>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                All work
              </Link>
            </Reveal>

            <Reveal className="mt-10">
              <h1 className="t-h1 max-w-3xl text-balance">{project.name}</h1>
              <p className="t-lede mt-6 max-w-2xl text-pretty">{cs.tagline}</p>

              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Visit {cs.liveLabel ?? "live site"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </Reveal>
          </div>

          {/* Project facts, in the same ruled strip the site uses everywhere. */}
          <div className="border-t border-border">
            <dl className={`${WRAP} grid grid-cols-2 lg:grid-cols-4`}>
              {meta.map((m, i) => (
                <div key={m.label} className={`py-6 ${metaRules[i]}`}>
                  <dt className="eyebrow">{m.label}</dt>
                  <dd className="mt-2.5 max-w-[16rem] text-sm text-foreground">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- Hero media ---- */}
        {heroMedia && (
          <section className={`${WRAP} pt-14 sm:pt-20`}>
            <Reveal>
              {cs.heroVideo && cs.heroVideoPortrait ? (
                // Portrait capture: centred on plain ink. The accent glow that
                // used to sit behind the phone is gone.
                <div className="flex justify-center overflow-hidden rounded-lg border border-border bg-background-elevated px-4 py-12 sm:py-16">
                  <AutoVideo
                    className="h-[440px] w-auto rounded-[10px] sm:h-[560px] lg:h-[620px]"
                    src={cs.heroVideo}
                    poster={cs.heroImage || project.cover}
                    label={`${project.name} — app preview`}
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-background-elevated">
                  {cs.heroVideo ? (
                    <AutoVideo
                      className="h-full w-full object-cover"
                      src={cs.heroVideo}
                      poster={cs.heroImage || project.cover}
                      label={`${project.name} — preview`}
                    />
                  ) : (
                    <Image
                      src={heroMedia}
                      alt={`${project.name} — preview`}
                      fill
                      // This one genuinely is the LCP element of the page.
                      preload
                      sizes="(max-width: 1024px) 100vw, 1216px"
                      className="object-cover object-top"
                    />
                  )}
                </div>
              )}
            </Reveal>
          </section>
        )}

        {/* ---- Overview ---- */}
        <section className={`${PROSE} pt-16 sm:pt-20`}>
          {cs.overview.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className={`text-pretty ${
                  i === 0 ? "t-lede" : "t-body mt-6"
                }`}
              >
                {para}
              </p>
            </Reveal>
          ))}
        </section>

        {/* ---- Outcome figures ---- */}
        {cs.metrics && cs.metrics.length > 0 && (
          <section className={`${PROSE} pt-14`}>
            <Reveal>
              <dl className="grid border-t border-border sm:grid-cols-3">
                {cs.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`border-b border-border py-7 pr-6 ${
                      i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""
                    }`}
                  >
                    <dt className="text-[2rem] font-medium leading-none tracking-[-0.035em] text-foreground">
                      {m.value}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-muted">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </section>
        )}

        {/* ---- Body sections ---- */}
        <div className={`${PROSE} pb-4`}>
          {cs.sections.map((section, i) => (
            <section key={i} className="mt-16 border-t border-border pt-10">
              <Reveal>
                <p className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="t-h2 mt-5 text-[1.75rem] text-balance sm:text-[2rem]">
                  {section.heading}
                </h2>
              </Reveal>
              {section.body.map((para, j) => (
                <Reveal key={j} delay={j * 0.05}>
                  <p className="t-body mt-5 text-pretty">{para}</p>
                </Reveal>
              ))}
            </section>
          ))}
        </div>

        {/* ---- In motion ---- */}
        {cs.motion && cs.motion.length > 0 && (
          <section className={`${WRAP} pt-20`}>
            <Reveal className="border-t border-border pt-10">
              <p className="eyebrow">In motion</p>
              <h2 className="t-h2 mt-5 text-[1.75rem] sm:text-[2rem]">
                The app, running
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {cs.motion.map((clip, i) => (
                <Reveal key={clip.label} delay={i * 0.07}>
                  <figure className="flex flex-col">
                    <div className="overflow-hidden rounded-lg border border-border bg-background-elevated">
                      <AutoVideo
                        className="mx-auto block h-auto w-full max-w-[300px]"
                        src={clip.src}
                        poster={clip.poster}
                        label={`${project.name} — ${clip.label}`}
                      />
                    </div>
                    <figcaption className="eyebrow mt-4">{clip.label}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ---- Gallery ---- */}
        {cs.gallery && cs.gallery.length > 0 && (
          <section className={`${WRAP} pt-20`}>
            <Reveal className="border-t border-border pt-10">
              <p className="eyebrow">Inside the product</p>
              <h2 className="t-h2 mt-5 text-[1.75rem] sm:text-[2rem]">
                {cs.galleryPhone ? "Screens" : "The tools"}
              </h2>
            </Reveal>
            <div className="mt-10">
              <CaseGallery shots={cs.gallery} phone={cs.galleryPhone} />
            </div>
          </section>
        )}

        {/* ---- Integrations ---- */}
        {cs.integrations && cs.integrations.length > 0 && (
          <section className={`${WRAP} pt-20`}>
            <Reveal className="border-t border-border pt-10">
              <p className="eyebrow">Plugs into the tools you already use</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-7">
                {cs.integrations.map((it) => (
                  <div
                    key={it.name}
                    className="relative h-7 w-28 opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  >
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
          </section>
        )}

        {/* ---- Engine & stack ---- */}
        {(cs.engine || (cs.stack && cs.stack.length > 0)) && (
          <section className={`${WRAP} pt-20`}>
            <Reveal className="grid gap-10 border-t border-border pt-10 lg:grid-cols-2 lg:gap-16">
              {cs.engine && (
                <div>
                  <p className="eyebrow">Powered by</p>
                  <div className="mt-6 flex items-center gap-5">
                    <div className="relative h-10 w-10 shrink-0">
                      <Image
                        src={cs.engine.src}
                        alt={cs.engine.name}
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-foreground">{cs.engine.name}</p>
                      {cs.engine.note && (
                        <p className="mt-0.5 text-sm text-muted">
                          {cs.engine.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {cs.stack && cs.stack.length > 0 && (
                <div>
                  <p className="eyebrow">Built with</p>
                  {/* A comma-set line rather than a wall of pills. */}
                  <p className="mt-6 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-muted">
                    {cs.stack.join(", ")}
                  </p>
                </div>
              )}
            </Reveal>
          </section>
        )}

        {/* ---- Beta waitlist ---- */}
        {cs.waitlist && (
          <BetaWaitlist
            project={project.name}
            platforms={cs.waitlist.platforms}
            blurb={cs.waitlist.blurb}
          />
        )}

        {/* ---- More work ---- */}
        {more.length > 0 && (
          <section className={`${WRAP} pt-20 pb-8`}>
            <Reveal className="border-t border-border pt-10">
              <p className="eyebrow">More from the lab</p>
            </Reveal>
            <div className="mt-8 border-t border-border">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="group grid gap-2 border-b border-border py-7 transition-colors duration-300 hover:bg-white/[0.015] lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
                  >
                    <span className="eyebrow">
                      {p.discipline}
                      <span className="mx-2 opacity-40">/</span>
                      {p.year}
                    </span>
                    <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
                      <h3 className="t-h3 flex items-center gap-1.5 text-xl">
                        {p.name}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </h3>
                      <p className="t-body max-w-xl text-pretty text-[0.9375rem]">
                        {p.blurb}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <CTA />
        </div>
      </main>
      <Footer />
    </>
  );
}

// The fact strip reflows 2×2 → 1×4; see the hero strip for why these are
// spelled out rather than derived from the index.
const metaRules = [
  "border-b border-border pr-5 lg:border-b-0 lg:pr-6",
  "border-b border-l border-border pl-5 lg:border-b-0 lg:pl-6 lg:pr-6",
  "pr-5 lg:border-l lg:border-border lg:pl-6 lg:pr-6",
  "border-l border-border pl-5 lg:pl-6",
];
