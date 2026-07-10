# My Skills Demo — Ramesh Kalathy Portfolio

Personal professional portfolio website for Ramesh Kalathy (Manager, Data Services), built as a static site and deployed via GitHub Pages. It showcases experience, projects, technical/AI/leadership skills, certifications, and achievements for an audience of recruiters, hiring managers, customers, and the engineering community.

## Key Features

- Single-page layout with smooth-scrolling navigation across 13 sections: Hero, About, Summary, Skills (Technical / AI / Leadership), Projects, Certifications, Experience, Education, Achievements, Blog, and Contact
- Data-driven content — projects, certifications, experience, education, and achievements are stored as JSON (`data/*.json`) and rendered into card markup at runtime instead of being hardcoded in HTML
- Responsive design built with Flexbox/Grid, targeting desktop, tablet, and mobile
- SEO-ready `<head>` (canonical URL, Open Graph tags, meta description, favicon) plus `robots.txt` and `sitemap.xml`
- Dark mode groundwork (`[data-theme="dark"]` CSS variables) defined but not yet wired to a toggle
- Accessible markup: skip link, ARIA attributes on the nav toggle, semantic sectioning

## Tech Stack

- HTML5, CSS3, vanilla ES6 JavaScript — no framework, no build step
- CSS split into cascade-ordered partials under `styles/` (variables, base, layout, navigation, hero, about, summary, skills, cards, experience, buttons, contact, footer, responsive)
- JavaScript split into ES6 modules under `scripts/modules/`, loaded via `scripts/main.js` (`<script type="module">`)
- Google Fonts (Inter)
- Deployed as-is on GitHub Pages (`.nojekyll` included)

## Project Structure

```
.
├── index.html              # single-page site, all sections
├── styles/                 # CSS partials, loaded in cascade order
├── scripts/
│   ├── main.js              # entry point
│   └── modules/             # navigation, scrollSpy, lazyLoad, renderCards, footer, utils
├── data/                    # JSON content: projects, certifications, experience,
│                             #   education, achievements, skills, blog
├── images/                  # icons, profile, project images
├── assets/fonts/            # local font assets
├── docs/architecture.md     # architecture notes and build-order log
├── resume/                  # resume file(s)
├── robots.txt, sitemap.xml  # SEO
└── CLAUDE.md                # project brief and coding conventions
```

See `docs/architecture.md` for the reasoning behind these structural decisions.

## Setup

No build step or package manager is required — this is a static site.

```bash
git clone https://github.com/rkalathy/First-Portfolio-Claude.git
cd "My Skills Demo"
```

## Usage

Serve the directory with any static file server and open it in a browser, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or simply open `index.html` directly in a browser.

Deployment is via GitHub Pages from this repository (canonical URL: `https://rkalathy.github.io/First-Portfolio-Claude/`).
