# Powering Intelligence — Mongolia’s Green Data Center Opportunities

Interactive, animated 14-slide deck (React + Vite) for the Ministry of Digital Development, Innovation and Communications.

- Slides 1–8: `Brochure.pptx` (natural advantage, policy & legal, benchmark, opportunity)
- Slides 9–13: `last 5.pptx` — Khushig Valley Free Economic Zone
- Slide 14: closing — Let’s build the future together

## Outputs

- `slides.html` — single self-contained file (images and fonts inlined)
- `slides.pdf` — 14 pages, 1920×1080

## Develop

```bash
npm i
npm run dev
```

Controls: ← → / Space to navigate, `G` slide overview, `F` fullscreen.

## Rebuild outputs

```bash
python3 scripts/build_standalone.py   # slides.html
python3 scripts/export_pdf.py         # slides.pdf (needs playwright + chromium)
```

Slide code: `src/app/deck/slides.tsx`, `src/app/deck/fez.tsx` · styles: `src/styles/deck.css`, `src/styles/fez.css`.
