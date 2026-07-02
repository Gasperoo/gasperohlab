# Gasper Oh Lab

The website for **[gasperohlab.com](https://gasperohlab.com)** — an independent
studio building games, apps, AI models and programs. A place for bold
experiments turned into real, shipped software.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animation
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the local development server   |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
src/
  app/
    layout.tsx      # Root layout, fonts, SEO metadata
    page.tsx        # Landing page composition
    globals.css     # Design tokens + Tailwind + utilities
  components/        # Nav, Hero, Marquee, Disciplines,
                     # Experiments, Ethos, CTA, Footer, Background
```

## Deployment

Optimized for [Vercel](https://vercel.com). The domain is managed through
Cloudflare — point DNS at the host once deployed.

---

© Gasper Oh Lab — Experiments in games, apps & AI.
