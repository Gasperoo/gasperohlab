import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project, Status } from "@/lib/work";

/**
 * Work card.
 *
 * Stripped back from the previous version: no pointer-tracked accent glow, no
 * discipline-tinted gradient covers, no icon tile, and no animated build-
 * progress bar (a percentage on a portfolio piece reads like a school project;
 * the status label already says everything a reader needs). What's left is the
 * screenshot, a status, a name and a line of copy.
 *
 * Now a server component — nothing here was interactive except the glow.
 */

// Only "in production" gets colour, and only on a 5px dot. Everything else is
// bone, so the one live signal on the page is unmissable.
const statusTone: Record<Status, string> = {
  "In Production": "bg-accent",
  Released: "bg-foreground",
  "Coming Soon": "bg-faint",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors duration-300 hover:border-border-strong hover:bg-surface-hover"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-background-elevated">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          // No screenshot: set the name large in the frame instead of falling
          // back to a tinted gradient and a generic glyph.
          <div className="flex h-full w-full items-end p-6">
            <span className="t-h3 text-2xl text-faint">{project.name}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">
            {project.discipline}
            <span className="mx-2 opacity-40">/</span>
            {project.year}
          </span>
          <span className="flex items-center gap-2 text-[0.6875rem] tracking-wide text-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusTone[project.status]}`}
              aria-hidden
            />
            {project.status}
          </span>
        </div>

        <h3 className="t-h3 mt-5 flex items-center gap-1.5 text-xl">
          {project.name}
          <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </h3>

        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted">
          {project.blurb}
        </p>
      </div>
    </Link>
  );
}
