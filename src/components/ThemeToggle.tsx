"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import {
  getServerTheme,
  getTheme,
  setTheme,
  subscribeToTheme,
} from "@/lib/theme";

/**
 * Two-state theme switch.
 *
 * Deliberately not a three-way light / dark / system control. A tri-state
 * toggle needs a label to be legible, and a labelled control in a header built
 * entirely from hairlines is more chrome than the feature is worth. The inline
 * script already follows the OS by default, so "system" is simply the state
 * you're in before you ever press this.
 *
 * The icon shows the theme you would *switch to*, not the one you're in — a
 * sun while dark. It reads as an action rather than a status.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // Nothing correct can be rendered on the server: the active theme lives in a
  // DOM attribute written before React ran. Rather than guess and hydrate
  // wrong, hold the icon back for one frame.
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getTheme,
    getServerTheme
  );

  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className={`ghost-hover flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground ${className}`}
    >
      {/* The blank span keeps the button's size identical before and after
          hydration, so the header never reflows around it. */}
      {theme === null ? (
        <span className="h-4 w-4" />
      ) : dark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
