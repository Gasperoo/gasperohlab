import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the GASPEROHLAB website and the software we ship — clear, fair, and free of fine-print theatre.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/terms",
    title: "Terms of Service · GASPEROHLAB",
    description: "The terms for using our website and the software we ship.",
  },
};

const intro = [
  "These terms cover your use of the GASPEROHLAB website and the software, games and tools we make available through it. Using the site means you agree to what's below.",
  "We've written this to be read, not to hide behind. Where a specific product — a game, an app, or a client engagement like the Marapone AI suite — has its own agreement, that agreement governs that product.",
];

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "GASPEROHLAB is an independent software lab based in Toronto, Canada. We take hard problems from prototype to production across games, applications and AI models. In these terms, \"we\", \"us\" and \"our\" mean GASPEROHLAB; \"you\" means anyone using this site or the software we provide.",
    ],
  },
  {
    heading: "Using our site",
    body: [
      "You're welcome to browse, read and share our site. In return, we ask that you use it fairly:",
      [
        "Don't break the law or use the site to harm others.",
        "Don't attempt to disrupt, probe, overload or reverse-engineer our systems without our written permission.",
        "Don't scrape, copy or reuse our content at scale, or pass our work off as your own.",
        "Don't misrepresent your relationship with us or the lab.",
      ],
      "We may limit or end access for anyone who abuses the site or these terms.",
    ],
  },
  {
    heading: "Our work and intellectual property",
    body: [
      "Everything on this site — the wordmark, writing, design, code and artwork — belongs to GASPEROHLAB or the partners we build for, and is protected by copyright and other laws. Seeing it here doesn't give you a licence to reuse it.",
      "Some of what we make ships under our own name; some powers other companies quietly. Ownership of any given project is set by the agreement behind it. If you'd like to use something of ours, ask us first.",
    ],
  },
  {
    heading: "Products and services",
    body: [
      "Individual games, applications and AI tools we release may come with their own terms, pricing, licences and age ratings. Those product-specific terms sit alongside these and take priority for that product.",
      "For work we do on your behalf, the scope, ownership, payment and warranties are set in a separate written agreement between us — not in these general terms.",
    ],
  },
  {
    heading: "AI-powered features",
    body: [
      "Some of our products use AI models. AI output can be wrong, incomplete or unexpected, so treat it as a capable assistant rather than a final authority — especially for decisions that carry real weight. Where a product uses AI, we explain inside it what your input is used for.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "Our site may link to other companies and services — like partners, platforms or tools we use. We don't control those sites and aren't responsible for their content or practices. Their terms and privacy policies are their own.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "We put real care into everything we ship, but the site and its content are provided \"as is\", without warranties of any kind. We don't promise the site will always be available, error-free, or fit for a particular purpose. Anything you read here is information, not professional advice.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent the law allows, GASPEROHLAB isn't liable for indirect, incidental or consequential losses arising from your use of this site or its content. Nothing in these terms limits liability that can't legally be limited. Where we've entered a separate agreement with you, the liability terms in that agreement govern that work.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "We'll update these terms as the lab and its products evolve. When we make a meaningful change, we'll revise the date at the top of this page. Continuing to use the site after a change means you accept the updated terms.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there, without regard to conflict-of-laws rules. Any dispute will be handled by the courts located in Toronto, Ontario.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about these terms? Email us at legal@gasperohlab.com — a real person will answer.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Background />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 focus:outline-none"
      >
        <LegalPage
          title="Terms of Service"
          updated="July 4, 2026"
          intro={intro}
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
