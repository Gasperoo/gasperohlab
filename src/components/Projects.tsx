"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  projects,
  disciplineIcon,
  type Project,
  type Status,
} from "@/lib/work";

const filters = ["All", "In Production", "Released"] as const;
type Filter = (typeof filters)[number];

const statusStyles: Record<Status, { dot: string; text: string; live?: boolean }> = {
  "In Production": { dot: "bg-accent", text: "text-accent", live: true },
  Released: { dot: "bg-emerald-400", text: "text-emerald-400" },
  "Coming Soon": { dot: "bg-muted", text: "text-muted" },
};

// Discipline-tinted procedural cover for cards without a screenshot.
const disciplineTint: Record<Project["discipline"], string> = {
  Game: "from-violet-500/25",
  App: "from-sky-500/25",
  AI: "from-accent/25",
  Program: "from-emerald-500/25",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function ProjectCover({ project }: { project: Project }) {
  const Icon = disciplineIcon[project.discipline];
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-background-elevated">
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.name} preview`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${disciplineTint[project.discipline]} to-transparent`}>
          <div className="absolute inset-0 grid-bg opacity-60" />
          <Icon
            className="relative h-14 w-14 text-foreground/70 transition-transform duration-500 group-hover:scale-110"
            strokeWidth={1.2}
          />
        </div>
      )}
      {/* Top gradient so status pill stays readable over any image */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = disciplineIcon[project.discipline];
  const status = statusStyles[project.status];

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div variants={cardVariants} layout exit="exit" className="h-full">
      <Link
        href={`/work/${project.slug}`}
        onMouseMove={onMove}
        className="surface surface-hover-fx group relative flex h-full flex-col overflow-hidden rounded-xl"
      >
        {/* Pointer-tracked accent glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgba(var(--accent-rgb),0.10), transparent 60%)",
          }}
        />
        <ProjectCover project={project} />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-elevated text-muted transition-colors group-hover:text-foreground">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs ${status.text}`}
            >
              <span className="relative flex h-1.5 w-1.5">
                {status.live && (
                  <span
                    className={`animate-ping-ring absolute inline-flex h-full w-full rounded-full ${status.dot}`}
                  />
                )}
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.dot}`} />
              </span>
              {project.status}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
            <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {project.discipline} · {project.year}
          </p>

          <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted">
            {project.blurb}
          </p>

          {project.status === "In Production" && project.progress != null && (
            <div className="mt-6">
              <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                <span>Build progress</span>
                <span className="text-accent">{project.progress}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-32"
    >
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            What we&apos;ve shipped
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted">
            Products in production today — with more taking shape in the lab.
            Open any project for the full story.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-surface p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === f ? "text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-md bg-accent"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div
        layout
        className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
