import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Disciplines } from "@/components/Disciplines";
import { Projects } from "@/components/Projects";
import { SocialProof } from "@/components/SocialProof";
import { Metrics } from "@/components/Metrics";
import { Ownership } from "@/components/Ownership";
import { HowWeWork } from "@/components/HowWeWork";
import { Engagement } from "@/components/Engagement";
import { Ethos } from "@/components/Ethos";
import { FromTheLab } from "@/components/FromTheLab";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 focus:outline-none">
        <Hero />
        <Marquee />
        <Disciplines />
        <Projects />
        <SocialProof />
        <Metrics />
        <Ownership />
        <HowWeWork />
        <Engagement />
        <Ethos />
        <FromTheLab />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
