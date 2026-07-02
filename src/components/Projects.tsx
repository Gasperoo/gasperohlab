"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
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

type Status = "In Development" | "Released" | "Coming Soon";
type Discipline = "Game" | "App" | "AI" | "Program";

type Project = {
  name: string;
  discipline: Discipline;
  status: Status;
  blurb: string;
  progress?: number; // 0-100, shown for In Development
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
    name: "Aether Engine",
    discipline: "Game",
    status: "In Development",
    blurb:
      "A lightweight engine for rapidly prototyping playable worlds — physics, input and rendering in one small, fast package.",
    progress: 68,
    year: "2026",
  },
  {
    name: "Signal",
    discipline: "App",
    status: "Released",
    blurb:
      "A focused productivity app that turns scattered thoughts into structured, actionable plans. Shipped and in the wild.",
    year: "2025",
    href: "#contact",
  },
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
    name: "Forge",
    discipline: "Program",
    status: "Released",
    blurb:
      "A command-line toolkit for scaffolding and automation — the quiet software that makes everything else faster.",
    year: "2025",
    href: "#contact",
  },
  {
    name: "Nocturne",
    discipline: "Game",
    status: "Coming Soon",
    blurb:
      "An atmospheric exploration game about light, memory and the spaces between. Currently a well-kept secret.",
    year: "2026",
  },
];

const filters = ["All", "In Development", "Released", "Coming Soon"] as const;
type Filter = (typeof filters)[number];

const statusStyles: Record<
  Status,
  { dot: string; text: string; live?: boolean }
> = {
  "In Development": { dot: "bg-accent", text: "text-accent", live: true },
  Released: { dot: "bg-emerald-400", text: "text-emerald-400" },
  "Coming Soon": { dot: "bg-accent-3", text: "text-accent-3" },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(srx, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(sry, [-0.5, 0.5], ["-7deg", "7deg"]);

  const Icon = disciplineIcon[project.discipline];
  const status = statusStyles[project.status];
  const isComingSoon = project.status === "Coming Soon";

  function onMove(e: React.PointerEvent) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set((e.clientY - rect.top) / rect.height - 0.5);
    ry.set((e.clientX - rect.left) / rect.width - 0.5);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const Wrapper = project.href ? motion.a : motion.div;

  return (
    <motion.div
      variants={cardVariants}
      layout
      exit="exit"
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <Wrapper
        {...(project.href ? { href: project.href } : {})}
        {...(project.external
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
        ref={cardRef as never}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass border-gradient group relative flex h-full flex-col overflow-hidden rounded-2xl p-7"
      >
        {/* Hover glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent-2/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-white/10 to-white/[0.02] ring-1 ring-white/10">
            <Icon className="h-5 w-5 text-accent-2" strokeWidth={1.7} />
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

        <div className="relative mt-7 flex items-center gap-2" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
          {isComingSoon ? (
            <Lock className="h-4 w-4 text-muted" />
          ) : project.href ? (
            <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          ) : null}
        </div>
        <p className="relative mt-1 font-mono text-[11px] uppercase tracking-widest text-accent/80">
          {project.discipline} · {project.year}
        </p>

        <p className="relative mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted">
          {project.blurb}
        </p>

        {/* In-development progress bar */}
        {project.status === "In Development" && project.progress != null && (
          <div className="relative mt-6" style={{ transform: "translateZ(20px)" }}>
            <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>Build progress</span>
              <span className="text-accent">{project.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-accent via-accent-2 to-accent-3"
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </div>
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            The work
          </p>
          <h2 className="font-display text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Projects from the lab
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted">
            Some are shipping, some are taking shape, some are still secrets.
            Here&apos;s what&apos;s in the pipeline.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="glass flex flex-wrap gap-1 rounded-full p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === f ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-accent to-accent-2"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
