# Brand source

`gasperohlab-logo.jpg` is the supplied master of the circuit-"G" monogram —
white line art on a charcoal field.

Nothing on the site consumes it directly. A JPEG has no transparency (the
charcoal block would sit on the paper page), cannot be recoloured to the brand
accent, and turns to mush at favicon sizes. Two scripts derive everything from
it instead:

    python3 scripts/trace-logo.py     # → public/logo.svg + src/components/Logo.tsx
    python3 scripts/build-icons.py    # → public/icons/*, src/app/favicon.ico

Run them in that order; the icon build reads `public/logo.svg`.

`src/components/Logo.tsx` is generated — re-run the trace rather than editing
its path data by hand.
