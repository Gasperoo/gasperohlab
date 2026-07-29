"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
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
  const multiple = shots.length > 1;

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
            className="group relative block overflow-hidden rounded-lg border border-border bg-surface p-0 text-left transition-colors duration-300 hover:border-border-strong hover:bg-surface-hover"
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
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <span className="eyebrow flex items-center justify-between border-t border-border px-4 py-3.5">
              {s.label}
              <span className="transition-colors group-hover:text-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && active && (
          <m.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              // The lightbox dims hard in both themes — a viewer is one image, and the
              // page behind it should stop competing entirely.
              className="absolute inset-0 bg-black/[0.88] backdrop-blur-[3px]"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/80 text-muted backdrop-blur transition-colors hover:border-border-strong hover:text-foreground"
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
                className={`relative w-full overflow-hidden rounded-lg border border-border bg-black ${
                  phone ? "mx-auto max-w-[320px] aspect-[1320/2868]" : "aspect-[16/10]"
                }`}
              >
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <m.div
                    key={index}
                    className={`absolute inset-0${
                      multiple ? " cursor-grab active:cursor-grabbing" : ""
                    }`}
                    custom={dir}
                    initial={{ opacity: 0, x: dir === 0 ? 0 : dir * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -60 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    // On a phone the arrow buttons are the only way through the
                    // gallery, which is a poor fit for the gesture people
                    // already expect from an image viewer.
                    drag={multiple ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      // Either a decisive flick or a deliberate long drag.
                      const flicked = Math.abs(info.velocity.x) > 400;
                      const dragged = Math.abs(info.offset.x) > 70;
                      if (!flicked && !dragged) return;
                      go(info.offset.x < 0 ? 1 : -1);
                    }}
                  >
                    <Image
                      src={active.src}
                      alt={active.label}
                      fill
                      draggable={false}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className={phone ? "object-cover object-top" : "object-contain"}
                    />
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center gap-4">
                {multiple && (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous"
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/80 text-muted backdrop-blur transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <p className="min-w-40 text-center text-sm text-foreground">
                  {active.label}
                  <span className="ml-2.5 font-mono text-xs text-faint">
                    {String(index + 1).padStart(2, "0")}/{String(shots.length).padStart(2, "0")}
                  </span>
                </p>
                {multiple && (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next"
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/80 text-muted backdrop-blur transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
