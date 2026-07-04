import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GASPEROHLAB collects, uses and protects your information — written in plain language, without the fine-print theatre.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/privacy",
    title: "Privacy Policy · GASPEROHLAB",
    description:
      "How we collect, use and protect your information — in plain language.",
  },
};

const intro = [
  "GASPEROHLAB is an independent software lab. We build games, applications and AI models — some under our own name, some quietly for other companies. This policy covers the information we handle when you visit our site, reach out to us, or use software we ship.",
  "We keep this short and honest on purpose. We collect what we need to do the work and nothing we don't, and we never sell your data.",
];

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "GASPEROHLAB (\"we\", \"us\", \"our\") is the data controller for information collected through this website and the products we operate directly. We are based in Toronto, Canada. If a project is run on behalf of another company — for example the Marapone AI suite we build for the construction and logistics industries — that company may be the controller of your data, and their policy governs.",
      "The simplest way to reach us about anything in this policy is to email us at the address in the Contact section below.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "We only collect information that has a clear reason to exist. That falls into a few buckets:",
      [
        "Information you give us — your name, email and message when you contact us, join a waitlist, or start a project with us.",
        "Product data — if you use an application or AI tool we operate, the account details and content needed to make it work.",
        "Usage and device data — basic, largely anonymous analytics about how our site is used (pages visited, rough location, browser and device type), so we can make it better.",
        "Technical logs — standard server records such as IP address and request times, kept for security and to keep things running.",
      ],
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use the information above to:",
      [
        "Respond to you and deliver work you've asked us to do.",
        "Operate, maintain and improve our sites, games, apps and AI models.",
        "Keep our systems secure and diagnose problems when something breaks.",
        "Meet legal and accounting obligations.",
      ],
      "We do not use your personal information to train third-party AI models, and we do not sell it to anyone. Where we use AI in our own products, we tell you inside the product what it does with your input.",
    ],
  },
  {
    heading: "How we share it",
    body: [
      "We share information only where it's necessary to run the lab, and only with parties held to their own confidentiality and security obligations:",
      [
        "Service providers — the infrastructure, hosting, analytics and email tools we rely on to operate (for example our hosting and analytics providers).",
        "Clients — where we build software on a company's behalf, data from that product belongs to and is shared with that company.",
        "Legal — when we're genuinely required to by law, or to protect our rights, users or systems.",
      ],
      "We may share aggregated or anonymised information that can't be used to identify you — for example, general usage statistics.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "Our site uses a small number of cookies and privacy-respecting analytics to understand traffic and keep things working. You're in control of these through your browser and, where shown, our cookie controls. There's a full breakdown on our Cookies Policy page.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep personal information only as long as we need it for the purpose we collected it — to answer you, to run a product you use, or to meet a legal obligation — and then we delete or anonymise it. Project and account data tied to software we operate is kept for the life of that engagement or account.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you have rights over your personal information — to access it, correct it, delete it, or ask us to stop using it. You can exercise any of these by emailing us, and we'll act on it within the timeframes the law requires.",
      "If you're in the EEA, UK, or a jurisdiction with similar laws, those rights apply to you regardless of where we're based.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We own our tools end to end and treat security as part of the build, not an afterthought. We use sensible technical and organisational measures to protect your information. No system is perfectly secure, but if something ever goes wrong that affects you, we'll tell you and the relevant authorities as required.",
    ],
  },
  {
    heading: "Children",
    body: [
      "Our site and business services aren't directed at children under 13, and we don't knowingly collect their information. Individual games or apps may have their own age ratings and rules, stated in the product.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "As the lab grows, this policy will change with it. When we make a meaningful update, we'll revise the date at the top of this page. Continuing to use our site or products after a change means you accept the updated policy.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about your privacy, or want to exercise a right above? Email us at privacy@gasperohlab.com and a real person will get back to you.",
    ],
  },
];

export default function PrivacyPage() {
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
          title="Privacy Policy"
          updated="July 4, 2026"
          intro={intro}
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
