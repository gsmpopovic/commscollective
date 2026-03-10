# The Comms Collective — Website

Static website for The Comms Collective (Brussels). **Content is separated from layout:** events, resources, team, and calendar are stored in **JSON files** so non-technical users can update the site without editing HTML. No backend, no frameworks; deploy to GitHub Pages or Cloudflare Pages for free.

---

## Build (Vite + HTML partials)

The site uses **Vite** as a tiny static builder: HTML is processed with **EJS** at build time so shared chunks (header, footer) live in **partials**. No React, no runtime—just static output.

```bash
npm install
npm run build
```

Output is in **`dist/`**: plain HTML, CSS, JS, and assets. Deploy `dist/` to Netlify, Vercel, Cloudflare Pages, or GitHub Pages.

- **Dev:** `npm run dev` — Vite dev server with EJS partials applied.
- **Preview build:** `npm run preview` — serves `dist/` locally.

**Don’t open `index.html` (or any page) directly in the browser** (e.g. via `file://`). The HTML files are EJS templates; partials and variables are only processed when you run the dev server or build. Use `npm run dev` and open **http://localhost:5173** to view the site.

### Partials

- **`partials/header.html`** — Skip link, logo, nav (uses `basePath` and `currentPage`).
- **`partials/footer.html`** — Brand, nav links, email.

Pages include them with `<%- include(partialPath + '/header.html') %>`. Root pages use `partials/`, team pages use `../partials/`; the build injects `basePath` and `currentPage` so links and `aria-current` stay correct.

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
├── partials/
│   ├── header.html        ← Shared header (nav, logo)
│   ├── footer.html        ← Shared footer
│   └── layout.html        ← Optional base layout (reference)
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── vite.config.js         ← Vite + EJS HTML plugin
├── package.json
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

## Deploy to GitHub Pages (or elsewhere)

**Option A — Deploy the built output**

1. Run `npm run build`. The static site is in **`dist/`**.
2. Deploy `dist/` to your host (e.g. GitHub Pages: use a branch or Action that builds and publishes `dist/`).

**Option B — Build on the host**

If your host supports a build step (Netlify, Vercel, Cloudflare Pages):

- **Build command:** `npm run build`
- **Publish directory:** `dist`

After deployment, edit the JSON files in `data/`, commit, and push; the host will rebuild and redeploy.

Full details and Cloudflare Pages: **`DEPLOY.md`**.

---

## Local development

From the project root:

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**. Vite serves the site and applies EJS partials on the fly.

To test the built site: `npm run build` then `npm run preview` and open the URL shown (e.g. http://localhost:4173).

---

## Design

- **Background:** #F6F6F3  
- **Text:** #1B2230  
- **Fonts:** Playfair Display (headlines), Inter (body)  
- **Layout:** Mobile-first, responsive, collapsible nav, inverted footer, subtle hover states  

---

## Contact form

The contact page form posts to **FormSubmit** (`https://formsubmit.co/ccbxl@gmail.com`). Submissions go to **ccbxl@gmail.com**. No backend required; confirm the one-time FormSubmit email to that address when first using it.
