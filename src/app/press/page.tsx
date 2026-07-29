import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { Logo } from "@/components/Logo";
import { Wordmark } from "@/components/Wordmark";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Press kit",
  description:
    "Logos, colours, wordmark rules and boilerplate for GASPEROHLAB — everything needed to write about or link to the lab correctly.",
  alternates: { canonical: "/press" },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/press",
    title: "Press kit · GASPEROHLAB",
    description: "Logos, colours, wordmark rules and boilerplate.",
  },
};

const assets = [
  {
    name: "Monogram, SVG",
    href: "/logo.svg",
    note: "Vector, drawn in the accent. Recolour by setting `fill` — the site itself renders it via currentColor.",
  },
  {
    name: "App tile, 512px",
    href: "/icons/icon-512.png",
    note: "The monogram reversed out of a solid accent field. Use this anywhere the mark is smaller than about 24px.",
  },
  {
    name: "Maskable tile, 512px",
    href: "/icons/icon-maskable-512.png",
    note: "Same tile with the safe-area padding Android's adaptive icons crop into.",
  },
  {
    name: "Square logo, 512px",
    href: "/icons/logo-512.png",
    note: "Raster square for anywhere an SVG isn't accepted — including structured data.",
  },
  {
    name: "Original master, JPG",
    href: "/brand/gasperohlab-logo.jpg",
    note: "White line art on charcoal, as supplied. Everything above is traced from it; prefer the SVG for anything real.",
  },
];

const palette = [
  { name: "Paper", value: "#faf9f7", note: "Light background" },
  { name: "Ink", value: "#16161a", note: "Light foreground" },
  { name: "Sheet", value: "#101013", note: "Dark background" },
  { name: "Bone", value: "#ececef", note: "Dark foreground" },
  { name: "Accent", value: "#c4302a", note: "The only colour, light" },
  { name: "Accent (dark)", value: "#cf3a33", note: "The only colour, dark" },
];

const rules = [
  "It's one word, all caps: GASPEROHLAB. Not Gasperoh Lab, not GasperOH Lab, not Gasper Oh Lab.",
  "In the wordmark, LAB is set in the accent and GASPEROH in the foreground. In running text, don't colour it at all.",
  "Give the monogram clear space of at least its own stroke width on every side, and never set it below 24px — the line art stops resolving. Use the app tile instead at small sizes.",
  "Don't put the monogram inside a box, a circle, or a filled tile of your own. The app tiles already solve that case.",
  "Don't recolour the mark to anything but the accent, the foreground, or a flat reverse. It has one colour for the same reason the site does.",
];

const boilerplate =
  "GASPEROHLAB is an independent software lab based in Toronto, Canada, founded in 2025. It builds applications, AI models and games — taking hard problems from a single question all the way to production. Its private-AI platform, MaraponeAI, runs domain-tuned models entirely on customers' own hardware, with the source included and no subscription. The lab is independently owned and takes no outside investment.";

export default function PressPage() {
  const jsonLd = graph(breadcrumbs([{ name: "Press kit", path: "/press" }]));

  return (
    <>
      <Background />
      <Nav />
      <JsonLd data={jsonLd} />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <PageHero
          label="Press kit"
          title="Everything you need to write about us correctly."
          lede="Marks, colours, the rules that matter and a paragraph you can paste. If you need something that isn't here — a founder photo, a product still, a quote — just ask."
          facts={[
            { label: "Name", value: "GASPEROHLAB" },
            { label: "Founded", value: "2025 · Toronto, Canada" },
            { label: "Ownership", value: "Independent, no investors" },
          ]}
        />

        {/* ---- The mark ---- */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <p className="eyebrow">
                <span className="text-muted">01</span>
                <span className="mx-2 opacity-40">/</span>
                The mark
              </p>
              <h2 className="t-h2 mt-5 text-[1.75rem] sm:text-[2rem]">
                A monogram and a wordmark
              </h2>
            </Reveal>

            <Reveal delay={0.06} className="mt-10 grid gap-px border border-border sm:grid-cols-2">
              <div className="flex min-h-[13rem] items-center justify-center bg-background-elevated p-10">
                <Logo className="h-24 w-auto text-accent" />
              </div>
              <div className="flex min-h-[13rem] items-center justify-center border-t border-border bg-background-elevated p-10 sm:border-l sm:border-t-0">
                <Wordmark size="lg" href={null} />
              </div>
            </Reveal>

            <div className="mt-10 border-t border-border">
              {assets.map((a, i) => (
                <Reveal
                  key={a.href}
                  delay={Math.min(i, 5) * 0.04}
                  className="row-hover grid gap-2 border-b border-border py-6 lg:grid-cols-[13rem_1fr] lg:items-baseline lg:gap-16"
                >
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:gap-10">
                    <a
                      href={a.href}
                      download
                      className="group inline-flex items-start gap-1.5"
                    >
                      <span className="t-h3 text-lg">{a.name}</span>
                      <Download className="mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-foreground" />
                    </a>
                    <p className="t-body max-w-xl text-pretty text-[0.9375rem]">
                      {a.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Colour ---- */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <p className="eyebrow">
                <span className="text-muted">02</span>
                <span className="mx-2 opacity-40">/</span>
                Colour
              </p>
              <h2 className="t-h2 mt-5 text-[1.75rem] sm:text-[2rem]">
                Two neutrals and one red
              </h2>
              <p className="t-lede mt-5 max-w-2xl text-pretty">
                There is no secondary palette and no chart colours. Structure
                comes from hairline rules; the red is rationed to the monogram,
                LAB in the wordmark, a primary action and a live dot.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-px border border-border sm:grid-cols-2 lg:grid-cols-3">
              {palette.map((c) => (
                <div
                  key={c.value}
                  className="flex items-center gap-5 border-b border-border bg-background-elevated p-5 last:border-b-0 sm:border-r [&:nth-child(2n)]:sm:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
                >
                  <span
                    className="h-12 w-12 shrink-0 rounded-md border border-border"
                    style={{ background: c.value }}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm text-foreground">{c.name}</p>
                    <p className="eyebrow mt-2">{c.value}</p>
                    <p className="mt-2 text-xs text-muted">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-faint">
              Typeface: Geist Sans throughout, Geist Mono for labels and
              metadata. Headings are set at weight 500 — never bold.
            </p>
          </div>
        </section>

        {/* ---- Rules ---- */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <p className="eyebrow">
                <span className="text-muted">03</span>
                <span className="mx-2 opacity-40">/</span>
                Using it
              </p>
              <h2 className="t-h2 mt-5 text-[1.75rem] sm:text-[2rem]">
                Five rules, and that&apos;s all of them
              </h2>
            </Reveal>

            <ol className="mt-10 border-t border-border">
              {rules.map((rule, i) => (
                <Reveal
                  as="li"
                  key={rule}
                  delay={Math.min(i, 5) * 0.04}
                  className="grid gap-2 border-b border-border py-6 lg:grid-cols-[13rem_1fr] lg:gap-16"
                >
                  <span className="eyebrow">Rule 0{i + 1}</span>
                  <p className="t-body max-w-2xl text-pretty text-[0.9375rem]">
                    {rule}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- Boilerplate ---- */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-16">
              <p className="eyebrow lg:pt-2.5">
                <span className="text-muted">04</span>
                <span className="mx-2 opacity-40">/</span>
                Boilerplate
              </p>
              <div className="max-w-2xl">
                <h2 className="t-h2 text-[1.75rem] sm:text-[2rem]">
                  One paragraph, ready to paste
                </h2>
                <blockquote className="mt-8 border-l border-border-strong pl-6 text-pretty text-[0.9375rem] leading-relaxed text-muted">
                  {boilerplate}
                </blockquote>
                <p className="mt-8 text-pretty text-sm leading-relaxed text-faint">
                  Press enquiries and anything not covered here:{" "}
                  <a
                    href="mailto:contact@gasperohlab.com"
                    className="text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                  >
                    contact@gasperohlab.com
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* The master, shown once at the bottom rather than at the top — it's
            the least useful asset on the page and the easiest to grab by
            mistake. */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-14 sm:px-8">
            <Reveal className="flex flex-wrap items-center gap-8">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border">
                <Image
                  src="/brand/gasperohlab-logo.jpg"
                  alt="The supplied brand master — white circuit-G monogram on charcoal"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <p className="max-w-md text-pretty text-sm leading-relaxed text-faint">
                The supplied master. Every mark on this page is traced from it,
                which is why the JPEG isn&apos;t used anywhere on the site — it
                has no transparency, can&apos;t be recoloured, and dissolves at
                favicon sizes.
              </p>
            </Reveal>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
