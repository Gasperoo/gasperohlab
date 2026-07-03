"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type Shot = { src: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  meta?: string;
  shots: Shot[];
};

export function ProjectGalleryModal({ open, onClose, title, meta, shots }: Props) {
  // `index` is the active shot; `dir` drives the slide direction (+1 next, -1 prev).
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (delta: number) => {
      setState(([i]) => {
        const next = (i + delta + shots.length) % shots.length;
        return [next, delta];
      });
    },
    [shots.length]
  );

  const jump = useCallback((to: number) => {
    setState(([i]) => [to, to > i ? 1 : -1]);
  }, []);

  // Reset to the first shot whenever the modal (re)opens.
  useEffect(() => {
    if (open) setState([0, 0]);
  }, [open]);

  // Escape to close, arrows to navigate, and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, go]);

  const active = shots[index];

  return (
    <AnimatePresence>
      {open && active && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshots`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-2xl shadow-black/50"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-start justify-between gap-4 px-6 pt-6">
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  Screenshots
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {title}
                </h3>
                {meta && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                    {meta}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Phone viewport */}
            <div className="relative mt-5 flex flex-1 items-center justify-center px-6">
              <div className="relative aspect-[1320/2868] w-full max-w-[240px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-xl shadow-black/40">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.img
                    key={index}
                    src={active.src}
                    alt={`${title} — ${active.label}`}
                    custom={dir}
                    initial={{ opacity: 0, x: dir === 0 ? 0 : dir * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -60 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                </AnimatePresence>
              </div>

              {/* Arrows */}
              {shots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous screenshot"
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next screenshot"
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Label + tabs */}
            <div className="relative px-6 pb-6 pt-5">
              <p className="text-center text-sm font-medium text-foreground">
                {active.label}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {shots.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => jump(i)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      i === index
                        ? "bg-accent text-white"
                        : "text-muted hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
