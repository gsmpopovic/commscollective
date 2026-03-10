# Deploy to GitHub Pages

The website lives at the **repository root**. Deploy the root to GitHub Pages for a fully static, free-to-host site.

---

## GitHub Pages (recommended)

1. Push the project to a GitHub repository.

2. In the repo, go to **Settings → Pages**.

3. Under **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main` (or your default branch).
   - **Folder:** **`/ (root)`**.

4. Save. GitHub will deploy. The site will be at:
   - `https://<username>.github.io/<repo>/`

5. **(Optional)** Add a custom domain under **Pages** settings.

---

## After deployment

- **Content updates:** Edit the JSON files in `data/` (see `CONTENT.md`), commit, and push. GitHub Pages will redeploy automatically.
- **No build step:** The site is static HTML, CSS, and JavaScript. No npm build or static generator is required.
- **Contact form:** The form submits to FormSubmit and sends email to **ccbxl@gmail.com**. The first time you use it, FormSubmit may send a one-time confirmation email to that address; confirm it to activate.

---

## Cloudflare Pages (alternative)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com), go to **Pages → Create project → Connect to Git**.
2. Select your repository.
3. **Build settings:**
   - **Build command:** leave empty.
   - **Build output directory:** **`/`** (root).
4. Deploy. The site will be at `https://<project>.pages.dev`; you can add a custom domain.
