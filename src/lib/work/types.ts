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

/**
 * A mobile companion that ships alongside a product rather than as work of its
 * own.
 *
 * The two Marapone companion apps each had a case study for a while, which was
 * hard to justify: the story was "the suite, on a phone" told twice, in an
 * archive already eight Marapone entries deep. Folding them in puts the screens
 * and the on-site argument inside the product they belong to, where the reader
 * already has the context to care.
 */
export type Companion = {
  heading: string;
  body: string[];
  /** Platform and build state, e.g. "iOS + Android · in production, ~70%". */
  status?: string;
  /** Phone captures, shown in the portrait-frame gallery. */
  shots?: Shot[];
};

/**
 * A product built on a platform, told inside the platform's case study.
 *
 * The Construction and Logistics suites had case studies of their own, and both
 * were largely "MaraponeAI, applied to an industry": the same partner note, the
 * same ownership argument, the same on-prem guarantee, restated a third and
 * fourth time. Worse, the construction page overlapped the Blueprint Auditor's
 * so heavily that its gallery was literally that tool's screens.
 *
 * A chapter carries everything a suite needs to stand on its own — its own
 * heading, prose, video, figures, gallery, integrations, companion app and live
 * link — as a self-contained block under one platform argument. The deep tool
 * write-ups stay separate; `tools` links out to them by slug rather than
 * restating them, because a chapter is an orientation and a case study is a
 * proof, and collapsing the two would lose the proof.
 */
export type Chapter = {
  /** Anchor id — also the fragment the old suite URL redirects to. */
  id: string;
  name: string;
  /** Serves as the chapter's heading. */
  tagline: string;
  body: string[];
  heroVideo?: string;
  heroImage?: string;
  metrics?: Metric[];
  gallery?: Shot[];
  integrations?: { name: string; src: string }[];
  /** A mobile companion shipping alongside this suite; see Companion. */
  companion?: Companion;
  /** Slugs of the case studies that go deeper on tools inside this suite. */
  tools?: string[];
  liveUrl?: string;
  liveLabel?: string;
  stack?: string[];
};

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
  /** Products built on this one, each told as a self-contained block; see Chapter. */
  chapters?: Chapter[];
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
