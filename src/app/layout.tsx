import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

// One family across the whole site. Headings differ from body copy by weight
// and tracking, not by face — a second display font was what made the old
// design read louder than it needed to.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Reserved for the structural voice: section indices, metadata, captions.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  themeColor: "#faf9f7",
  colorScheme: "light",
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
      // Google wants a fetchable raster here, not an SVG, and applies a 112px
      // minimum — this is the square 512px tile. Declared as an ImageObject
      // with explicit dimensions so it can be validated without a fetch.
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/icons/logo-512.png`,
        contentUrl: `${siteUrl}/icons/logo-512.png`,
        width: 512,
        height: 512,
        caption: "GASPEROHLAB",
      },
      image: { "@id": `${siteUrl}/#logo` },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        {/* Scroll-revealed content starts hidden and is shown by an observer.
            Without scripting nothing would ever reveal it, so pin it visible. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
