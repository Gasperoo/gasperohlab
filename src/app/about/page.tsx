import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "GASPEROHLAB is an independent software lab taking hard problems from prototype to production — across games, applications, AI models and systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/about",
    title: "About · GASPEROHLAB",
    description:
      "An independent software lab taking hard problems from prototype to production.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Background />
      <Nav />
      <main className="relative z-10 flex-1">
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
