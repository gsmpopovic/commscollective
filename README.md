# The Comms Collective — Website

Static website for The Comms Collective (Brussels). **Content is separated from layout:** events, resources, and team are stored in **JSON files** so non-technical users can update the site without editing HTML. No backend, no frameworks; deploy to GitHub Pages or Cloudflare Pages for free.

---

## Refactored project structure

The live site lives in the **`site`** folder:

```
site/
├── index.html
├── about.html
├── events.html
├── resources.html
├── team.html
├── contact.html
├── .nojekyll
├── CONTENT.md           ← How to edit content (JSON)
├── css/
│   └── styles.css
├── js/
│   ├── main.js          ← Mobile nav
│   ├── events.js        ← Loads data/events.json
│   ├── resources.js     ← Loads data/resources.json
│   └── team.js          ← Loads data/team.json
├── data/
│   ├── events.json      ← Edit events here
│   ├── resources.json   ← Edit resources here
│   └── team.json        ← Edit team members here
├── images/
│   └── team/            ← Team photos (optional)
└── team/                ← Profile pages (camilla.html, etc.)
```

---

## Editing content (no HTML)

All editable content is in **`site/data/`**:

- **Events** → `site/data/events.json` (title, date, location, description, link)
- **Resources** → `site/data/resources.json` (title, category, description, link)
- **Team** → `site/data/team.json` (name, role, photo, shortBio, fullBio, profilePage)

See **`site/CONTENT.md`** for field descriptions, examples, and step-by-step instructions.

---

## Deploy to GitHub Pages

1. Push the repo (including the `site/` folder) to GitHub.
2. **Settings → Pages** → **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main` (or your default).
   - **Folder:** **`site`** (so GitHub serves the contents of `site/` at your Pages URL).
3. Save. The site will be at `https://<username>.github.io/<repo>/`.

No build step. After deployment, edit the JSON files in `site/data/`, commit, and push; Pages will redeploy automatically.

Full details and a Cloudflare Pages option: **`DEPLOY.md`**.

---

## Local development

The site must be served over HTTP (browsers block `fetch()` from `file://`). From the project root:

```bash
# Serve the site folder
npx serve site
# Then open http://localhost:3000
```

Or from inside `site/`:

```bash
cd site && npx serve
```

---

## Design

- **Background:** #F6F6F3  
- **Text:** #1B2230  
- **Fonts:** Playfair Display (headlines), Inter (body)  
- **Layout:** Mobile-first, responsive, collapsible nav, subtle hover states  

---

## Contact form

The contact page form posts to **FormSubmit** (`https://formsubmit.co/ccbxl@gmail.com`). Submissions go to **ccbxl@gmail.com**. No backend required; confirm the one-time FormSubmit email to that address when first using it.
