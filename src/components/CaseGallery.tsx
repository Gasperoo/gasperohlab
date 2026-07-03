"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Shot } from "@/lib/work";

type Props = {
  shots: Shot[];
  /** Portrait phone frames instead of landscape tiles. */
  phone?: boolean;
};

export function CaseGallery({ shots, phone = false }: Props) {
  const [open, setOpen] = useState(false);
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (delta: number) =>
      setState(([i]) => [(i + delta + shots.length) % shots.length, delta]),
    [shots.length]
  );

  const openAt = (i: number) => {
    setState([i, 0]);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  const active = shots[index];

  return (
    <>
      <div
        className={
          phone
            ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            : "grid gap-4 sm:grid-cols-2"
        }
      >
        {shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => openAt(i)}
            aria-label={`Open ${s.label}`}
            className="surface surface-hover-fx group relative block overflow-hidden rounded-xl p-0 text-left"
          >
            <div
              className={`relative w-full overflow-hidden ${
                phone ? "aspect-[1320/2868]" : "aspect-[16/10]"
              }`}
            >
              <Image
                src={s.src}
                alt={s.label}
                fill
                sizes={phone ? "(max-width: 640px) 45vw, 20vw" : "(max-width: 640px) 90vw, 45vw"}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <span className="flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              {s.label}
              <span className="text-faint transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              role="dialog"
              aria-modal="true"
              aria-label={active.label}
              className="relative flex w-full max-w-5xl flex-col items-center"
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/60 ${
                  phone ? "mx-auto max-w-[320px] aspect-[1320/2868]" : "aspect-[16/10]"
                }`}
              >
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    custom={dir}
                    initial={{ opacity: 0, x: dir === 0 ? 0 : dir * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -60 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={active.src}
                      alt={active.label}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className={phone ? "object-cover object-top" : "object-contain"}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center gap-4">
                {shots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <p className="min-w-40 text-center text-sm font-medium text-foreground">
                  {active.label}
                  <span className="ml-2 font-mono text-xs text-faint">
                    {index + 1}/{shots.length}
                  </span>
                </p>
                {shots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
