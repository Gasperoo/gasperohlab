import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
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
  themeColor: "#070506",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
