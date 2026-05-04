import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import ejs from 'ejs'

const projectRoot = process.cwd()

/**
 * Shared data + render for every HTML page (build transformIndexHtml + dev middleware).
 */
function getHtmlRenderContext(filePath, root) {
  const relativePath = path.relative(root, filePath)
  const isTeam = relativePath.startsWith('team' + path.sep)
  const basePath = isTeam ? '../' : ''
  const partialPath = isTeam ? '../partials' : 'partials'
  const basename = path.basename(filePath, '.html')
  const currentPage = basename === 'index' ? 'home' : basename
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || process.env.BASE_PATH?.replace(/\/$/, '') || ''
  const siteBase = repo ? `/${repo}/` : ''
  return { basePath, partialPath, currentPage, siteBase }
}

function renderEjsPage(html, filePath, root) {
  const data = getHtmlRenderContext(filePath, root)
  return ejs.render(html, data, {
    filename: filePath,
    views: [path.dirname(filePath)],
  })
}

/**
 * Injects basePath and currentPage into HTML, then renders EJS (so partials work).
 * Dev middleware ensures EJS runs for every HTML entry even when the dev pipeline
 * would otherwise serve the raw template (fixes broken <%= %> in img/src/href).
 */
function ejsHtmlPlugin() {
  const root = projectRoot

  function tryServeEjsHtml(req, res, next, base) {
    const raw = req.url.split('?')[0]
    let pathname = raw
    const baseNorm = (base && base !== '/') ? base.replace(/\/$/, '') : ''
    if (baseNorm && pathname.startsWith(baseNorm)) {
      pathname = pathname.slice(baseNorm.length) || '/'
    }
    if (!pathname.endsWith('.html')) {
      if (pathname === '/' || pathname === '') pathname = '/index.html'
      else return next()
    }
    const rel = pathname.replace(/^\//, '')
    if (!rel.endsWith('.html')) return next()

    const filePath = path.resolve(root, rel)
    if (!filePath.startsWith(root)) return next()
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next()

    let html = fs.readFileSync(filePath, 'utf-8')
    if (!html.includes('<%')) return next()

    try {
      html = renderEjsPage(html, filePath, root)
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(html)
    } catch (err) {
      next(err)
    }
  }

  return {
    name: 'vite-plugin-ejs-html',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        tryServeEjsHtml(req, res, next, server.config.base)
      })
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const filePath = ctx.filename
          ? path.resolve(ctx.filename)
          : path.resolve(root, (ctx.path || '').replace(/^\//, '').split('?')[0])
        return renderEjsPage(html, filePath, root)
      },
    },
  }
}

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || process.env.BASE_PATH?.replace(/\/$/, '') || ''
const base = repoName ? `/${repoName}/` : '/'

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
    },
  },
  plugins: [
    ejsHtmlPlugin(),
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
        ;['favicon.svg', 'robots.txt', 'sitemap.xml'].forEach((file) => copy(file))
      },
    },
  ],
})
