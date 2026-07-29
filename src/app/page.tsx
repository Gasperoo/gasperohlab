import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Disciplines } from "@/components/Disciplines";
import { Projects } from "@/components/Projects";
import { SocialProof } from "@/components/SocialProof";
import { Metrics } from "@/components/Metrics";
import { Ownership } from "@/components/Ownership";
import { HowWeWork } from "@/components/HowWeWork";
import { Engagement } from "@/components/Engagement";
import { FromTheLab } from "@/components/FromTheLab";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { sectionIndexer } from "@/lib/section-index";

/**
 * The home page, in order.
 *
 * Two things changed here. The section numbers are no longer written into the
 * components — each one takes the next index as it renders, so reordering this
 * list reorders the numbering with it instead of quietly producing a document
 * numbered 01, 03, 02.
 *
 * And the <Ethos> block is gone. The page ran four consecutive argument
 * sections — Ownership, Process, Engagement, Ethos — and the first and last
 * were making overlapping cases: one concrete ("you get the source, it runs on
 * your metal, there's no meter"), one abstract ("curiosity first, depth over
 * breadth"). Keeping both meant a reader had to get through roughly two
 * thousand words of position before reaching the writing. The concrete one
 * stays; the abstract one has its own page, still linked from the header, the
 * footer and the FAQ.
 */
export default function Home() {
  const index = sectionIndexer();

  return (
    <>
      <Background />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <Hero />
        <Disciplines index={index()} />
        <Projects index={index()} />
        <SocialProof index={index()} />
        <Metrics index={index()} />
        <Ownership index={index()} />
        <HowWeWork index={index()} />
        <Engagement index={index()} />
        <FromTheLab index={index()} />
        <FAQ index={index()} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
