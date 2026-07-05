import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { WorkGallery } from "@/components/WorkGallery";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from GASPEROHLAB — games, applications and private AI systems taken from a single question all the way to production.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/work",
    title: "Work · GASPEROHLAB",
    description:
      "Games, applications and private AI systems, taken from prototype to production.",
  },
};

export default function WorkIndex() {
  return (
    <>
      <Background />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <section className="mx-auto max-w-6xl px-5 pt-36 pb-10 sm:px-6 sm:pt-44">
          <Reveal>
            <p className="eyebrow mb-4">The archive</p>
            <h1 className="max-w-3xl font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Everything we&apos;ve shipped,<span className="text-accent"> and what&apos;s in the lab.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              The full body of work — games, applications and the private AI
              systems behind Marapone. Some released, some in production. Open
              any project for the whole story.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
          <WorkGallery />
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
