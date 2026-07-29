/**
 * Numbers the home page's sections in source order.
 *
 * The indices used to be nine hardcoded strings spread across nine component
 * files, which meant reordering the page silently produced a document numbered
 * 01, 03, 02. Now each section asks for the next number as it renders, so the
 * numbering is a consequence of the order rather than a parallel fact that has
 * to be maintained alongside it.
 *
 * Call once per render — the counter is deliberately not shared between them.
 */
export function sectionIndexer() {
  let n = 0;
  return () => String(++n).padStart(2, "0");
}
