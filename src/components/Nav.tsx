"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { Menu, Search, X } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";
import { useContact } from "./ContactProvider";
import { usePalette } from "./CommandPalette";

// Every entry is a real route, so the links work from anywhere on the site.
// `section` names the home-page section the link corresponds to when you're
// already on the home page. About and Ethos have none — About never did, which
// is exactly why the scroll-spy alone could never mark it active, and Ethos
// lost its home-page section when the page was trimmed.
const links = [
  { label: "Work", href: "/work", section: "work" },
  { label: "Ethos", href: "/ethos", section: null },
  { label: "Lab", href: "/lab", section: "lab" },
  { label: "About", href: "/about", section: null },
];

export function Nav() {
  const pathname = usePathname();
  const openContact = useContact();
  const openPalette = usePalette();
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy, home page only. Elsewhere there are no sections to observe and
  // the route itself is the answer — previously the observer found nothing on
  // those pages and no link was ever marked.
  //
  // Leaving the home page deliberately doesn't clear `section`: it's only ever
  // read behind an `onHome` check, so a stale value can't be shown, and
  // resetting it would mean writing state from an effect for no visible gain.
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      if (!l.section) return;
      const el = document.getElementById(l.section);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  /**
   * Two different kinds of "here".
   *
   * On a sub-route the link is the current *page*, which is what
   * `aria-current="page"` means. On the home page the same link points at a
   * section that happens to be in view — still current, but not a page, so it
   * gets the generic `true`. The old code reported "page" for both, and was
   * wrong in the more common of the two cases.
   */
  function current(link: (typeof links)[number]): "page" | "true" | undefined {
    if (pathname === link.href || pathname.startsWith(`${link.href}/`)) {
      return "page";
    }
    if (onHome && link.section && section === link.section) return "true";
    return undefined;
  }

  // Lock body scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // Client navigation keeps the header mounted, so without this the menu would
  // stay open over the page it just navigated to. Adjusted during render
  // rather than in an effect — an effect would paint one frame of the new page
  // with the old page's menu still over it.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  // If the viewport grows to desktop, make sure the menu isn't stuck open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* A full-width bar sitting on a hairline, not a floating pill. It reads
          as part of the page's ruled structure rather than an app chrome
          element hovering above it.

          The view-transition name pins it out of route animations: a header
          that slides along with the content removes the reader's only fixed
          reference point. See globals.css. */}
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? "panel border-b border-border" : ""
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between px-5 sm:px-8">
          <Wordmark />

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => {
              const active = current(l);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active}
                  className={`relative text-sm transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {/* The active marker is a 1px rule under the label — the same
                      hairline language the rest of the page uses. */}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-foreground"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search the site"
              title="Search — ⌘K"
              className="ghost-hover flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={openContact}
              className="ml-1 hidden rounded-md bg-accent px-4 py-2 text-[0.8125rem] font-medium text-white transition-colors hover:bg-accent-hover md:inline-block"
            >
              Get in touch
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="ghost-hover -mr-2 flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — a full-height paper sheet with the links set large,
          rather than a small dropdown card. */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-background md:hidden"
          >
            <div className="grain pointer-events-none absolute inset-0" />
            <nav className="relative flex flex-col border-t border-border">
              {links.map((l, i) => (
                <m.div
                  key={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={l.href}
                    aria-current={current(l)}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border px-5 py-6 sm:px-8"
                  >
                    <span className="eyebrow w-6">0{i + 1}</span>
                    <span className="t-h3 text-2xl tracking-[-0.03em] text-foreground">
                      {l.label}
                    </span>
                  </Link>
                </m.div>
              ))}

              <m.button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openContact();
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + links.length * 0.04, duration: 0.25 }}
                className="mx-5 mt-8 flex items-center justify-center rounded-md bg-accent px-4 py-3.5 text-sm font-medium text-white sm:mx-8"
              >
                Get in touch
              </m.button>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
