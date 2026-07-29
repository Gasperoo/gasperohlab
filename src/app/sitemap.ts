import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/work";
import { notes } from "@/lib/notes";
import { siteUrl } from "@/lib/site";

/**
 * Every indexable route.
 *
 * The static list is spelled out rather than derived from the filesystem —
 * priority and change frequency are editorial judgements, and a generated list
 * would also have to know to exclude the 404, the OG image handlers and the
 * feed. The legal pages were simply missing before; they're indexable and
 * linked from every page in the footer.
 */
const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/lab", priority: 0.7, changeFrequency: "weekly" },
  { path: "/log", priority: 0.7, changeFrequency: "weekly" },
  { path: "/ethos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/uses", priority: 0.5, changeFrequency: "monthly" },
  { path: "/press", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const workRoutes: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const labRoutes: MetadataRoute.Sitemap = notes.map((n) => ({
    url: `${siteUrl}/lab/${n.slug}`,
    lastModified: new Date(n.date + "T00:00:00"),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...workRoutes, ...labRoutes];
}
