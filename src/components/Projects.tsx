"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/work";

const filters = ["All", "In Production", "Released"] as const;
type Filter = (typeof filters)[number];

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

      {/* Full archive link */}
      <Reveal className="mt-10 flex justify-center">
        <a
          href="/work"
          className="group inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover"
        >
          View all work
          <span className="text-faint transition-colors group-hover:text-accent">→</span>
        </a>
      </Reveal>
    </section>
  );
}
