import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "The cookies and analytics GASPEROHLAB uses, why we use them, and how to control them — no dark patterns.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    type: "website",
    url: "https://gasperohlab.com/cookies",
    title: "Cookies Policy · GASPEROHLAB",
    description: "The cookies and analytics we use, and how to control them.",
  },
};

const intro = [
  "This page explains the cookies and similar technologies we use on the GASPEROHLAB website, why they're there, and how you stay in control of them.",
  "We keep our footprint light. We don't run advertising trackers, and we don't sell what we learn about how the site is used.",
];

const sections: LegalSection[] = [
  {
    heading: "What cookies are",
    body: [
      "Cookies are small text files a site stores on your device. They let a site remember things between page loads and visits — settings you've chosen, or simply that you've been here before. \"Similar technologies\" means things like local storage that do much the same job.",
    ],
  },
  {
    heading: "The cookies we use",
    body: [
      "We group what we use into two plain categories:",
      [
        "Essential — the minimum needed for the site to work: page routing, security, and remembering your cookie choices. These can't be switched off.",
        "Analytics — privacy-respecting, largely anonymous measurement of how the site is used (which pages are visited, rough location, device and browser type), so we can make it better. We use Vercel Analytics, which is designed to avoid tracking individuals across sites.",
      ],
      "We don't use advertising or cross-site tracking cookies, and we don't build advertising profiles about you.",
    ],
  },
  {
    heading: "Why we use them",
    body: [
      "The reasons are simple: to keep the site secure and functioning, to remember your preferences, and to understand — in aggregate — what's useful so we spend our effort in the right places. That's it.",
    ],
  },
  {
    heading: "Third-party cookies",
    body: [
      "A few of the services we rely on to run the site — such as our hosting and analytics provider — may set their own cookies as part of doing their job. They're bound by their own policies and our agreements with them. If a product of ours embeds something external (say a video or a linked tool), that provider may set cookies too.",
    ],
  },
  {
    heading: "Managing cookies",
    body: [
      "You're in control. Where we show cookie controls on the site, you can adjust your choices there at any time. You can also manage or clear cookies directly in your browser:",
      [
        "Most browsers let you block or delete cookies in their privacy or security settings.",
        "You can usually set your browser to warn you before a cookie is stored.",
        "Blocking essential cookies may stop parts of the site from working properly.",
      ],
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we add, remove or change how we use cookies, we'll update this page and revise the date at the top. When a change is significant, we'll make it easy to notice.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about cookies or how we measure our site? Email us at privacy@gasperohlab.com. You can also read our Privacy Policy for the fuller picture of how we handle data.",
    ],
  },
];

export default function CookiesPage() {
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
          title="Cookies Policy"
          updated="July 4, 2026"
          intro={intro}
          sections={sections}
        />
      </main>
      <Footer />
    </>
  );
}
