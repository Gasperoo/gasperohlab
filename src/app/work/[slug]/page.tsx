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
import { CountUp } from "@/components/CountUp";
import { BetaWaitlist } from "@/components/BetaWaitlist";
import {
  disciplineIcon,
  getProject,
  projects,
  caseStudySlugs,
} from "@/lib/work";

const siteUrl = "https://gasperohlab.com";

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
  const Icon = disciplineIcon[project.discipline];
  const heroMedia = cs.heroVideo || cs.heroImage || project.cover;

  // "More work" — a couple of other case studies to keep people moving.
  const more = projects
    .filter((p) => p.slug !== slug && p.caseStudy)
    .slice(0, 3);

  return (
    <>
      <Background />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <article className="mx-auto max-w-5xl px-5 pt-32 pb-8 sm:px-6 sm:pt-40">
          <Reveal>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              All work
            </Link>
          </Reveal>

          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {project.discipline}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                {project.status} · {project.year}
              </span>
            </div>

            <h1 className="mt-5 font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {cs.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:gap-12">
              <Meta label="What we did" value={cs.role} />
              <Meta label="Timeframe" value={cs.timeframe} />
              {cs.liveUrl && (
                <div className="sm:ml-auto">
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    Visit {cs.liveLabel ?? "live site"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          {/* Hero media */}
          {heroMedia && (
            <Reveal className="mt-12">
              {cs.heroVideo && cs.heroVideoPortrait ? (
                <div className="surface relative flex justify-center overflow-hidden rounded-2xl bg-black px-4 py-10 sm:py-14">
                  {/* ambient accent glow behind the phone */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(55% 45% at 50% 42%, rgba(var(--accent-rgb),0.14), transparent 72%)",
                    }}
                  />
                  <video
                    className="relative h-[440px] w-auto rounded-[10px] shadow-2xl shadow-black/60 sm:h-[560px] lg:h-[620px]"
                    src={cs.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={cs.heroImage || project.cover}
                  />
                </div>
              ) : (
                <div className="surface relative overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/9] w-full">
                    {cs.heroVideo ? (
                      <video
                        className="h-full w-full object-cover"
                        src={cs.heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={cs.heroImage || project.cover}
                      />
                    ) : (
                      <Image
                        src={heroMedia}
                        alt={`${project.name} — preview`}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              )}
            </Reveal>
          )}
        </article>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-5 pb-8 sm:px-6">
          {cs.overview.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground/90">
                {para}
              </p>
            </Reveal>
          ))}

          {cs.metrics && cs.metrics.length > 0 && (
            <Reveal className="mt-12">
              <dl className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border sm:grid-cols-3">
                {cs.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`bg-background-elevated p-6 ${
                      i < cs.metrics!.length - 1 ? "border-b border-border sm:border-b-0 sm:border-r" : ""
                    }`}
                  >
                    <dt className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {m.value}
                    </dt>
                    <dd className="mt-1 text-sm text-muted">{m.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {cs.sections.map((section, i) => (
            <section key={i} className="mt-14">
              <Reveal>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  <span className="mr-3 font-mono text-base text-accent">
                    0{i + 1}
                  </span>
                  {section.heading}
                </h2>
              </Reveal>
              {section.body.map((para, j) => (
                <Reveal key={j} delay={j * 0.05}>
                  <p className="mt-4 text-pretty leading-relaxed text-muted">
                    {para}
                  </p>
                </Reveal>
              ))}
            </section>
          ))}
        </div>

        {/* In motion */}
        {cs.motion && cs.motion.length > 0 && (
          <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
            <Reveal>
              <p className="eyebrow mb-4">In motion</p>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                The app, running
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {cs.motion.map((clip, i) => (
                <Reveal key={clip.label} delay={i * 0.08}>
                  <figure className="flex flex-col items-center">
                    <div className="relative w-full overflow-hidden rounded-2xl bg-black">
                      <video
                        className="mx-auto block h-auto w-full max-w-[300px]"
                        src={clip.src}
                        poster={clip.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    </div>
                    <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                      {clip.label}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {cs.gallery && cs.gallery.length > 0 && (
          <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
            <Reveal>
              <p className="eyebrow mb-4">Inside the product</p>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {cs.galleryPhone ? "Screens" : "The tools"}
              </h2>
            </Reveal>
            <div className="mt-8">
              <CaseGallery shots={cs.gallery} phone={cs.galleryPhone} />
            </div>
          </section>
        )}

        {/* Integrations */}
        {cs.integrations && cs.integrations.length > 0 && (
          <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
            <Reveal className="surface rounded-2xl p-8 sm:p-10">
              <p className="eyebrow mb-6">Plugs into the tools you already use</p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                {cs.integrations.map((it) => (
                  <div key={it.name} className="relative h-7 w-28 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0">
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

        {/* Engine */}
        {cs.engine && (
          <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
            <Reveal className="surface rounded-2xl p-8 sm:p-10">
              <p className="eyebrow mb-6">Powered by</p>
              <div className="flex items-center gap-5">
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src={cs.engine.src}
                    alt={cs.engine.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{cs.engine.name}</p>
                  {cs.engine.note && (
                    <p className="text-sm text-muted">{cs.engine.note}</p>
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* Stack */}
        {cs.stack && cs.stack.length > 0 && (
          <section className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
            <Reveal>
              <p className="eyebrow mb-4">Built with</p>
              <div className="flex flex-wrap gap-2">
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Progress bar for in-production work */}
        {project.status === "In Production" && project.progress != null && (
          <section className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
            <Reveal className="surface rounded-2xl p-6 sm:p-8">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="eyebrow">Build progress</span>
                <span className="font-display text-2xl font-bold text-accent">
                  <CountUp value={project.progress} />%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </Reveal>
          </section>
        )}

        {/* Beta waitlist */}
        {cs.waitlist && (
          <BetaWaitlist
            project={project.name}
            platforms={cs.waitlist.platforms}
            blurb={cs.waitlist.blurb}
          />
        )}

        {/* More work */}
        {more.length > 0 && (
          <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6">
            <Reveal>
              <p className="eyebrow mb-6">More from the lab</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {more.map((p, i) => {
                const MoreIcon = disciplineIcon[p.discipline];
                return (
                  <Reveal key={p.slug} delay={i * 0.06}>
                    <Link
                      href={`/work/${p.slug}`}
                      className="surface surface-hover-fx group flex h-full flex-col rounded-xl p-6"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-elevated text-muted transition-colors group-hover:text-foreground">
                        <MoreIcon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <h3 className="mt-4 flex items-center gap-1.5 font-semibold tracking-tight">
                        {p.name}
                        <ArrowUpRight className="h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                        {p.blurb}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {label}
      </dt>
      <dd className="mt-1 max-w-xs text-sm text-foreground">{value}</dd>
    </div>
  );
}
