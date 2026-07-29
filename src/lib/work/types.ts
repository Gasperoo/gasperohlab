export type Status = "In Production" | "Released" | "Coming Soon";
export type Discipline = "Game" | "App" | "AI" | "Program";

export type Shot = { src: string; label: string };

/** A short looping clip (portrait phone capture) shown in the "In motion" section. */
export type Clip = { src: string; poster: string; label: string };

/** One prose block inside a case study. */
export type CaseSection = { heading: string; body: string[] };

export type Metric = { value: string; label: string };

/**
 * A named collaborator on a piece of work.
 *
 * Most of the Marapone catalogue was built *with* the Marapone team rather than
 * handed to us as a brief, so presenting those case studies as sole authorship
 * would overstate our part. Setting this makes the shared credit explicit on
 * the card and at the top of the case study, instead of leaving it to be
 * inferred from a role line nobody reads.
 */
export type Partner = { name: string; href?: string; note: string };

export type CaseStudy = {
  /** One-line hero subtitle for the case page. */
  tagline: string;
  role: string; // what we did
  /** Set when the work was a partnership; see Partner. */
  partner?: Partner;
  timeframe: string;
  heroVideo?: string;
  heroImage?: string;
  /** Render the hero video as a centred portrait phone rather than a 16:9 band. */
  heroVideoPortrait?: boolean;
  overview: string[];
  metrics?: Metric[];
  sections: CaseSection[];
  /** Short looping clips shown in an "In motion" section. */
  motion?: Clip[];
  /** Desktop captures rather than portrait phone clips — laid out wide. */
  motionLandscape?: boolean;
  gallery?: Shot[];
  /** Portrait phone-frame gallery instead of landscape. */
  galleryPhone?: boolean;
  integrations?: { name: string; src: string }[];
  /** Engine/platform the project is built on, shown as a logo + name block. */
  engine?: { name: string; src: string; note?: string };
  stack?: string[];
  liveUrl?: string;
  liveLabel?: string;
  /** Beta signup block — invites people to join the waitlist for this project. */
  waitlist?: {
    /** Platforms the beta will target, offered as pickers on the form. */
    platforms?: string[];
    /** Optional custom line under the heading. */
    blurb?: string;
  };
};

export type Project = {
  slug: string;
  name: string;
  discipline: Discipline;
  status: Status;
  blurb: string;
  progress?: number; // 0-100, shown while In Production
  year: string;
  /** Card cover: an image, or a discipline-tinted procedural fallback. */
  cover?: string;
  /** External live product link, surfaced on the case page. */
  href?: string;
  external?: boolean;
  caseStudy?: CaseStudy;
};
