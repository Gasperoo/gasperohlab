export type Theme = "light" | "dark";

export const THEME_KEY = "gohl-theme";

/**
 * Runs before first paint, from a blocking inline <script> in <head>.
 *
 * A theme read in an effect is a theme applied one frame too late — the reader
 * gets a full white flash before the dark sheet arrives, which is worse than
 * having no dark theme at all. This has to be synchronous, before the body
 * paints, which is the one legitimate use for an inline script here.
 *
 * Deliberately does nothing when no choice has been stored *and* the OS has no
 * preference either: leaving `data-theme` off lets the `prefers-color-scheme`
 * block in globals.css stay in charge, so the page keeps following the system
 * if it changes mid-session.
 */
export const themeScript = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(THEME_KEY)});
if(s==="light"||s==="dark"){document.documentElement.dataset.theme=s;return;}
document.documentElement.dataset.theme=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
}catch(e){}})();`;

/**
 * The active theme, as an external store.
 *
 * It genuinely is external: the source of truth is a `data-theme` attribute on
 * <html>, written before React exists and read back by CSS. Mirroring that
 * into component state via an effect would paint one frame with the wrong icon
 * and trip the cascading-render rule; `useSyncExternalStore` is the shape React
 * provides for exactly this.
 */
const listeners = new Set<() => void>();

export function subscribeToTheme(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * On the server there is no attribute to read and no correct answer, so the
 * toggle renders a blank slot of the right size until hydration resolves it.
 */
export const getServerTheme = (): Theme | null => null;

/** Apply a theme, remember it, and notify anything rendering it. */
export function setTheme(next: Theme) {
  const root = document.documentElement;

  // Crossfade the swap, then take the transition back off so it can't tax
  // anything else. 400ms covers the 350ms declared in globals.css.
  root.classList.add("theme-anim");
  window.setTimeout(() => root.classList.remove("theme-anim"), 400);

  root.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Private mode, or storage disabled. The theme still applies for this
    // page; it just won't be remembered.
  }
  listeners.forEach((l) => l());
}
