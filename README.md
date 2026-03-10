# The Comms Collective — Website

Production-ready static website for The Comms Collective, a Brussels-based communications collective. Editorial design, mobile-first, with events and resources loaded from JSON so non-technical editors can update content without touching HTML.

---

## Project structure

```
commscollective/
├── index.html          # Home (hero, intro, events/resources highlights, team, CTA)
├── about.html          # About (story, mission, values)
├── events.html         # Events (loaded from data/events.json)
├── resources.html      # Resources (loaded from data/resources.json)
├── team.html           # Team grid (loaded from data/team.json)
├── contact.html        # Contact form (FormSubmit → ccbxl@gmail.com)
├── .nojekyll           # Tells GitHub Pages to serve files as-is
├── README.md
├── css/
│   └── styles.css      # Global editorial styles
├── js/
│   ├── main.js         # Mobile nav toggle
│   ├── events.js       # Load and render events
│   ├── resources.js    # Load and render resources
│   ├── team.js         # Load and render team grid
│   └── home-highlights.js  # Home page event/resource previews
├── data/
│   ├── events.json     # Event list (edit this to update events)
│   ├── resources.json  # Resource list (edit this to update resources)
│   └── team.json       # Team members (names, roles, bios, bio page links)
├── team/               # Individual team bio pages
│   ├── camila.html
│   ├── anna.html
│   └── sophie.html
└── images/
    └── team/           # Team photos (optional; place camila.jpg, anna.jpg, etc.)
```

---

## Local development

**The site must be served over HTTP.** Browsers block `fetch()` to local files when you open HTML directly (`file://`), so events, resources, and team data won’t load.

Run a local server from the project folder, then open the URL in your browser:

```bash
# Option 1: npx (Node.js)
npx serve

# Option 2: Python 3
python3 -m http.server 8000
# Then open http://localhost:8000
```

If you open the site via `file://`, the pages will show a short message explaining this and how to fix it.

---

## Updating content (no code required)

### Events

Edit **`data/events.json`**. Each event has:

- `title` — Event name  
- `date` — ISO date (e.g. `"2026-05-12"`)  
- `location` — e.g. `"Brussels"`  
- `description` — Short description  
- `link` — Optional signup or more-info URL (leave `""` if none)

Add or remove objects in the array. Save, commit, and push; the site will show the new list after the next deploy.

### Resources

Edit **`data/resources.json`**. Each resource has:

- `title` — Resource name  
- `category` — e.g. `"Templates"`, `"Reading"`, `"Tools"`  
- `description` — Short description  
- `link` — URL to the resource

Add or remove objects in the array. Save, commit, and push.

### Team

- **Grid on Home and Team page:** Edit **`data/team.json`**. Each member has `slug`, `name`, `role`, `bio`, `image` (path under `images/team/`), and `bioPage` (e.g. `"team/camila.html"`).  
- **Individual bio pages:** Duplicate an existing file in **`team/`** (e.g. `team/camila.html`), rename it (e.g. `team/jane.html`), and update the name, role, and bio text. Then add (or update) that member in **`data/team.json`** with the correct `bioPage` and optional `image`.

### Team photos

Place images in **`images/team/`** and use the same filenames as in `team.json` (e.g. `camila.jpg`, `anna.jpg`). If an image is missing, the site shows an initial placeholder.

---

## Contact form

The form on **Contact** submits to **FormSubmit** (`https://formsubmit.co/ccbxl@gmail.com`). Submissions are sent to **ccbxl@gmail.com**. No backend or server required.

**First time only:** FormSubmit may send a one-time confirmation email to that address; confirm it to activate. No account needed.

---

## Deployment

### GitHub Pages

1. Push the project to a GitHub repository.  
2. In the repo: **Settings → Pages**.  
3. **Source:** Deploy from a branch.  
4. **Branch:** `main` (or your default branch). **Folder:** `/ (root)`.  
5. Save. The site will be at `https://<username>.github.io/<repo>/`.  
6. Optional: add a custom domain under **Pages** settings.

No build step. The site is static HTML, CSS, and JS; GitHub serves the files as-is (`.nojekyll` ensures Jekyll doesn’t process the repo).

### Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create project** → **Connect to Git**.  
2. Select the repository.  
3. **Build settings:**  
   - Build command: leave empty (or “None”).  
   - Build output directory: `/` (root).  
4. Deploy. The site will be at `https://<project>.pages.dev`.  
5. Optional: add a custom domain in the project settings.

---

## Tech stack

- **HTML** — Semantic, accessible markup.  
- **CSS** — One stylesheet (`css/styles.css`): variables, typography, layout, responsive (mobile-first), collapsible nav.  
- **JavaScript** — Minimal: nav toggle, and fetching/rendering of `events.json`, `resources.json`, and `team.json`. No frameworks.  
- **Fonts** — Playfair Display (headlines), Inter (body), loaded from Google Fonts.  
- **Colors** — Off-white `#F6F6F3`, navy text `#1B2230`, secondary text `#555`, thin dividers.

The site is static, fast, and works without JavaScript for core content (only events, resources, and team grids need JS to populate).
