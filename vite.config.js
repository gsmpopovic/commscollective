import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import ejs from 'ejs'

/**
 * Injects basePath and currentPage into HTML, then renders EJS (so partials work).
 * Run during build so dist/ gets plain static HTML.
 */
function ejsHtmlPlugin() {
  const root = process.cwd()
  return {
    name: 'vite-plugin-ejs-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const filePath = ctx.filename
          ? path.resolve(ctx.filename)
          : path.resolve(root, ctx.path.replace(/^\//, ''))
        const relativePath = path.relative(root, filePath)
        const isTeam = relativePath.startsWith('team' + path.sep)
        const basePath = isTeam ? '../' : ''
        const partialPath = isTeam ? '../partials' : 'partials'
        const basename = path.basename(filePath, '.html')
        const currentPage = basename === 'index' ? 'home' : basename

        const data = { basePath, partialPath, currentPage }
        return ejs.render(html, data, {
          filename: filePath,
          views: [path.dirname(filePath)],
        })
      },
    },
  }
}

export default defineConfig({
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
        'calendar.html',
        'team.html',
        'team/camilla.html',
        'team/eleanor.html',
        'team/paula.html',
        'team/celeste.html',
        'team/simone.html',
      ],
    },
  },
  plugins: [
    ejsHtmlPlugin(),
    {
      name: 'copy-static',
      closeBundle() {
        const root = process.cwd()
        const dist = path.join(root, 'dist')
        const copy = (src, dest = src) => {
          const s = path.join(root, src)
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
