# Comms Collective — Website

Static website for the Comms Collective (Brussels), live at **https://commscollective.xyz**.

The site is plain HTML/CSS/JS built with **Vite** and deployed to **GitHub Pages**. Content (events, resources, team, calendar dates) lives in **JSON files** under `data/`, and editing is done through a **Git-based CMS at `/admin/`** — non-technical editors can sign in, make changes through a form UI, and the site updates automatically. No backend, no database, no monthly platform fees.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173 — live dev server
npm run build    # production build → dist/
npm run preview  # serve the built site locally
```

---

## Editing content

### The easy way — `/admin/`
1. Visit https://commscollective.xyz/admin/.
2. Sign in with your GitHub account.
3. Pick a section, edit the fields, hit Save.
4. The site updates within ~1 minute (GitHub Pages rebuild).

See **`CONTENT.md`** for field reference.

### The fallback way — edit JSON directly
Content files in `data/`:
- `events.json` — flagship events, networking meet-ups, Coffee Corners
- `resources.json` — trainings, templates, vendor hub, reading list
- `team.json` — core team
- `calendar.json` — Brussels/EU institutional dates

Each file uses a wrapper object (e.g. `{ "events": [ … ] }`).

---

## Project layout

```
/
├── index.html, about.html, events.html, …    # site pages
├── admin/
│   ├── index.html                            # Sveltia CMS shell
│   └── config.yml                            # CMS collections + fields
├── data/
│   ├── events.json
│   ├── resources.json
│   ├── team.json
│   └── calendar.json
├── css/styles.css
├── js/main.js                                # mobile nav + events loader
├── images/
├── scripts/
│   └── oauth-worker.js                       # Cloudflare Worker for CMS auth
├── public/, dist/                            # input / build output
├── vite.config.js
├── package.json
├── CONTENT.md                                # content editor reference
└── DEPLOY.md                                 # deployment notes
```

---

## The CMS setup (Sveltia + GitHub OAuth)

The `/admin/` panel is **Sveltia CMS** — a Git-based CMS that commits content edits directly to this repo via the GitHub API. Authentication uses **GitHub OAuth**, brokered by a tiny **Cloudflare Worker** (free).

### One-time setup

1. **GitHub OAuth App**
   - Go to https://github.com/settings/developers → New OAuth App.
   - Homepage URL: `https://commscollective.xyz`
   - Authorization callback URL: `https://<your-worker>.workers.dev/callback` (fill after step 2).
   - Note the **Client ID** and generate a **Client Secret**.

2. **Cloudflare Worker**
   - Create a Cloudflare account (free) → Workers & Pages → Create.
   - Paste the contents of `scripts/oauth-worker.js`.
   - Under **Settings → Variables → Secrets**, add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
   - Deploy. Note the worker URL.
   - Go back to the GitHub OAuth App and update the callback URL to `<worker-url>/callback`.

3. **Wire the CMS to the Worker**
   - In `admin/config.yml`, set `backend.base_url` to your worker URL.
   - Commit + push.

### Adding editors
- Editors need a GitHub account (free, ~2 minutes to create).
- Add them as a **collaborator** on the repo (Settings → Collaborators).
- They visit `/admin/`, sign in with GitHub, and start editing.

Every save in the CMS = a git commit on `main`, so there's full audit trail and rollback for free.

---

## Deploy

The site auto-deploys from `main` to GitHub Pages via the `.github/workflows/` action. The custom domain `commscollective.xyz` is configured via `CNAME`.

See **`DEPLOY.md`** for the full deployment notes.

---

## Tech notes

- **Build:** Vite 6 with a small custom plugin that copies `images/`, `data/`, `js/`, and `admin/config.yml` into `dist/`.
- **Base path:** assets use relative URLs (`./`) so the same build works on both `commscollective.xyz/` and `gsmpopovic.github.io/commscollective/`.
- **Events page:** `events.html` has empty `<ul data-events-list="…">` containers; `js/main.js` fetches `data/events.json` and renders cards filtered by `type` (`flagship`, `networking`, `coffee-corner`).
- **Design:** Inter (body) + Playfair Display (headlines); background `#F6F6F3`; text `#1B2230`; mobile-first.

---

## Contact

`commscollectivebxl@gmail.com`
