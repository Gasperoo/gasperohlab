"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";
import { Background } from "@/components/Background";
import { Wordmark } from "@/components/Wordmark";

/**
 * Route error boundary.
 *
 * The 404 was already designed; an unhandled throw fell through to Next's own
 * error screen, which is the one page on the site that looked like a different
 * site. This is the 404's twin — same wordmark, same ruled layout, same
 * assumption that the reader wants an exit rather than an apology.
 *
 * No error text is shown. A stack trace or a framework message tells a visitor
 * nothing they can act on; `digest` is the identifier that actually correlates
 * to the server log, so that's what gets surfaced.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Background />
      <main
        id="main-content"
        className="relative z-10 flex min-h-[100svh] flex-1 flex-col justify-center"
      >
        <div className="mx-auto w-full max-w-[76rem] px-5 py-24 sm:px-8">
          <Wordmark size="lg" />

          <p className="eyebrow mt-16">Error</p>
          <h1 className="t-h1 mt-7 max-w-2xl text-balance">
            That didn&apos;t survive contact with reality.
          </h1>
          <p className="t-lede mt-7 max-w-lg text-pretty">
            Something broke on our side rendering this page. Try it again — and
            if it keeps happening, tell us and we&apos;ll go and fix it.
          </p>

          <div className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={reset}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <RotateCw className="h-4 w-4 transition-transform group-hover:rotate-45" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Back home
            </Link>
          </div>

          {error.digest && (
            <p className="eyebrow mt-12 border-t border-border pt-6">
              Reference {error.digest}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
