"use client";

import { useEffect } from "react";

/**
 * Last resort — the root layout itself failed.
 *
 * This replaces <html> entirely, which means no fonts, no globals.css, and no
 * theme script: none of that survives a layout that threw. Everything here is
 * therefore inline and system-font, and it deliberately makes no attempt to
 * imitate the site. A page pretending to be fine while the shell is broken is
 * worse than a plain one that works.
 */
export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf9f7",
          color: "#16161a",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          lineHeight: 1.6,
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6e6e77",
            }}
          >
            GASPEROHLAB — Error
          </p>
          <h1
            style={{
              margin: "1.5rem 0 0",
              fontSize: "2rem",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            The site failed to load.
          </h1>
          <p style={{ margin: "1.25rem 0 0", color: "#5c5c65" }}>
            Something went wrong before the page could be built. Reloading is
            usually enough.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              border: 0,
              borderRadius: 6,
              background: "#c4302a",
              color: "#fff",
              padding: "0.75rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
          {error.digest && (
            <p
              style={{
                margin: "2.5rem 0 0",
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#6e6e77",
              }}
            >
              Reference {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
