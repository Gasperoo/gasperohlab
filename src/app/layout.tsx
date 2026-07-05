import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://gasperohlab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "GASPEROHLAB",
  title: {
    default: "GASPEROHLAB — Games, apps & AI, engineered.",
    template: "%s · GASPEROHLAB",
  },
  description:
    "GASPEROHLAB is a collective engineering games, apps, AI models and programs. Bold experiments, turned into real, shipped software.",
  keywords: [
    "GASPEROHLAB",
    "Gasperohlab",
    "game development",
    "app development",
    "AI models",
    "software collective",
    "indie",
    "experiments",
  ],
  authors: [{ name: "GASPEROHLAB", url: siteUrl }],
  creator: "GASPEROHLAB",
  publisher: "GASPEROHLAB",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "GASPEROHLAB — The Lab" },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "GASPEROHLAB — Games, apps & AI, engineered.",
    description:
      "A collective engineering games, apps, AI models and programs. Bold experiments, turned into shipped software.",
    siteName: "GASPEROHLAB",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GASPEROHLAB — Games, apps & AI, engineered.",
    description:
      "A collective engineering games, apps, AI models and programs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Drop your Google Search Console token into GOOGLE_SITE_VERIFICATION to
  // verify ownership; harmlessly omitted when unset.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "GASPEROHLAB",
      legalName: "GASPEROHLAB Inc.",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      description:
        "A collective engineering games, apps, AI models and programs.",
      sameAs: ["https://www.instagram.com/gasperohlab/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "GASPEROHLAB",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:ring-2 focus:ring-white/20"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
