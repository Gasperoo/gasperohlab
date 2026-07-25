export const siteUrl = "https://gasperohlab.com";

/**
 * Reference to the Organization node declared once in the root layout.
 *
 * Pointing at it by `@id` rather than restating name/logo on every page lets
 * consumers merge the pages into a single graph, instead of reading each one as
 * a separate unrelated publisher that happens to share a name.
 */
export const orgRef = { "@id": `${siteUrl}/#organization` };

type Crumb = { name: string; path: string };

/** A trail back to the home page, for the breadcrumb line in search results. */
export function breadcrumbs(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.path}`,
      })
    ),
  };
}

/** Wraps nodes in the envelope a `<script type="application/ld+json">` expects. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
