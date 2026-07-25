import type { NextConfig } from "next";

// Content Security Policy for a fully static, self-contained site.
// Everything (scripts, styles, fonts, images) is served from our own origin —
// next/font self-hosts the fonts and there are no third-party embeds. Inline is
// required because Next streams its RSC payload via inline <script> and
// framer-motion applies inline style attributes; both are same-origin only.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// Files under `public/` are served by Next with `Cache-Control: public, max-age=0`,
// so every image and video is re-downloaded on every visit. These filenames aren't
// content-hashed (unlike /_next/static), so `immutable` would strip our ability to
// replace an asset in place. A day of freshness plus a long stale-while-revalidate
// window gets the same practical result — served instantly from cache, refreshed in
// the background — while still healing on its own if a file is swapped out.
//
// Matched by extension rather than by directory: `/work/:path*` would also catch the
// `/work/[slug]` HTML routes and wrongly freeze the pages themselves.
const mediaExtensions = "jpg|jpeg|png|gif|svg|ico|webp|avif|mp4|webm|woff|woff2";

const cacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=31536000",
  },
];

const nextConfig: NextConfig = {
  // Remove the `X-Powered-By: Next.js` header (avoid leaking stack details).
  poweredByHeader: false,

  // Pin the workspace root to this project so Next doesn't get confused
  // by other lockfiles higher up in the filesystem.
  turbopack: {
    root: __dirname,
  },

  images: {
    // AVIF first, WebP for anything that can't take it. The site is mostly
    // large phone screenshots and UI captures, which is exactly the content
    // AVIF compresses best — worth the slower first encode, since the result
    // is cached and every subsequent request is served from it.
    formats: ["image/avif", "image/webp"],
    // Every `src` is a local file we ship; nothing remote is optimizable.
    localPatterns: [{ pathname: "/**", search: "" }],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: `/:path(.*\\.(?:${mediaExtensions}))`,
        headers: cacheHeaders,
      },
    ];
  },
};

export default nextConfig;
