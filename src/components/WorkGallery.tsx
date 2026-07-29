"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { FilterBar } from "./FilterBar";
import { projects, presentDisciplines, type Discipline } from "@/lib/work";

// Ordered heaviest-first, matching the home page's disciplines list, and only
// offering a filter for disciplines that actually have work behind them.
const order: Discipline[] = ["App", "AI", "Program", "Game"];
const filters = ["All", ...presentDisciplines(order)] as const;
type Filter = (typeof filters)[number];

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.discipline === filter);

  return (
    <>
      <div className="border-b border-border pb-1">
        <FilterBar
          label="Filter work by discipline"
          options={filters}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i, 5) * 0.05} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
