import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { WorkGallery } from "@/components/WorkGallery";
import { projects } from "@/lib/work";

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
  const inProduction = projects.filter((p) => p.status === "In Production").length;

  return (
    <>
      <Background />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <PageHero
          label="The archive"
          title="Everything we've shipped, and what's in the lab."
          lede="The full body of work — games, applications and the private AI systems behind Marapone. Some released, some in production. Open any project for the whole story."
          facts={[
            { label: "Projects", value: String(projects.length) },
            { label: "In production", value: String(inProduction) },
            { label: "Disciplines", value: "Games · Apps · AI · Systems" },
          ]}
        />

        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20">
            <WorkGallery />
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
