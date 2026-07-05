"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { projects, type Discipline } from "@/lib/work";

const order: Discipline[] = ["Game", "App", "AI", "Program"];
// Only offer a filter for disciplines that actually have work behind them.
const present = order.filter((d) => projects.some((p) => p.discipline === d));
const filters = ["All", ...present] as const;
type Filter = (typeof filters)[number];

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.discipline === filter);

  return (
    <>
      {/* Discipline filter */}
      <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-surface p-1 self-start">
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
                layoutId="work-filter"
                className="absolute inset-0 -z-10 rounded-md bg-accent"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
