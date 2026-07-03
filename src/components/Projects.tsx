"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Gamepad2,
  LayoutGrid,
  BrainCircuit,
  TerminalSquare,
  ArrowUpRight,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";

type Status = "In Production" | "Released" | "Coming Soon";
type Discipline = "Game" | "App" | "AI" | "Program";

type Project = {
  name: string;
  discipline: Discipline;
  status: Status;
  blurb: string;
  progress?: number; // 0-100, shown while In Production
  year: string;
  href?: string;
  external?: boolean; // opens in a new tab
};

const disciplineIcon: Record<Discipline, LucideIcon> = {
  Game: Gamepad2,
  App: LayoutGrid,
  AI: BrainCircuit,
  Program: TerminalSquare,
};

const projects: Project[] = [
  {
    name: "MaraponeAI",
    discipline: "AI",
    status: "Released",
    blurb:
      "Private AI solutions for the construction and logistics industries — secure, domain-tuned models built on real operational data. Part of Marapone.",
    year: "2025",
    href: "https://marapone.com",
    external: true,
  },
  {
    name: "Marapone Construction Suite",
    discipline: "App",
    status: "Released",
    blurb:
      "Private construction AI that audits blueprints, clears RFI backlogs and flags tender risk before it costs you — owned outright, no cloud, no subscriptions. Part of Marapone.",
    year: "2025",
    href: "https://marapone.com/construction",
    external: true,
  },
  {
    name: "Marapone Logistics Suite",
    discipline: "App",
    status: "Released",
    blurb:
      "Private AI for freight, import/export and trade compliance — automating the paperwork and surfacing risk across every shipment. Owned and on-prem. Part of Marapone.",
    year: "2025",
    href: "https://marapone.com/logistics",
    external: true,
  },
  {
    name: "Project Halcyon",
    discipline: "Game",
    status: "In Production",
    blurb:
      "A systemic survival game about rebuilding a world that keeps breaking. Core simulation loop is prototyped and playable — content and polish underway in the lab.",
    progress: 45,
    year: "2026",
  },
  {
    name: "Orbit",
    discipline: "App",
    status: "In Production",
    blurb:
      "A calm planning tool for small teams who resent project software. Design is locked and the build is in flight — private beta later this year.",
    progress: 70,
    year: "2026",
  },
];

const filters = ["All", "In Production", "Released"] as const;
type Filter = (typeof filters)[number];

const statusStyles: Record<Status, { dot: string; text: string; live?: boolean }> = {
  "In Production": { dot: "bg-accent", text: "text-accent", live: true },
  Released: { dot: "bg-emerald-400", text: "text-emerald-400" },
  "Coming Soon": { dot: "bg-muted", text: "text-muted" },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function ProjectCard({ project }: { project: Project }) {
  const Icon = disciplineIcon[project.discipline];
  const status = statusStyles[project.status];
  const isComingSoon = project.status === "Coming Soon";
  const Wrapper = project.href ? motion.a : motion.div;

  return (
    <Wrapper
      {...(project.href ? { href: project.href } : {})}
      {...(project.external ? { target: "_blank", rel: "noreferrer" } : {})}
      variants={cardVariants}
      layout
      exit="exit"
      className="surface surface-hover-fx group relative flex h-full flex-col rounded-xl p-6 sm:p-7"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background-elevated text-muted transition-colors group-hover:text-foreground">
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

      <div className="mt-6 flex items-center gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
        {isComingSoon ? (
          <Lock className="h-4 w-4 text-faint" />
        ) : project.href ? (
          <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        ) : null}
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
    </Wrapper>
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
            <ProjectCard key={p.name} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
