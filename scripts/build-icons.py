"""
Rasterise the app icons and favicon from the traced monogram.

Everything downstream of the mark — PWA icons, the maskable icon, favicon.ico
and the schema.org logo Google fetches — has to be a real bitmap at a known
size, so they are generated here rather than hand-exported. Re-run after any
change to public/logo.svg.

Run:  python3 scripts/build-icons.py
"""

from __future__ import annotations

import pathlib
import re

import io
import struct

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ACCENT = (196, 48, 42)
PAPER = (250, 249, 247)

# Supersample then downscale — these are hard-edged polygons, and drawing them
# at final size leaves visibly jagged diagonals on the octagon.
SS = 4


def load_path() -> tuple[float, float, list[list[tuple[float, float]]]]:
    svg = pathlib.Path("public/logo.svg").read_text()
    _, _, vw, vh = (float(v) for v in re.search(r'viewBox="([^"]+)"', svg).group(1).split())
    d = re.search(r'd="([^"]+)"', svg).group(1)
    rings = []
    for sub in d.split("Z"):
        sub = sub.strip().lstrip("M")
        if not sub:
            continue
        pts = [tuple(map(float, p.split(","))) for p in sub.replace("L", " ").split()]
        if len(pts) >= 3:
            rings.append(pts)
    return vw, vh, rings


def render_mask(size: int, coverage: float, bolden: float = 0.0) -> np.ndarray:
    """Alpha mask of the mark, centred in a `size` square at `coverage` height.

    `bolden` dilates the strokes by that many final-size pixels. The mark is
    ~3% stroke-to-width, so at 16px its lines land under half a pixel and grey
    out into a smudge; the small favicon entries are drawn with a heavier
    optical weight rather than downscaled from the master, which is what a type
    foundry would do for the same reason.
    """
    vw, vh, rings = load_path()
    S = size * SS
    scale = (S * coverage) / vh
    tx = (S - vw * scale) / 2
    ty = (S - vh * scale) / 2

    # Even-odd: XOR each subpath so enclosed counters stay open.
    acc = np.zeros((S, S), bool)
    for ring in rings:
        im = Image.new("1", (S, S), 0)
        ImageDraw.Draw(im).polygon(
            [(x * scale + tx, y * scale + ty) for x, y in ring], fill=1
        )
        acc ^= np.asarray(im, bool)

    img = Image.fromarray((acc * 255).astype(np.uint8))
    if bolden:
        k = int(round(bolden * SS))
        img = img.filter(ImageFilter.MaxFilter(2 * k + 1))
    return np.asarray(img.resize((size, size), Image.LANCZOS))


def tile(
    size: int, coverage: float, radius_frac: float | None, bolden: float = 0.0
) -> Image.Image:
    """Mark reversed out of a solid accent tile.

    Fine line art vanishes below ~24px, so every icon context that renders small
    — favicon, PWA, home screen — uses the mark as negative space in a filled
    field instead of as strokes on transparency.
    """
    alpha = render_mask(size, coverage, bolden)
    rgb = np.zeros((size, size, 3), np.uint8)
    rgb[:] = ACCENT
    a = (alpha / 255.0)[..., None]
    rgb = (rgb * (1 - a) + np.array(PAPER) * a).astype(np.uint8)

    img = Image.fromarray(rgb).convert("RGBA")
    if radius_frac:
        r = int(size * radius_frac)
        m = Image.new("L", (size * SS, size * SS), 0)
        ImageDraw.Draw(m).rounded_rectangle(
            [0, 0, size * SS - 1, size * SS - 1], radius=r * SS, fill=255
        )
        img.putalpha(m.resize((size, size), Image.LANCZOS))
    return img


def write_ico(path: str, images: list[Image.Image]) -> None:
    """Write a PNG-payload .ico so each size can carry its own artwork."""
    blobs = []
    for im in images:
        buf = io.BytesIO()
        im.save(buf, format="PNG")
        blobs.append(buf.getvalue())

    header = struct.pack("<HHH", 0, 1, len(blobs))
    offset = len(header) + 16 * len(blobs)
    entries, payload = b"", b""
    for im, blob in zip(images, blobs):
        w = 0 if im.width >= 256 else im.width
        h = 0 if im.height >= 256 else im.height
        entries += struct.pack("<BBBBHHII", w, h, 0, 0, 1, 32, len(blob), offset)
        offset += len(blob)
        payload += blob

    pathlib.Path(path).write_bytes(header + entries + payload)


def main() -> None:
    out = pathlib.Path("public/icons")
    out.mkdir(parents=True, exist_ok=True)

    # PWA icons. `any` is squared with a soft radius; `maskable` must be
    # full-bleed with the mark inside the safe area, because the platform crops
    # it to whatever shape it likes.
    tile(192, 0.60, 0.18).save(out / "icon-192.png")
    tile(512, 0.60, 0.18).save(out / "icon-512.png")
    tile(512, 0.42, None).save(out / "icon-maskable-512.png")

    # Apple touch icon: full-bleed square, iOS applies its own mask.
    tile(180, 0.60, None).convert("RGB").save(out / "apple-touch-icon.png")

    # Schema.org / Google. Wants a fetchable raster, comfortably over the 112px
    # minimum, on an opaque background.
    tile(512, 0.60, None).convert("RGB").save(out / "logo-512.png")

    # favicon.ico still carries the most weight in Google's search results.
    # Pillow's ICO writer downscales a single master, which is exactly wrong
    # here, so the container is written by hand with each entry drawn at its own
    # optical weight.
    write_ico(
        "src/app/favicon.ico",
        [
            # Weights picked by eye off a comparison grid: past ~0.2px of
            # dilation the counters close up and the G turns into a blob.
            tile(16, 0.68, 0.16, bolden=0.15),
            tile(32, 0.66, 0.16, bolden=0.10),
            tile(48, 0.64, 0.16, bolden=0.05),
            tile(64, 0.62, 0.16),
            tile(128, 0.62, 0.16),
            tile(256, 0.62, 0.16),
        ],
    )

    for p in sorted(out.glob("*.png")) + [pathlib.Path("src/app/favicon.ico")]:
        print(f"  {p}  {p.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
