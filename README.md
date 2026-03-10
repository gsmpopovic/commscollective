# The Comms Collective — Website

Minimal static website for The Comms Collective, a small communications collective based in Brussels.

---

## 1. Architecture recommendation: **Static site (no CMS)**

- **Why:** Only a few pages, rare updates, no user accounts or dynamic content. A static site is the simplest, cheapest, and most maintainable option.
- **No backend:** No server, database, or CMS to run or pay for. Edit HTML (or markdown if you add a simple build step later) and redeploy.
- **Avoid WordPress:** Adds hosting cost, updates, and complexity you don’t need for this scope.

---

## 2. Cheapest hosting: **GitHub Pages or Cloudflare Pages (both free)**

| Option            | Cost   | Pros                                      | Cons                    |
|-------------------|--------|-------------------------------------------|-------------------------|
| **GitHub Pages**  | Free   | Integrated with Git, easy deploy from repo | 100GB bandwidth/month   |
| **Cloudflare Pages** | Free | Unlimited bandwidth, global CDN, fast     | Slightly more setup     |

**Recommendation:** Start with **GitHub Pages** — push to a repo, enable Pages in repo Settings → Pages (source: main branch, folder: `/` or `root`). No build step: point to the folder that contains `index.html`. For more traffic or performance, move to **Cloudflare Pages** (connect repo, same “static output” setup).

---

## 3. Project structure

```
commscollective/
├── index.html          # Home / landing
├── events.html         # Events
├── resources.html      # Resources
├── about.html          # About
├── contact.html        # Contact / Join
├── styles.css          # Global styles
├── README.md           # This file
└── (optional later: js/ for contact form or small scripts)
```

No build step. No `node_modules`. Just HTML + CSS.

---

## 4. Fonts and color palette

**Fonts (Google Fonts, loaded in HTML):**

- **Headlines (serif, editorial):** [Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville) — classic, readable, newspaper-like.
- **Body (rounded sans-serif):** [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) — soft, rounded, highly readable.

**Colors (in `styles.css`):**

- **Background:** `#f8f6f3` (off-white, warm)
- **Text:** `#0d1b2a` (very dark navy)
- **Muted/secondary:** `#3d5a73`
- **Accent (links, subtle):** `#1d3557` / hover slightly darker
- **Borders/dividers:** `#e8e4df`

---

## 5. Handling updates and contact

- **Events:** Edit `events.html` directly. Add/remove event blocks (same HTML structure). Optional later: keep a simple `events.json` and a small script to render them, or use a static site generator (e.g. Eleventy) that reads markdown/JSON — only if you outgrow manual edits.
- **Resources:** Same idea — edit `resources.html`; add/remove resource entries. No database.
- **Contact form:** Use a form endpoint that sends you an email and requires no backend on your side:
  - **[Formspree](https://formspree.io)** (free tier): set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` on the form. Formspree sends submissions to your email. Easiest.
  - **Netlify Forms** or **Cloudflare Workers** are alternatives if you host on those platforms.

Replace the Formspree placeholder in `contact.html` with your Formspree form ID once you create it.

---

## 6. Deploy

### GitHub Pages

1. Create a repo (e.g. `commscollective` or `commscollective.github.io`).
2. Push this folder to the repo.
3. **Settings → Pages → Source:** Deploy from branch `main`, folder **`/ (root)`**.
4. Site will be at `https://<username>.github.io/<repo>/` or `https://commscollective.github.io` if repo is `commscollective.github.io`.

### Cloudflare Pages

1. Sign in to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create project → Connect to Git.
2. Select the repo; build settings: **None** (static), output directory: **`/`** or the folder that contains `index.html`.
3. Deploy. You get a `*.pages.dev` URL and can add a custom domain.

---

## Maintenance

- **Content:** Edit the relevant `.html` file, commit, push. The host redeploys automatically.
- **Styling:** All shared styles live in `styles.css`. Change colors/fonts there for site-wide updates.
- **New page:** Copy an existing page, adjust content and `<title>`, add a link in the nav in each page.

No frameworks, no build step, no backend. Fast, free, and easy to maintain.
