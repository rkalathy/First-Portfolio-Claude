# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A static HTML/CSS/vanilla-JS personal portfolio site for Ramesh Kalathy (Data & AI
leader). No build step, no framework, no package.json — open `index.html` directly
or serve the folder with any static file server.

Deployed via GitHub Pages from the `main` branch at:
https://rkalathy.github.io/First-Portfolio-Claude/

## Architecture

- `index.html` — single page, one `<section>` per content area (about, summary,
  experience, skills, projects, certifications, education, achievements, blog,
  contact). Sections that render from data have an empty container element with a
  `<!-- Rendered from data/X.json by renderCards.js -->` comment marking where JS
  injects content.
- `data/*.json` — content lives here, not in HTML. Each file maps 1:1 to a render
  function in `scripts/modules/renderCards.js` (e.g. `data/projects.json` →
  `renderProjects()` → `#projects-grid`).
- `scripts/modules/renderCards.js` — fetches each JSON file and renders it into its
  container. Every render function wraps its fetch in try/catch and falls back to
  a `.fetch-error` message on failure — never let a bad fetch break the rest of the
  page.
- `scripts/modules/nav.js` — mobile nav toggle (`.is-open` class, synced with
  `aria-expanded`).
- `scripts/modules/footer.js` — sets the copyright year in `#footer-year`.
- `scripts/main.js` — entry point, wires the above into `DOMContentLoaded`.
- `styles/` — one file per concern (`base.css` has design tokens in `:root`,
  `layout.css`, `cards.css`, `summary.css`, `contact.css`, `footer.css`,
  `responsive.css`). All colors/spacing/radii should reference the custom
  properties in `base.css`, not hardcoded values.
- `images/profile/profile.svg` — generated "RK" initials avatar (gradient
  `#1a4d8f`→`#2e86de`). Not a photo. See "Content conventions" below before
  changing this.
- `images/projects/*.svg` — flat-color 340×191 badge images per project.

## Content conventions

- **Bracketed placeholders**: unverifiable/real-world facts I can't confirm
  (past employer names, certification names/dates, education institution,
  phone, location, social media URLs, specific metrics like `[XX]%`) are wrapped
  in `[...]`. Before treating the site as final, grep for these and replace with
  real values:
  ```
  grep -rn "\[" data/ index.html
  ```
- **No fabricated photos**: do not generate a photorealistic "photo" of Ramesh.
  This site represents a real, named person — use the initials-avatar SVG
  approach (or a real photo the user supplies) instead of an AI-generated fake
  face.
- New JSON entries should always render safely even with special characters —
  `renderCards.js` escapes all interpolated text via `escapeHTML()`. Don't
  bypass it with raw `innerHTML` of untrusted content.

## Making changes

- Content-only changes (new project, new blog post, updated skill) → edit the
  relevant `data/*.json` file. No HTML/JS changes needed unless the shape of the
  data changes.
- New section → add a container `<div id="...">`/`<ul id="...">` in `index.html`,
  a matching JSON file in `data/`, a render function + template function in
  `renderCards.js`, call it from the exported `renderCards()`, and style it in
  the appropriate `styles/*.css` file.
- Responsive breakpoints used throughout: 1024px (tablet) and 640px (mobile), plus
  a 420px fix in `responsive.css` for the nav logo at very small widths.

## Verifying changes

There's no test suite. Verify manually:
1. Serve locally, e.g. `python3 -m http.server 8000` from this directory.
2. Load in a browser (or headless via Playwright) and confirm: zero console
   errors, zero failed network requests, and that each data-driven section
   renders the expected number of cards.
3. Check both a wide viewport and ~375px mobile width for layout breaks,
   especially around the nav toggle and card grids.

## Deployment

This repo deploys via GitHub Pages (`main` branch, root). Pushing to `main`
triggers a rebuild automatically — no CI config needed. To check build status:
```
gh api repos/rkalathy/First-Portfolio-Claude/pages --jq '.status'
```
The repo must stay **public** — GitHub Pages on private repos requires a paid
plan and will silently fail to enable otherwise.
