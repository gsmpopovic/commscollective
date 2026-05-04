import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const projectRoot = process.cwd()

const repoSegment =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ||
  process.env.BASE_PATH?.replace(/^\//, '').replace(/\/$/, '') ||
  ''

/**
 * Base URL for deployed assets and links.
 * - Custom apex domain (e.g. commscollective.xyz): use SITE_BASE=/ so assets are /assets/... not /repo/assets/...
 * - Default GitHub project URL (user.github.io/repo/): omit SITE_BASE; uses /repo/
 * Set repo Settings → Variables → SITE_BASE to "/" when using a custom domain at the site root.
 */
function resolveBase() {
  const raw = process.env.SITE_BASE
  if (raw !== undefined && raw !== '') {
    const s = raw.trim()
    if (s === '/') return '/'
    return s.endsWith('/') ? s : `${s}/`
  }
  return repoSegment ? `/${repoSegment}/` : '/'
}

const base = resolveBase()

/**
 * Prefix for internal *.html and js links after build.
 * - base "/"  → "/about.html", "/js/main.js" (works on apex domains without trailing slash)
 * - base "/repo/" → "/repo/about.html"
 */
function githubPagesAbsoluteLinks() {
  const root = base === '/' ? '/' : base.replace(/\/$/, '')
  return {
    name: 'github-pages-absolute-links',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (base === '/') {
          html = html.replace(
            /href="(?!https?:\/\/|mailto:|#|\/)([^"]+\.html)"/gi,
            (_, rel) => `href="/${rel}"`
          )
          html = html.replace(/src="(?!https?:\/\/)(js\/[^"]+)"/gi, (_, rel) => `src="/${rel}"`)
          return html
        }
        if (!root || root === '/') return html
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
      },
    },
  ],
})
