# The Comms Collective — Website

Static website for The Comms Collective (Brussels). **Content is separated from layout:** events, resources, team, and calendar are stored in **JSON files** so non-technical users can update the site without editing HTML. No backend, no frameworks; deploy to GitHub Pages or Cloudflare Pages for free.

---

## Project structure (root = site)

The website lives at the **repository root**. No `site/` subfolder.

```
/
├── index.html
├── about.html
├── events.html
├── resources.html
├── team.html
├── contact.html
├── calendar.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── .nojekyll              ← Tells GitHub Pages not to run Jekyll
├── CONTENT.md             ← How to edit content (JSON)
├── css/
│   └── styles.css
├── js/
│   ├── main.js            ← Mobile nav
│   ├── events.js          ← Loads data/events.json
│   ├── resources.js       ← Loads data/resources.json
│   ├── team.js            ← Loads data/team.json
│   ├── home-highlights.js  ← Home page events/resources preview
│   └── calendar.js        ← Calendar page
├── data/
│   ├── events.json        ← Edit events here
│   ├── resources.json     ← Edit resources here
│   ├── team.json          ← Edit team members here
│   └── calendar.json      ← Calendar / vet dates
├── images/
│   ├── logo.png
│   └── team/              ← Team photos (optional)
└── team/                  ← Profile pages (camilla.html, etc.)
```

---

## Editing content (no HTML)

All editable content is in **`data/`**:

- **Events** → `data/events.json` (title, date, location, description, link)
- **Resources** → `data/resources.json` (title, category, description, link)
- **Team** → `data/team.json` (name, role, photo, shortBio, fullBio, profilePage)
- **Calendar** → `data/calendar.json` (institutional dates)

See **`CONTENT.md`** for field descriptions, examples, and step-by-step instructions.

---

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. **Settings → Pages** → **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main` (or your default).
   - **Folder:** **`/ (root)`**.
3. Save. The site will be at `https://<username>.github.io/<repo>/`.

No build step. After deployment, edit the JSON files in `data/`, commit, and push; Pages will redeploy automatically.

Full details and Cloudflare Pages: **`DEPLOY.md`**.

---

## Local development

The site must be served over HTTP (browsers block `fetch()` from `file://`). From the project root:

```bash
npx serve
# Then open http://localhost:3000
```

Or: `python3 -m http.server 8000` then open `http://localhost:8000`.

---

## Design

- **Background:** #F6F6F3  
- **Text:** #1B2230  
- **Fonts:** Playfair Display (headlines), Inter (body)  
- **Layout:** Mobile-first, responsive, collapsible nav, inverted footer, subtle hover states  

---

## Contact form

The contact page form posts to **FormSubmit** (`https://formsubmit.co/ccbxl@gmail.com`). Submissions go to **ccbxl@gmail.com**. No backend required; confirm the one-time FormSubmit email to that address when first using it.
