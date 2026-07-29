/**
 * Facts about the lab that more than one page needs to agree on.
 *
 * Availability, the founder credit and the social profiles were previously
 * either absent or restated per file. They live here so a change is one edit
 * and can't drift between the JSON-LD graph, the footer and the CTA.
 */

export const siteUrl = "https://gasperohlab.com";

/**
 * Whether the lab is open to new work, and what to say about it.
 *
 * Rendered in the closing CTA on every page, so it is the single most visible
 * claim on the site after the hero. Flip `open` to false and the band quietly
 * drops the line rather than showing a stale quarter — better nothing than a
 * date that has passed.
 *
 * TODO(gasperohlab): confirm the window before launch. Nothing here can be
 * derived, so it is the one string on the site that will silently go stale.
 */
export const availability = {
  open: true,
  /** Kept deliberately short — it sits inline with the section eyebrow. */
  note: "Taking one new project for Q4 2026",
};

/**
 * The person behind the lab.
 *
 * "A small lab with a long attention span" is a story about people, and the
 * site told it without naming any. Setting this surfaces a founder credit on
 * /about and adds a `Person` node to the structured-data graph, linked to the
 * Organization as its founder; leaving it null renders neither.
 *
 * TODO(gasperohlab): fill in. Deliberately left unset rather than guessed —
 * a fabricated founder is worse than no founder.
 */
export const founder: {
  name: string;
  role: string;
  bio: string;
  /** Profile URLs — feeds `sameAs` on the Person node. */
  sameAs?: string[];
} | null = null;

/** Public profiles. Feeds both the footer and the Organization's `sameAs`. */
export const profiles = {
  instagram: "https://www.instagram.com/gasperohlab/",
};

export const sameAs = Object.values(profiles);
