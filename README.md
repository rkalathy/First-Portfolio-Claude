# Ramesh Kalathy — Portfolio Website

A modern, minimalistic, high-performance static portfolio built with plain HTML5, CSS3, and
vanilla JavaScript, hosted on GitHub Pages. See [CLAUDE.md](CLAUDE.md) for the full project
brief and [docs/architecture.md](docs/architecture.md) for structure decisions.

## Folder structure

```
/
├── index.html              # Single-page site: all sections, SEO meta, links styles/scripts
├── styles/
│   ├── variables.css       # Design tokens: colors, spacing, typography, dark-mode vars
│   ├── base.css            # Reset + base element styles + accessibility defaults
│   ├── layout.css          # .container, .section, grid helpers
│   ├── navigation.css      # Header / nav / mobile menu
│   ├── hero.css            # Hero section
│   ├── cards.css           # .card base + project/cert/achievement variants, .skill-tag
│   ├── buttons.css         # .btn, .btn-primary, .btn-outline
│   ├── footer.css          # Footer + social icons
│   └── responsive.css      # Tablet / mobile media queries
├── scripts/
│   ├── main.js              # Entry point (ES module), wires up the modules below
│   └── modules/
│       ├── navigation.js    # Mobile menu + smooth scroll
│       ├── scrollSpy.js      # Active nav-link highlighting
│       ├── lazyLoad.js       # IntersectionObserver image lazy-loading
│       ├── renderCards.js    # Renders data/*.json into card markup
│       └── utils.js          # Shared helpers (e.g. fetchJSON), no DOM logic
├── data/                    # JSON content consumed by renderCards.js
│   ├── projects.json
│   ├── skills.json
│   ├── certifications.json
│   ├── experience.json
│   ├── education.json
│   └── achievements.json
├── images/
│   ├── profile/             # Headshot, OG image
│   ├── projects/            # Project screenshots
│   └── icons/                # Favicon, badges, social icons
├── assets/
│   └── fonts/                 # Only used if self-hosting fonts instead of Google Fonts CDN
├── resume/                   # Downloadable resume (PDF)
├── docs/                     # Architecture notes, content-writing guidelines
├── temp/                     # Scratch/drafts — git-ignored, never linked from index.html
├── robots.txt
├── sitemap.xml
├── .nojekyll                 # Tells GitHub Pages to skip Jekyll processing
└── .gitignore
```

## Local development

No build step required. Serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment (GitHub Pages)

1. Push this repository to GitHub.
2. In the repo settings, open **Pages**.
3. Set **Source** to the `main` branch, root (`/`) folder.
4. Save — GitHub publishes to `https://<username>.github.io/<repo>/` (or
   `https://<username>.github.io/` if the repo is named `<username>.github.io`).
5. Update `index.html`'s canonical/OG URLs, `robots.txt`, and `sitemap.xml` with the final URL.
6. Optional: add a custom domain via a `CNAME` file at the repo root and configure DNS.

## Status

Folder structure and skeleton scaffolding only — section content is built incrementally,
one section at a time, per the workflow in `CLAUDE.md`.
