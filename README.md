# First Portfolio — Claude

A static personal portfolio site for **Ramesh Kalathy**, Data & AI leader. Built with plain
HTML, CSS, and vanilla JavaScript — no framework, no build step, no dependencies.

**Live site:** https://rkalathy.github.io/First-Portfolio-Claude/

## Features

- Single-page layout: About, Professional Summary, Experience, Skills, Projects,
  Certifications, Education, Achievements, Blog, and Contact
- Content driven entirely by JSON files in [`data/`](data/) — update a JSON file to
  update the site, no HTML edits needed
- Responsive design with a mobile nav toggle (breakpoints at 1024px, 640px, 420px)
- Accessible: skip link, semantic landmarks, `aria-expanded` nav state
- Defensive rendering — each section fetches its own JSON and fails gracefully on
  its own if that fetch ever breaks, instead of taking down the whole page

## Project structure

```
index.html              Single-page markup, one <section> per topic
data/                    Content as JSON (experience, skills, projects, etc.)
scripts/
  main.js                Entry point
  modules/
    renderCards.js        Fetches data/*.json and renders each section
    nav.js                 Mobile nav toggle
    footer.js               Sets the copyright year
styles/
  base.css                Design tokens, reset, typography, buttons
  layout.css               Header, hero, about, experience timeline, skills
  cards.css                 Project/certification/achievement/blog cards
  summary.css                Professional summary section
  contact.css                  Contact section
  footer.css                     Footer
  responsive.css                  Breakpoints
images/                  Profile avatar (generated SVG) and project badge icons
```

## Running locally

No build tools required — just serve the folder statically:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Updating content

Edit the relevant file in [`data/`](data/) (e.g. `data/projects.json` for a new
project) and refresh the page — no rebuild step needed.

Some fields are still placeholders, wrapped in `[brackets]` (phone, location,
social links, older employer/certification details). Find them all with:

```bash
grep -rn "\[" data/ index.html
```

## Deployment

Deployed automatically via GitHub Pages from the `main` branch whenever changes
are pushed. See [`CLAUDE.md`](CLAUDE.md) for full architecture notes and
guidance on making changes.
