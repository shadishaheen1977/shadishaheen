# Drop your files here

Everything on the site reads from `src/data/portfolio.ts`. Point any line in that
file at a local path inside this folder and the site picks it up automatically.

Suggested layout (create folders as needed):

```
assets/
├── characters/               # mascot PNGs — solid-black or transparent bg works best
│   ├── hero.png              # (ships with the repo)
│   ├── photographer.png
│   ├── businessman.png
│   └── thankyou.png
├── hero/
│   ├── reel.mp4              # desktop showreel  → media.hero.desktopVideo
│   └── reel-mobile.mp4       # mobile showreel   → media.hero.mobileVideo
├── photography/
│   ├── restaurants/01.jpg    # → media.photography.restaurants
│   ├── products/01.jpg       # → media.photography.products
│   └── cars_apartments/01.jpg# → media.photography.cars_apartments
├── video/
│   ├── reel01.mp4 + reel01.jpg (poster)
├── content/                  # creative concepts
├── social/                   # post covers
├── design/                   # branding shots
├── advertising/              # campaign covers
├── personal/                 # v1.mp4 v2.mp4 v3.mp4  (9:16 vertical)
└── YAZAN-Resume.pdf          # button in the footer downloads this (placeholder shipped)
```

If a referenced file doesn't exist, the site renders a labelled placeholder box
instead of breaking — so swap paths freely.
