import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-24">
          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

          <p className="relative mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Let&apos;s make something
          </p>
          <h2 className="relative mx-auto max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Have an idea worth experimenting on?
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-pretty text-lg text-muted">
            Whether it&apos;s a game, an app, an AI model or something with no
            name yet — let&apos;s build the prototype and find out.
          </p>

          <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:contact@gasperohlab.com"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Mail className="h-4 w-4" />
              contact@gasperohlab.com
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:info@gasperohlab.com"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
            >
              info@gasperohlab.com
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
