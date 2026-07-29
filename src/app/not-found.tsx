import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Background } from "@/components/Background";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * The 404 no longer stages a "corrupted lab character" behind the copy. An
 * error page is the worst possible place for a mascot — people arrive here
 * already mildly annoyed and want the exit, not a joke.
 */
export default function NotFound() {
  return (
    <>
      <Background />
      <main
        id="main-content"
        className="relative z-10 flex min-h-[100svh] flex-1 flex-col justify-center"
      >
        <div className="mx-auto w-full max-w-[76rem] px-5 py-24 sm:px-8">
          <Wordmark size="lg" />

          <p className="eyebrow mt-16">Error 404</p>
          <h1 className="t-h1 mt-7 max-w-2xl text-balance">Lost in the lab.</h1>
          <p className="t-lede mt-7 max-w-lg text-pretty">
            This page never made it out of prototype — or it moved. Either way,
            there&apos;s nothing to see here.
          </p>

          <div className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back home
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-md border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              See the work
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
