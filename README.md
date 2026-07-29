# GASPEROHLAB

The website for **[gasperohlab.com](https://gasperohlab.com)** — an independent
software lab building applications, AI models and games. A place for bold
experiments turned into real, shipped software.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **TypeScript**, strict
- **Tailwind CSS v4** — utilities for layout, custom properties for colour
- **Geist Sans & Mono**, self-hosted from the `geist` package
- **Motion**, lazy-loaded, for the mobile menu and the contact dialog
- **lucide-react** for icons
- **Resend** for the contact form and beta waitlists
- **Upstash Redis** (optional) for durable signups and shared rate limiting

Every page is prerendered at build time. The only server code is the two form
handlers under `src/app/api/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

Copy `.env.example` to `.env.local` and fill in what you need. None of it is
required to run the site locally — the forms report that they aren't
configured, and everything else works.

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the local development server   |
| `npm run build`    | Create an optimized production build |
| `npm run start`    | Serve the production build           |
| `npm run lint`     | Run ESLint                           |
| `npx tsc --noEmit` | Typecheck                            |

CI runs all of these on every pull request, plus a Lighthouse budget
(`lighthouserc.json`) that fails on an accessibility or SEO regression.

## Project structure

```
src/
  app/
    layout.tsx        # Root layout: fonts, theme script, SEO, JSON-LD graph
    globals.css       # The design system — tokens, both themes, utilities
    page.tsx          # Home page composition (section order lives here)
    error.tsx         # Route error boundary
    loading.tsx       # Route loading placeholder
    work/[slug]/      # Case studies
    lab/[slug]/       # Notes
    log/ uses/ press/ # Shipping log, stack, brand kit
    api/              # Contact + waitlist handlers
  components/         # Nav, Hero, sections, command palette, dialogs
  lib/
    work/             # The archive — a module per project, assembled in index.ts
    notes.ts          # Writing, as typed blocks
    log.ts            # Shipping log entries, including the cuts
    site.ts           # Availability, founder, profiles
    theme.ts          # Theme store + the pre-paint inline script
    store.ts          # Redis-or-memory persistence and rate limiting
```

### Content lives in `src/lib`

Case studies, notes and log entries are typed data, not markdown — a malformed
post fails the build rather than the page. To add a project, drop a module in
`src/lib/work/projects/` and add it to the list in `src/lib/work/index.ts`.

### Colour is never written inline

Everything theme-dependent resolves through a custom property in `globals.css`,
including hover tints, form fills and logo filters. Nothing uses Tailwind's
`dark:` variant, which is what lets readers with JavaScript disabled still get
the right theme from `prefers-color-scheme`. There's a write-up at
`/lab/two-faces-one-palette`.

### Figures are counted, not typed

Anything on the site that looks like a number about the work — products
shipped, projects in the lab, disciplines with work behind them — is derived
from `src/lib/work` at build time, so it can't drift from the archive it sits
above. See `/lab/the-numbers-we-deleted` for why.

### Brand assets are generated

`brand/gasperohlab-logo.jpg` is the supplied master. Two scripts derive
everything the site uses from it — see `brand/README.md`.

## Deployment

Optimized for [Vercel](https://vercel.com). The domain is managed through
Cloudflare — point DNS at the host once deployed.

---

© GASPEROHLAB — Experiments in games, apps & AI.
