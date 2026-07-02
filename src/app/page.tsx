import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Disciplines } from "@/components/Disciplines";
import { Experiments } from "@/components/Experiments";
import { Ethos } from "@/components/Ethos";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <div className="noise" aria-hidden />
      <Nav />
      <main className="relative z-10 flex-1">
        <Hero />
        <Marquee />
        <Disciplines />
        <Experiments />
        <Ethos />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
