"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

// Section ids live on the home page; the hrefs are real routes so the links
// also work from anywhere else on the site.
const links = [
  { label: "Work", id: "work", href: "/work" },
  { label: "Ethos", id: "ethos", href: "/ethos" },
  { label: "Lab", id: "lab", href: "/lab" },
  { label: "About", id: "about", href: "/about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
          element hovering above it. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? "panel border-b border-border" : ""
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between px-5 sm:px-8">
          <Wordmark />

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.id ? "page" : undefined}
                className={`relative text-sm transition-colors ${
                  active === l.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
                {/* The active marker is a 1px rule under the label — the same
                    hairline language the rest of the page uses. */}
                {active === l.id && (
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-foreground"
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-md bg-accent px-4 py-2 text-[0.8125rem] font-medium text-white transition-colors hover:bg-accent-hover md:inline-block"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-black/5 md:hidden"
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
                <m.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                  className="flex items-baseline gap-4 border-b border-border px-5 py-6 sm:px-8"
                >
                  <span className="eyebrow w-6">0{i + 1}</span>
                  <span className="t-h3 text-2xl tracking-[-0.03em] text-foreground">
                    {l.label}
                  </span>
                </m.a>
              ))}

              <m.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + links.length * 0.04, duration: 0.25 }}
                className="mx-5 mt-8 flex items-center justify-center rounded-md bg-accent px-4 py-3.5 text-sm font-medium text-white sm:mx-8"
              >
                Get in touch
              </m.a>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
