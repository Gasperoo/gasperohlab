"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { Section, SectionHead, TextLink } from "./Section";
import { ProjectCard } from "./ProjectCard";
import { FilterBar } from "./FilterBar";
import { projects } from "@/lib/work";

const filters = ["All", "In Production", "Released"] as const;
type Filter = (typeof filters)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <Section id="work">
      <SectionHead
        index="02"
        label="Selected work"
        title="What we've shipped"
        lede="Products in production today, with more taking shape in the lab. Open any project for the full story."
        action={
          <Link href="/work" className="group inline-flex">
            <TextLink>View all work</TextLink>
          </Link>
        }
      />

      <Reveal className="mt-14 border-b border-border pb-1">
        <FilterBar
          label="Filter work by status"
          options={filters}
          value={filter}
          onChange={setFilter}
        />
      </Reveal>

      {/* The grid re-renders on filter change without a layout animation. The
          old popLayout transition made a three-item list feel like a shuffling
          deck; swapping instantly is calmer and reads as a filter, not a toy. */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i, 5) * 0.05} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
