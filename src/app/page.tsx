import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Disciplines } from "@/components/Disciplines";
import { Projects } from "@/components/Projects";
import { Ethos } from "@/components/Ethos";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main className="relative z-10 flex-1">
        <Hero />
        <Marquee />
        <Disciplines />
        <Projects />
        <Ethos />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
