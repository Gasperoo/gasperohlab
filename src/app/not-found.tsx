import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rocket, ArrowLeft } from "lucide-react";
import { Background } from "@/components/Background";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Background />
      <main
        id="main-content"
        className="relative isolate z-10 flex min-h-[100svh] flex-1 flex-col items-center justify-center px-5 py-24 text-center sm:px-6"
      >
        {/* Corrupted lab character — faint backdrop for the error state */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
        >
          <Image
            src="/alt/alt2.jpg"
            alt=""
            width={1152}
            height={900}
            priority
            className="w-[min(620px,92vw)] max-w-none select-none opacity-[0.09] [mask-image:radial-gradient(closest-side,black,transparent_72%)]"
          />
        </div>

        <Link href="/" className="group mb-10 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white ring-1 ring-white/10">
            <Rocket
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </span>
          <span className="font-display text-base font-bold tracking-[0.12em]">
            GASPEROH<span className="text-accent">LAB</span>
          </span>
        </Link>

        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="font-display text-balance text-6xl font-bold tracking-tight sm:text-8xl">
          Lost in the lab.
        </h1>
        <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted">
          This page never made it out of prototype — or it moved. Either way,
          there&apos;s nothing to see here.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover"
          >
            About the lab
          </Link>
        </div>
      </main>
    </>
  );
}
