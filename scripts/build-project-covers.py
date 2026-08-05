"""
Draw the archive covers and app icons for the projects that don't have
screenshots yet.

Four entries in the archive are pre-release, so there is nothing real to
photograph. The convention the existing covers already set — Orbit, NexusMind,
OmniVault — is a 1600x1000 field in the product's colour with its app icon
standing in the middle of it, and that is what this generates: one cover per
project plus the full-bleed 1024 icon the stores want, from the same mark and
palette, so the two can never drift apart.

Marks are drawn from primitives rather than exported from a design tool for the
same reason build-icons.py rasterises the monogram: an icon that lives in a
binary file is an icon nobody can change the red of.

Run:  python3 scripts/build-project-covers.py
"""

from __future__ import annotations

import math
import pathlib

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

# Supersample factor for every mask. The marks are thin strokes and long
# diagonals, and drawn at final size they crawl.
SS = 3

COVER = (1600, 1000)
TILE = 620
ICON = 1024

RGB = tuple[int, int, int]


# --- background ------------------------------------------------------------


def gradient(size: tuple[int, int], top: RGB, bottom: RGB, angle: float) -> np.ndarray:
    """Linear gradient across `size` at `angle` degrees, clockwise from north."""
    w, h = size
    x, y = np.meshgrid(np.linspace(0, 1, w), np.linspace(0, 1, h))
    a = math.radians(angle)
    t = x * math.sin(a) - y * math.cos(a)
    t = (t - t.min()) / (t.max() - t.min())
    return np.array(top) + (np.array(bottom) - np.array(top)) * t[..., None]


def glow(
    field: np.ndarray, centre: tuple[float, float], radius: float, colour: RGB, strength: float
) -> np.ndarray:
    """Screen a soft radial light into `field`, in fractional coordinates."""
    h, w = field.shape[:2]
    x, y = np.meshgrid(np.arange(w), np.arange(h))
    d = np.hypot(x - centre[0] * w, y - centre[1] * h) / (radius * w)
    # cos falloff rather than 1/d: no hotspot at the centre, no visible edge.
    fall = np.clip(np.cos(np.clip(d, 0, 1) * math.pi / 2), 0, 1) ** 2
    lit = 255 - (255 - field) * (255 - np.array(colour) * strength) / 255
    return field + (lit - field) * fall[..., None]


# --- the tile --------------------------------------------------------------


def tile_art(size: int, spec: dict, rounded: bool) -> Image.Image:
    """The icon itself: a dark field, the mark, and — for covers — a hairline.

    `rounded` is what separates the two outputs. The cover shows an app icon as
    an object sitting on a page, so it gets the squircle and the light edge that
    reads as a screen; the store icon must be a full-bleed square because every
    platform applies its own mask and a pre-rounded one gets rounded twice.
    """
    S = size * SS
    base = gradient((S, S), spec["tile_top"], spec["tile_bottom"], 180)
    img = Image.fromarray(base.astype(np.uint8)).convert("RGBA")

    mark = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    spec["draw"](mark, S, spec)
    img.alpha_composite(mark)

    if rounded:
        r = int(S * 0.225)
        ImageDraw.Draw(img).rounded_rectangle(
            [0, 0, S - 1, S - 1],
            radius=r,
            outline=spec.get("edge", (255, 255, 255, 210)),
            width=int(S * 0.006),
        )
        mask = Image.new("L", (S, S), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=r, fill=255)
        img.putalpha(mask)

    return img.resize((size, size), Image.LANCZOS)


def cover(spec: dict) -> Image.Image:
    w, h = COVER
    field = gradient(COVER, spec["bg_top"], spec["bg_bottom"], spec.get("bg_angle", 165))
    field = glow(field, spec["glow_at"], spec["glow_r"], spec["glow"], spec.get("glow_k", 0.75))
    img = Image.fromarray(np.clip(field, 0, 255).astype(np.uint8)).convert("RGBA")

    art = tile_art(TILE, spec, rounded=True)
    x, y = (w - TILE) // 2, (h - TILE) // 2

    # A real shadow, because the tile is meant to read as lifted off the field.
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 150), (x, y + int(TILE * 0.035)), art.split()[3])
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(TILE * 0.05)))
    img.alpha_composite(art, (x, y))

    return img.convert("RGB")


# --- marks -----------------------------------------------------------------


def draw_rebar(im: Image.Image, S: int, spec: dict) -> None:
    """A grid with one cell lifted out of it on a bar.

    The product reads a spreadsheet and pulls a value out into something you can
    hold — a filled cell standing above the grid, still wired to the slot it
    came from, which stays visibly empty.
    """
    d = ImageDraw.Draw(im)
    g = S * 0.46
    cell = g / 3
    lift = S * 0.115
    left = (S - g) / 2
    # Centre the whole assembly — grid plus the lifted cell above it — rather
    # than the grid, or the mark sits low in the tile.
    top = (S - g) / 2 + lift * 0.83
    w = int(S * 0.014)

    for row in range(3):
        for col in range(3):
            # The lifted cell's slot is left as a fainter outline: the value is
            # gone, and the hole it left is the point.
            slot = row == 0 and col == 1
            x0, y0 = left + col * cell, top + row * cell
            d.rectangle(
                [x0, y0, x0 + cell, y0 + cell],
                outline=spec["dim"] if slot else spec["line"],
                width=w,
            )

    cx = left + 1.5 * cell
    d.line([cx, top, cx, top - lift + cell * 0.5], fill=spec["mark"], width=int(S * 0.012))

    x0, y0 = left + cell, top - lift
    d.rounded_rectangle(
        [x0, y0 - cell * 0.5, x0 + cell, y0 + cell * 0.5],
        radius=int(cell * 0.14),
        fill=spec["mark"],
    )


def draw_veer(im: Image.Image, S: int, spec: dict) -> None:
    """One line entering, an ensemble fanning out of it.

    The spread is the product, so the mark is a plume: the known past as a
    single stroke, the forecast as members that separate the further out they
    go.
    """
    d = ImageDraw.Draw(im)
    x0, x1 = S * 0.17, S * 0.50
    x2 = S * 0.84
    yc = S * 0.5
    d.line([x0, yc, x1, yc], fill=spec["mark"], width=int(S * 0.045))

    # Outer members carry the shape; the inner ones are the rest of the
    # ensemble, quiet enough not to turn the icon into a texture.
    members = [
        (-1.00, spec["mark"], 0.045),
        (0.86, spec["accent"], 0.038),
        (-0.52, spec["dim"], 0.022),
        (0.42, spec["dim"], 0.022),
        (-0.14, spec["dim"], 0.018),
    ]
    for bias, colour, weight in members:
        pts = []
        for i in range(49):
            t = i / 48
            pts.append((x1 + (x2 - x1) * t, yc + bias * S * 0.30 * t**1.7))
        d.line(pts, fill=colour, width=int(S * weight), joint="curve")


def _jagged(y0: float, y1: float, x: float, amp: float, seed: int) -> list[tuple[float, float]]:
    """A fracture-ish seam from y0 to y1, deterministic so the icon is stable."""
    rng = np.random.default_rng(seed)
    steps = 11
    pts = []
    for i in range(steps + 1):
        t = i / steps
        # Pinch the ends so the seam meets the outline instead of cutting it.
        pinch = math.sin(math.pi * t) ** 0.6
        pts.append((x + rng.uniform(-amp, amp) * pinch, y0 + (y1 - y0) * t))
    return pts


def draw_tessera(im: Image.Image, S: int, spec: dict) -> None:
    """Two shards of one broken disc, held slightly apart.

    The seam is the whole idea: it is a single fracture line, so the two edges
    are complements of each other, and the painted band has to continue across
    the gap.
    """
    r = S * 0.30
    cx, cy = S * 0.5, S * 0.5
    seam = _jagged(cy - r * 1.02, cy + r * 1.02, cx, r * 0.13, seed=7)

    arc = lambda a0, a1: [
        (cx + r * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a)))
        for a in np.linspace(a0, a1, 80)
    ]

    halves = [
        (list(reversed(seam)) + arc(-90, -270), (-S * 0.022, -S * 0.008), spec["mark"]),
        (seam + arc(90, -90), (S * 0.022, S * 0.008), spec["accent"]),
    ]

    for poly, (dx, dy), fill in halves:
        shifted = [(x + dx, y + dy) for x, y in poly]

        mask = Image.new("L", (S, S), 0)
        ImageDraw.Draw(mask).polygon(shifted, fill=255)

        layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(layer).polygon(shifted, fill=fill)

        # Decoration that runs across the break — the signal a real matcher uses
        # and the reason the two shards read as one object rather than two.
        band = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        bd = ImageDraw.Draw(band)
        for oy in (-r * 0.46, -r * 0.14):
            bd.rectangle([0, cy + oy + dy, S, cy + oy + dy + S * 0.026], fill=spec["band"])
        band.putalpha(ImageChops.multiply(band.getchannel("A"), mask))
        layer.alpha_composite(band)

        im.alpha_composite(layer)


def draw_bequest(im: Image.Image, S: int, spec: dict) -> None:
    """A keyhole broken into three pieces, none of which is a key.

    k-of-n: the shape is only a keyhole when the parts are together, and no
    single piece tells you anything about the whole.
    """
    cx = S * 0.5
    head_y, head_r = S * 0.40, S * 0.155
    stem_y = S * 0.70

    shape = Image.new("L", (S, S), 0)
    sd = ImageDraw.Draw(shape)
    sd.ellipse([cx - head_r, head_y - head_r, cx + head_r, head_y + head_r], fill=255)
    sd.polygon(
        [
            (cx - head_r * 0.42, head_y),
            (cx + head_r * 0.42, head_y),
            (cx + head_r * 0.85, stem_y),
            (cx - head_r * 0.85, stem_y),
        ],
        fill=255,
    )

    # The splits: three cuts from one origin — straight down through the stem,
    # and up to either side — so the pieces come out of the same break and no
    # one of them is the interesting one.
    for angle in (90, 210, 330):
        a = math.radians(angle)
        sd.line(
            [cx, head_y, cx + S * math.cos(a), head_y + S * math.sin(a)],
            fill=0,
            width=int(S * 0.028),
        )

    fill = Image.fromarray(
        gradient((S, S), spec["mark"][:3], spec["accent"][:3], 180).astype(np.uint8)
    ).convert("RGBA")
    fill.putalpha(shape)
    im.alpha_composite(fill)


# --- the four --------------------------------------------------------------

SPECS: dict[str, dict] = {
    "rebar": {
        # Steel and a hot amber: a structural tool, and the one value it pulled
        # out of the grid is the only warm thing in the frame.
        "bg_top": (34, 32, 29),
        "bg_bottom": (12, 12, 12),
        "glow_at": (0.24, 0.16),
        "glow_r": 0.62,
        "glow": (196, 128, 44),
        "glow_k": 0.55,
        "tile_top": (26, 25, 24),
        "tile_bottom": (14, 14, 14),
        "line": (128, 122, 112, 255),
        "dim": (128, 122, 112, 90),
        "mark": (233, 162, 60, 255),
        "draw": draw_rebar,
    },
    "veer": {
        # Cold marine blues, because the subject is a sky nobody has seen yet.
        "bg_top": (26, 60, 76),
        "bg_bottom": (8, 17, 24),
        "bg_angle": 172,
        "glow_at": (0.5, 0.1),
        "glow_r": 0.72,
        "glow": (60, 150, 176),
        "glow_k": 0.6,
        "tile_top": (17, 32, 42),
        "tile_bottom": (9, 15, 20),
        "mark": (240, 246, 248, 255),
        "accent": (86, 190, 214, 255),
        "dim": (150, 190, 205, 120),
        "draw": draw_veer,
    },
    "tessera": {
        # Fired clay on a dark dig-site umber.
        "bg_top": (58, 34, 25),
        "bg_bottom": (16, 11, 9),
        "glow_at": (0.28, 0.2),
        "glow_r": 0.66,
        "glow": (188, 92, 56),
        "glow_k": 0.6,
        "tile_top": (33, 22, 18),
        "tile_bottom": (16, 11, 9),
        "mark": (206, 112, 70, 255),
        "accent": (168, 84, 48, 255),
        "band": (238, 214, 186, 200),
        "draw": draw_tessera,
    },
    "bequest": {
        # Near-black with a cold green: a sealed thing, not a friendly one.
        "bg_top": (18, 34, 28),
        "bg_bottom": (7, 11, 10),
        "glow_at": (0.5, 0.86),
        "glow_r": 0.7,
        "glow": (48, 132, 98),
        "glow_k": 0.5,
        "tile_top": (16, 27, 23),
        "tile_bottom": (8, 13, 11),
        "mark": (226, 242, 233, 255),
        "accent": (108, 200, 156, 255),
        "draw": draw_bequest,
    },
}


def main() -> None:
    root = pathlib.Path("public/work")
    for slug, spec in SPECS.items():
        out = root / slug
        out.mkdir(parents=True, exist_ok=True)

        cover(spec).save(out / "cover.png")
        tile_art(ICON, spec, rounded=False).convert("RGB").save(out / "icon-1024.png")

        for p in (out / "cover.png", out / "icon-1024.png"):
            print(f"  {p}  {p.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
