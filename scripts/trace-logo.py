"""
Vectorise the GASPEROHLAB monogram from its source raster.

The brand mark arrived as gasperohlab-logo.jpg: white line art on a charcoal
field, portrait, with a lot of empty margin. A JPEG is unusable as a site mark —
it has no transparency (so the charcoal block would sit on the paper page), it
cannot be recoloured, and it turns to mush at favicon sizes.

No tracing tool (potrace, autotrace, ImageMagick, Inkscape) is available in this
environment, so this does the job directly: threshold, marching squares to pull
iso-contours at the ink boundary, Douglas-Peucker to drop the pixel staircase,
then emit one even-odd path. The art is straight segments and circles, so
simplification collapses the edges to two points each and leaves the circular
nodes as smooth polygons.

Emits public/logo.svg (standalone, brand accent) and src/components/Logo.tsx
(inline, currentColor). Both carry identical geometry; the component is inlined
into pages so the mark can inherit colour, which is what lets one source be
drawn in accent on the page and reversed out to paper inside the icon tiles.

Run:  python3 scripts/trace-logo.py
"""

from __future__ import annotations

import pathlib

import numpy as np
from PIL import Image

SRC = "brand/gasperohlab-logo.jpg"
OUT_SVG = "public/logo.svg"
OUT_TSX = "src/components/Logo.tsx"
ACCENT = "#c4302a"

# Ink is ~250, ground is ~30 — the histogram is strongly bimodal, so the exact
# threshold is not delicate.
THRESHOLD = 128
# In source pixels. Below ~0.5 the staircase survives; above ~1.5 the circular
# nodes start to visibly facet.
EPSILON = 0.4
# Breathing room around the mark, as a fraction of its longest side.
PAD = 0.04

# Marching-squares segment table, keyed by the 4-corner bitmask
# (tl<<3 | tr<<2 | br<<1 | bl). Values are pairs of cell edges: T, R, B, L.
CASES: dict[int, tuple[tuple[str, str], ...]] = {
    1: (("L", "B"),),
    2: (("B", "R"),),
    3: (("L", "R"),),
    4: (("T", "R"),),
    # 5 and 10 are saddles. Either resolution yields closed, valid loops at this
    # resolution, so pick one and stay consistent.
    5: (("L", "T"), ("B", "R")),
    6: (("T", "B"),),
    7: (("L", "T"),),
    8: (("T", "L"),),
    9: (("T", "B"),),
    10: (("T", "R"), ("L", "B")),
    11: (("T", "R"),),
    12: (("L", "R"),),
    13: (("B", "R"),),
    14: (("L", "B"),),
}


def marching_squares(mask: np.ndarray) -> list[list[tuple[float, float]]]:
    """Closed iso-contours around every ink region and every hole inside one."""
    # Pad so regions touching the edge still close into loops.
    m = np.pad(mask, 1, constant_values=False)
    h, w = m.shape
    segments: list[tuple[tuple[float, float], tuple[float, float]]] = []

    for i in range(h - 1):
        for j in range(w - 1):
            tl, tr = m[i, j], m[i, j + 1]
            bl, br = m[i + 1, j], m[i + 1, j + 1]
            key = (tl << 3) | (tr << 2) | (br << 1) | bl
            if key in (0, 15):
                continue
            # Edge midpoints. Half-integers are exact in binary, so identical
            # points from adjacent cells compare equal and chain cleanly.
            pts = {
                "T": (j + 0.5, float(i)),
                "R": (float(j + 1), i + 0.5),
                "B": (j + 0.5, float(i + 1)),
                "L": (float(j), i + 0.5),
            }
            for a, b in CASES[key]:
                segments.append((pts[a], pts[b]))

    # Chain segments into loops.
    adj: dict[tuple[float, float], list[tuple[float, float]]] = {}
    for a, b in segments:
        adj.setdefault(a, []).append(b)
        adj.setdefault(b, []).append(a)

    unused = {(a, b) for a, b in segments}
    unused |= {(b, a) for a, b in segments}
    loops: list[list[tuple[float, float]]] = []

    for start in list(adj):
        while True:
            nxt = next((n for n in adj[start] if (start, n) in unused), None)
            if nxt is None:
                break
            loop = [start]
            cur, prev = nxt, start
            unused.discard((prev, cur))
            unused.discard((cur, prev))
            while cur != start:
                loop.append(cur)
                step = next((n for n in adj[cur] if (cur, n) in unused), None)
                if step is None:
                    break
                unused.discard((cur, step))
                unused.discard((step, cur))
                prev, cur = cur, step
            if len(loop) >= 3:
                loops.append(loop)
    return loops


def simplify(points: list[tuple[float, float]], eps: float) -> list[tuple[float, float]]:
    """Douglas-Peucker on a closed ring."""
    if len(points) < 3:
        return points

    def rdp(pts):
        if len(pts) < 3:
            return pts
        (x0, y0), (x1, y1) = pts[0], pts[-1]
        dx, dy = x1 - x0, y1 - y0
        norm = (dx * dx + dy * dy) ** 0.5
        far, dmax = 0, -1.0
        for k in range(1, len(pts) - 1):
            x, y = pts[k]
            d = (
                abs(dy * x - dx * y + x1 * y0 - y1 * x0) / norm
                if norm
                else ((x - x0) ** 2 + (y - y0) ** 2) ** 0.5
            )
            if d > dmax:
                far, dmax = k, d
        if dmax <= eps:
            return [pts[0], pts[-1]]
        return rdp(pts[: far + 1])[:-1] + rdp(pts[far:])

    # Split the ring at its two extremes so neither anchor sits mid-curve.
    n = len(points)
    i0 = min(range(n), key=lambda k: (points[k][1], points[k][0]))
    ring = points[i0:] + points[:i0]
    i1 = max(range(len(ring)), key=lambda k: (ring[k][1], ring[k][0]))
    out = rdp(ring[: i1 + 1])[:-1] + rdp(ring[i1:] + [ring[0]])[:-1]
    return out


def main() -> None:
    img = np.asarray(Image.open(SRC).convert("L"))
    mask = img > THRESHOLD

    ys, xs = np.nonzero(mask)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    mask = mask[y0 : y1 + 1, x0 : x1 + 1]

    loops = marching_squares(mask)
    loops = [simplify(l, EPSILON) for l in loops]
    loops = [l for l in loops if len(l) >= 3]

    # Marching squares ran on a 1px-padded mask; shift back onto the crop.
    h, w = mask.shape
    pad = round(max(w, h) * PAD, 1)
    vb_w, vb_h = round(w + pad * 2, 1), round(h + pad * 2, 1)

    def fmt(v: float) -> str:
        return f"{v:.1f}".rstrip("0").rstrip(".")

    paths = []
    for loop in loops:
        pts = [(x - 1 + pad, y - 1 + pad) for x, y in loop]
        d = "M" + " L".join(f"{fmt(x)},{fmt(y)}" for x, y in pts) + "Z"
        paths.append(d)

    d = "".join(paths)
    view_box = f"0 0 {fmt(vb_w)} {fmt(vb_h)}"

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" '
        f'fill="{ACCENT}" fill-rule="evenodd">\n  <path d="{d}"/>\n</svg>\n'
    )
    pathlib.Path(OUT_SVG).write_text(svg)

    tsx = f'''import type {{ SVGProps }} from "react";

/**
 * The GASPEROHLAB monogram — a circuit-trace "G".
 *
 * GENERATED by scripts/trace-logo.py from brand/gasperohlab-logo.jpg. Re-run
 * the script rather than editing the path data here.
 *
 * Inlined rather than loaded as an <img> so it inherits `currentColor`. That is
 * the whole point: the same geometry is drawn in the brand accent on the page
 * and reversed out to paper inside the app-icon tiles.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {{
  return (
    <svg
      viewBox="{view_box}"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden
      {{...props}}
    >
      <path d="{d}" />
    </svg>
  );
}}
'''
    pathlib.Path(OUT_TSX).write_text(tsx)

    print(f"{len(loops)} contours, {sum(len(l) for l in loops)} points")
    print(f"viewBox {view_box}")
    print(f"wrote {OUT_SVG} ({len(svg) / 1024:.1f} KB) and {OUT_TSX}")


if __name__ == "__main__":
    main()
