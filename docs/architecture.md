# Architecture Notes

## Stack
Static HTML5 / CSS3 / vanilla ES6 — no build step, no framework. Deployed as-is via GitHub Pages.

## Structure decisions

- **CSS is split into partials** (`styles/variables.css`, `base.css`, `layout.css`, `navigation.css`,
  `hero.css`, `cards.css`, `buttons.css`, `footer.css`, `responsive.css`) linked individually from
  `index.html` in cascade order. No `@import` (avoids sequential render-blocking downloads).
- **JavaScript is split into ES6 modules** under `scripts/modules/`, loaded via `scripts/main.js`
  (`<script type="module">`). DOM-manipulation modules (`navigation.js`, `scrollSpy.js`,
  `lazyLoad.js`, `renderCards.js`) are kept separate from shared helpers (`utils.js`).
- **Repeatable content is data-driven.** Projects, certifications, experience, education, and
  achievements live in `data/*.json` and are rendered into `.card` markup by `renderCards.js`,
  instead of being hardcoded per entry in `index.html`.
- **Contact section uses a `mailto:` link + social icons.** GitHub Pages has no backend, so no
  form submission is wired up. A third-party form service (e.g. Formspree) can be swapped in later
  without changing the folder structure.
- **Dark mode is designed but not enabled.** `styles/variables.css` defines a
  `[data-theme="dark"]` token block; no toggle control exists yet.

## Page model
Single `index.html` containing all 14 sections from `CLAUDE.md`, navigated via anchor links and
smooth scroll. No separate routed pages; project cards link out to external demo/repo URLs rather
than having dedicated detail pages.

## Build order (per CLAUDE.md's "one section at a time" workflow)
1. Navigation + Hero
2. About / Summary
3. Skills (Technical / AI / Leadership)
4. Projects
5. Certifications
6. Experience / Education timelines
7. Achievements
8. Blog (optional — only if content exists)
9. Contact
10. Footer
11. Dark mode toggle (stretch)
