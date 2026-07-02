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
  title: {
    default: "GASPEROH LAB — Games, apps & AI, engineered.",
    template: "%s · GASPEROH LAB",
  },
  description:
    "GASPEROH LAB is an independent studio engineering games, apps, AI models and programs. Bold experiments, turned into real, shipped software.",
  keywords: [
    "Gasperoh",
    "GASPEROH LAB",
    "game development",
    "app development",
    "AI models",
    "software studio",
    "indie",
    "experiments",
  ],
  authors: [{ name: "GASPEROH LAB" }],
  creator: "GASPEROH LAB",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "GASPEROH LAB — Games, apps & AI, engineered.",
    description:
      "An independent studio engineering games, apps, AI models and programs. Bold experiments, turned into shipped software.",
    siteName: "GASPEROH LAB",
  },
  twitter: {
    card: "summary_large_image",
    title: "GASPEROH LAB — Games, apps & AI, engineered.",
    description:
      "An independent studio engineering games, apps, AI models and programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070506",
  colorScheme: "dark",
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
        {children}
      </body>
    </html>
  );
}
