import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const siteUrl = "https://gasperohlab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gasper Oh Lab — Experiments in games, apps & AI",
    template: "%s · Gasper Oh Lab",
  },
  description:
    "Gasper Oh Lab is an independent studio building games, apps, AI models and programs. A place for bold experiments turned into real, shipped software.",
  keywords: [
    "Gasper Oh Lab",
    "game development",
    "app development",
    "AI models",
    "software studio",
    "indie",
    "experiments",
  ],
  authors: [{ name: "Gasper Oh Lab" }],
  creator: "Gasper Oh Lab",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Gasper Oh Lab — Experiments in games, apps & AI",
    description:
      "An independent studio building games, apps, AI models and programs. Bold experiments turned into shipped software.",
    siteName: "Gasper Oh Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gasper Oh Lab — Experiments in games, apps & AI",
    description:
      "An independent studio building games, apps, AI models and programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
