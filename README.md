# The Comms Collective — Website

A clean, minimalist static website for The Comms Collective—a Brussels-based network for communications professionals. Editorial design, mobile-first, with events and resources loaded from JSON. No backend, no database; deploy to GitHub Pages or Cloudflare Pages.

---

## Project structure

```
commscollective/
├── index.html          # Home (hero, Who We Are, events/resources preview, core members, CTA)
├── about.html          # About / Who We Are
├── events.html         # Events (loaded from data/events.json)
├── resources.html      # Resources (loaded from data/resources.json)
├── calendar.html       # Brussels key dates (loaded from data/calendar.json)
├── team.html           # Team grid (loaded from data/team.json)
├── contact.html        # Contact / Join (FormSubmit → ccbxl@gmail.com)
├── .nojekyll           # Tells GitHub Pages to serve files as-is
├── README.md
├── css/
│   └── styles.css      # Global editorial styles
├── js/
│   ├── main.js         # Mobile nav toggle
│   ├── events.js       # Load and render events
│   ├── resources.js    # Load and render resources
│   ├── calendar.js     # Load and render key dates
│   ├── team.js         # Load and render team grid
│   └── home-highlights.js  # Home page event/resource previews
├── data/
│   ├── events.json     # Event list (edit to update events)
│   ├── resources.json  # Resource list (edit to update resources)
│   ├── calendar.json   # Brussels/EU key dates (holidays, plenary, etc.)
│   └── team.json       # Team members (names, roles, bios, bio page links)
├── team/               # Individual team profile pages
│   ├── camilla.html
│   ├── celeste.html
│   ├── paula.html
│   ├── eleanor.html
│   └── simone.html
└── images/
    ├── logo.png        # Site logo (header + hero)
    └── team/           # Team photos (optional: camilla.jpg, celeste.jpg, etc.)
```

---

## Logo, favicon & SEO

- **Logo:** Place your logo at `images/logo.png`. It appears in the header on every page and in the hero on the home page. The header logo is constrained by CSS height (2rem); the hero logo scales with viewport.
- **Favicon:** `favicon.svg` is a simple “CC” mark used as the favicon. Browsers that prefer PNG use `images/logo.png`. Apple touch icon also uses the logo.
- **SEO:** Every page has a unique `<title>`, `<meta name="description">`, canonical URL, Open Graph tags, and Twitter Card tags. The home page includes JSON-LD `Organization` schema.
- **Production URL:** All canonical URLs, `og:url`, `og:image`, `twitter:image`, and the JSON-LD `url`/`logo` use `https://commscollective.org`. When you deploy, replace `commscollective.org` with your real domain (e.g. `yourusername.github.io/commscollective` or your custom domain) in each HTML file, and in `robots.txt` and `sitemap.xml`, or do a find-and-replace across the project.

---

## Local development

**The site must be served over HTTP.** Browsers block `fetch()` when you open HTML via `file://`, so events, resources, and team data won’t load.

Run a local server from the project folder:

```bash
# Option 1: npx (Node.js)
npx serve

# Option 2: Python 3
python3 -m http.server 8000
# Then open http://localhost:8000
```

If you open the site via `file://`, the pages show a short message explaining this and how to fix it.

---

## Updating content

### Events

Edit **`data/events.json`**. Each event: `title`, `date` (ISO e.g. `"2026-05-12"`), `location`, `description`, `link` (optional URL).

### Resources

Edit **`data/resources.json`**. Each resource: `title`, `category`, `description`, `link`.

### Calendar (Brussels key dates)

Edit **`data/calendar.json`**. The `dates` array holds objects with `date` (ISO `YYYY-MM-DD`) and `label`. Used on the Calendar page and linked from Resources as “Brussels Comms Calendar”.

### Team

- **Grid:** Edit **`data/team.json`** — `slug`, `name`, `role`, `bio`, `image`, `bioPage` (e.g. `"team/camilla.html"`).
- **Profile pages:** Duplicate a file in **`team/`** (e.g. `team/camilla.html`), rename, update name/role/bio, then add the member in `team.json` with the correct `bioPage`.

### Team photos

Place images in **`images/team/`** with filenames matching `team.json` (e.g. `camilla.jpg`). If missing, an initial placeholder is shown.

---

## Contact form

The Contact page form uses **FormSubmit** (`https://formsubmit.co/ccbxl@gmail.com`). Submissions go to **ccbxl@gmail.com**. No backend required. Confirm the one-time FormSubmit email to that address when first using it.

---

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In the repo go to **Settings → Pages**.
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main` (or your default branch).
   - **Folder:** `/ (root)`.
4. Save. The site will be at `https://<username>.github.io/<repo>/`.
5. Optional: set a custom domain under **Pages** settings.

No build step. The site is static HTML, CSS, and JS; GitHub serves the files as-is. The `.nojekyll` file ensures Jekyll does not process the repo.

### Deploy to Cloudflare Pages

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create project** → **Connect to Git**.
2. Select the repository.
3. **Build:** Build command empty; **Build output directory:** `/` (root).
4. Deploy. Site at `https://<project>.pages.dev`; you can add a custom domain.

---

## Tech stack

- **HTML** — Semantic, accessible markup.
- **CSS** — Single stylesheet: off-white `#F6F6F3`, navy `#1B2230`, Playfair Display + Inter, responsive, minimal buttons.
- **JavaScript** — Nav toggle; fetch and render from `events.json`, `resources.json`, `team.json`. No frameworks.
- **Hosting** — Static only; GitHub Pages or Cloudflare Pages.
