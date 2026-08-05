import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/MotionProvider";
import { ContactProvider } from "@/components/ContactProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { searchIndex } from "@/lib/search";
import { themeScript } from "@/lib/theme";
import { founder, sameAs, siteUrl } from "@/lib/site";
import "./globals.css";

// One family across the whole site. Headings differ from body copy by weight
// and tracking, not by face — a second display font was what made the old
// design read louder than it needed to. The mono is reserved for the
// structural voice: section indices, metadata, captions.
//
// Shipped from the `geist` package rather than fetched through
// `next/font/google`. Both self-host the files, so nothing changes at runtime;
// what it removes is a network fetch from the *build*, which was the one step
// that could fail for reasons having nothing to do with this repository. The
// package's variable names are already the ones globals.css expects, and both
// faces are variable, so the four weights the design uses come from one file
// each.

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
  // One per face, so the browser chrome matches the sheet the reader is on
  // instead of staying paper-coloured above a dark page.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#101013" },
  ],
  colorScheme: "light dark",
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
      foundingDate: "2025",
      sameAs,
      // Only claimed when there's a real person to name; see lib/site.ts.
      ...(founder ? { founder: { "@id": `${siteUrl}/#founder` } } : {}),
    },
    ...(founder
      ? [
          {
            "@type": "Person",
            "@id": `${siteUrl}/#founder`,
            name: founder.name,
            jobTitle: founder.role,
            description: founder.bio,
            worksFor: { "@id": `${siteUrl}/#organization` },
            url: `${siteUrl}/about`,
            ...(founder.sameAs?.length ? { sameAs: founder.sameAs } : {}),
          },
        ]
      : []),
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
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      // The theme script writes `data-theme` here before paint, which React
      // then sees as an attribute it didn't render.
      suppressHydrationWarning
    >
      <head>
        {/* Must run before the body paints — see lib/theme.ts. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
        {/* The index is built here, on the server, so the palette can search
            the whole site without any of it reaching the client bundle. */}
        {/* MotionProvider has to be the outer of the two: ContactProvider
            renders the contact dialog beside its children, so with the nesting
            the other way round that dialog sat outside <LazyMotion>. An `m.*`
            with no LazyMotion above it never gets a renderer — it paints its
            `initial` styles and stops there, which made "Get in touch" open a
            fully transparent modal. */}
        <CommandPalette items={searchIndex()}>
          <MotionProvider>
            <ContactProvider>{children}</ContactProvider>
          </MotionProvider>
        </CommandPalette>
        <Analytics />
      </body>
    </html>
  );
}
