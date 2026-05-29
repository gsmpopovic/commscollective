import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const projectRoot = process.cwd()

/**
 * Asset & script URLs on GitHub Pages:
 * - Relative `./` works on BOTH `commscollective.xyz` (site at `/`) AND
 *   `user.github.io/repo/` — absolute `/commscollective/...` ONLY worked on the .github.io URL.
 *
 * Optional override: repo variable SITE_BASE=/ forces absolute root paths (rare).
 */
function resolveBase() {
  const raw = process.env.SITE_BASE
  if (raw !== undefined && raw !== '') {
    const s = raw.trim()
    if (s === '/') return '/'
    return s.endsWith('/') ? s : `${s}/`
  }
  return './'
}

const base = resolveBase()

/** Only rewrite nav/script when using absolute base paths (not `./`). */
function githubPagesAbsoluteLinks() {
  return {
    name: 'github-pages-absolute-links',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (base === '/' || base === './') return html

        const root = base.replace(/\/$/, '')
        html = html.replace(
          /href="(?!https?:\/\/|mailto:|#|\/)([^"]+\.html)"/gi,
          (_, rel) => `href="${root}/${rel}"`
        )
        html = html.replace(/src="(?!https?:\/\/)(js\/[^"]+)"/gi, (_, rel) => `src="${root}/${rel}"`)
        return html
      },
    },
  }
}

export default defineConfig({
  base,
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: [
        'index.html',
        'contact.html',
        'about.html',
        'events.html',
        'resources.html',
        'membership.html',
        'admin/index.html',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || assetInfo.name || ''
          if (name.endsWith('.css')) {
            return 'assets/styles.css'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  plugins: [
    githubPagesAbsoluteLinks(),
    {
      name: 'copy-static',
      closeBundle() {
        const dist = path.join(projectRoot, 'dist')
        const copy = (src, dest = src) => {
          const s = path.join(projectRoot, src)
          const d = path.join(dist, dest)
          if (fs.existsSync(s)) {
            fs.mkdirSync(path.dirname(d), { recursive: true })
            if (fs.statSync(s).isDirectory()) {
              fs.cpSync(s, d, { recursive: true })
            } else {
              fs.copyFileSync(s, d)
            }
          }
        }
        ;['images', 'data', 'js'].forEach((dir) => copy(dir))
        ;['favicon.svg', 'robots.txt', 'sitemap.xml', '.nojekyll'].forEach((file) => copy(file))
        // Sveltia CMS loads /admin/config.yml at runtime — copy it next to the built admin/index.html.
        copy('admin/config.yml', 'admin/config.yml')
      },
    },
  ],
})
