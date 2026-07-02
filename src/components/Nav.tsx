"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Rocket } from "lucide-react";

const links = [
  { label: "Disciplines", href: "#disciplines" },
  { label: "Projects", href: "#projects" },
  { label: "Ethos", href: "#ethos" },
];

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-accent/30 to-accent-3/30 ring-1 ring-white/10">
        <Rocket className="h-4 w-4 text-accent-2 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
      <span className="font-display text-sm font-bold tracking-[0.14em]">
        GASPEROH<span className="text-gradient">LAB</span>
      </span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-accent via-accent-2 to-accent-3"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
            scrolled
              ? "glass-strong shadow-lg shadow-black/40"
              : "border border-transparent"
          }`}
        >
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span className="relative z-10">Get in touch</span>
          </a>
        </nav>
      </motion.header>
    </>
  );
}
