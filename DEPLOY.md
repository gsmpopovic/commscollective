# Deploy to GitHub Pages

The live site lives in the **`site`** folder. Deploy that folder to GitHub Pages so the site is fully static and free to host.

---

## Option A: Deploy the `site` folder as the source

1. Push the project (including the `site/` folder) to a GitHub repository.

2. In the repo, go to **Settings → Pages**.

3. Under **Build and deployment**:
   - **Source:** Deploy from a branch.
   - **Branch:** `main` (or your default branch).
   - **Folder:** Select **`/ (root)`** if the whole repo is only the site, **or** choose **`site`** if the repo root contains other files and the website is in the `site` subfolder.

4. Save. GitHub will build and deploy. The site will be at:
   - `https://<username>.github.io/<repo>/` (if folder is root), or  
   - `https://<username>.github.io/<repo>/` (if folder is `site`, GitHub serves the contents of `site` at the repo root URL).

5. **(Optional)** Add a custom domain under **Pages** settings.

---

## Option B: Use the repo root as the website

If you want the repo root to be the website (so you don’t use a `site` subfolder):

1. Move everything inside `site/` to the repo root (all HTML, and the `css/`, `js/`, `data/`, `images/`, `team/` folders).
2. In **Settings → Pages**, set **Source** to **Deploy from a branch** and **Folder** to **`/ (root)`**.
3. The site will be at `https://<username>.github.io/<repo>/`.

---

## After deployment

- **Content updates:** Edit the JSON files in `data/` (see `site/CONTENT.md`), commit, and push. GitHub Pages will redeploy automatically.
- **No build step:** The site is static HTML, CSS, and JavaScript. No npm build or static generator is required.
- **Contact form:** The form submits to FormSubmit and sends email to **ccbxl@gmail.com**. The first time you use it, FormSubmit may send a one-time confirmation email to that address; confirm it to activate.

---

## Cloudflare Pages (alternative)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com), go to **Pages → Create project → Connect to Git**.
2. Select your repository.
3. **Build settings:**  
   - **Build command:** leave empty.  
   - **Build output directory:**  
     - If the site is in the `site` folder: set to **`site`**.  
     - If the site is at the repo root: set to **`/`** or leave default.
4. Deploy. The site will be at `https://<project>.pages.dev`; you can add a custom domain.
