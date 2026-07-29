export type UseItem = {
  name: string;
  /** What it's for, and — where it matters — why this one. */
  note: string;
  href?: string;
};

export type UseGroup = {
  heading: string;
  /** One line under the heading, setting up why these are grouped. */
  lede?: string;
  items: UseItem[];
};

/**
 * What the lab actually builds with.
 *
 * Deliberately no version numbers. A uses page with pinned versions is wrong
 * within a month and nobody ever comes back to fix it; package.json is the
 * place for that, and it's the file that can't drift.
 *
 * Everything listed is something the work in this repository or the shipped
 * products genuinely use. There is no hardware or workspace section, because
 * nothing in the codebase evidences one — see the note at the bottom of the
 * page rather than an invented desk setup.
 */
export const uses: UseGroup[] = [
  {
    heading: "This site",
    lede: "Static, self-hosted, and about as boring as it can be. That's the point — a portfolio that needs a runtime is a portfolio that will break.",
    items: [
      {
        name: "Next.js — App Router",
        note: "Every page prerendered at build. The only server code is the two form handlers.",
        href: "https://nextjs.org",
      },
      {
        name: "React",
        note: "Server components by default. The client bundle is the nav, the palette, the theme switch and four disclosure widgets.",
        href: "https://react.dev",
      },
      {
        name: "Tailwind CSS",
        note: "Utilities for layout, custom properties for colour. No component library — the design system is about forty lines of CSS.",
        href: "https://tailwindcss.com",
      },
      {
        name: "TypeScript",
        note: "Strict. The case-study and note content are typed data, not markdown, so a malformed post fails the build rather than the page.",
        href: "https://www.typescriptlang.org",
      },
      {
        name: "Geist Sans & Geist Mono",
        note: "One family doing all the work, self-hosted from the package so the build never depends on a font CDN.",
        href: "https://vercel.com/font",
      },
      {
        name: "Motion",
        note: "Lazy-loaded, and only for the mobile menu and the contact dialog. Every scroll reveal on the site is a CSS transition behind an IntersectionObserver.",
        href: "https://motion.dev",
      },
      {
        name: "Lucide",
        note: "Icons, sparingly. Most of what used to be an icon here is now a hairline rule or a mono index.",
        href: "https://lucide.dev",
      },
      {
        name: "Resend",
        note: "The contact form and beta waitlists. Both handlers are rate-limited, honeypotted and time-trapped.",
        href: "https://resend.com",
      },
      {
        name: "Vercel",
        note: "Hosting and analytics. Static output, so it would run anywhere that serves files.",
        href: "https://vercel.com",
      },
    ],
  },
  {
    heading: "What we ship on",
    lede: "The stack behind the products, where the constraints are much less negotiable — everything below has to run inside a customer's building with no internet connection.",
    items: [
      {
        name: "llama.cpp",
        note: "Quantised inference on commodity hardware. It's what makes 'runs on the machine you already own' a real claim rather than a marketing one.",
        href: "https://github.com/ggml-org/llama.cpp",
      },
      {
        name: "Domain fine-tuning",
        note: "Models trained on the customer's own operational data — drawings, bids, rate books — rather than a general model behind an API.",
      },
      {
        name: "On-prem deployment",
        note: "No cloud dependency, no phone-home, no per-seat meter. Source handed over with the install.",
      },
    ],
  },
  {
    heading: "How we work",
    items: [
      {
        name: "Prototype first",
        note: "The smallest real version, in front of the actual problem, before anyone commits to a roadmap.",
        href: "/about",
      },
      {
        name: "Ship the cuts too",
        note: "Everything abandoned gets an entry in the log, with the same weight as a release.",
        href: "/log",
      },
      {
        name: "Own the whole stack",
        note: "From the model to the metal. No black boxes we can't open, no dependencies we can't replace.",
        href: "/ethos",
      },
    ],
  },
];
