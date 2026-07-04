import type { ComponentType } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

type IconProps = { className?: string };

function GithubMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22 0 1.61-.02 2.9-.02 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

function InstagramMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.5-.66a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0Z" />
    </svg>
  );
}

function FacebookMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.12 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79v8.44C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  );
}

function XMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.29L17.61 20.65Z" />
    </svg>
  );
}

const socials: { label: string; Icon: ComponentType<IconProps>; href?: string }[] = [
  { label: "Instagram", Icon: InstagramMark, href: "https://www.instagram.com/gasperohlab/" },
  { label: "Facebook", Icon: FacebookMark },
  { label: "X", Icon: XMark },
  { label: "GitHub", Icon: GithubMark },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white ring-1 ring-white/10">
            <Rocket className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          <span className="font-display text-sm font-bold tracking-[0.12em]">
            GASPEROH<span className="text-accent">LAB</span>
          </span>
        </div>

        <p className="text-center text-sm text-muted">
          © 2026 Gasperohlab. All Rights Reserved.
          <span className="mt-0.5 block text-faint">Toronto, Canada</span>
        </p>

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className="rounded-lg border border-border px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            About
          </Link>
          <span className="mx-1 h-4 w-px bg-border" aria-hidden />
          {socials.map(({ label, Icon, href }) =>
            href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ) : (
              <span
                key={label}
                aria-label={`${label} — coming soon`}
                title={`${label} — coming soon`}
                className="flex h-9 w-9 cursor-default items-center justify-center rounded-full border border-border text-faint"
              >
                <Icon className="h-4 w-4" />
              </span>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
