# Deploy to GitHub Pages

The site is **built** with Vite (EJS partials, assets); you deploy the **output** (`dist/`), not the repo root.

---

## GitHub Pages (recommended)

### One-time setup

1. Push the project to a GitHub repository (e.g. `yourname/commscollective`).

2. In the repo go to **Settings → Pages**.

3. Under **Build and deployment**:
   - **Source:** **GitHub Actions** (not “Deploy from a branch”).

4. Save. You do **not** choose a branch or folder here; the workflow deploys for you.

### What happens on each push

- Pushing to `main` runs the **Deploy to GitHub Pages** workflow (see `.github/workflows/deploy-pages.yml`).
- The workflow runs `npm ci` and `npm run build`, then deploys the **`dist/`** folder to GitHub Pages.
- Your site is available at:
  - **Project site:** `https://<username>.github.io/<repo>/`  
    Example: `https://gsmpopovic.github.io/commscollective/`

### If you use a different default branch

Edit `.github/workflows/deploy-pages.yml` and change `branches: [main]` to your branch (e.g. `master`).

### Optional: custom domain

In **Settings → Pages**, add your custom domain and follow GitHub’s DNS instructions.

---

## Why not “Deploy from a branch”?

- The **source** in the repo is EJS templates; the browser needs **built** HTML and assets.
- The workflow runs `npm run build`, so `dist/` contains plain HTML, CSS, and JS with no EJS. That’s what gets deployed.
- You never commit `dist/`; the Action builds it and uploads it to GitHub Pages.

---

## After deployment

- **Content:** Edit JSON in `data/`, commit, and push. The Action will rebuild and redeploy.
- **Code/partials:** Change HTML, CSS, or JS, commit, and push; same thing.

---

## Cloudflare Pages (alternative)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com), go to **Pages → Create project → Connect to Git**.
2. Select your repository.
3. **Build settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (leave default)
4. Deploy. The site will be at `https://<project>.pages.dev`; you can add a custom domain.

For a project site under a path (e.g. `yourname.github.io/commscollective`), set **Environment variable** in Vite/Cloudflare: `BASE_PATH=commscollective` so asset URLs use that base path (see `vite.config.js`).
