import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/work";
import { notes } from "@/lib/notes";

const siteUrl = "https://gasperohlab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/lab`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

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

  return [...staticRoutes, ...workRoutes, ...labRoutes];
}
