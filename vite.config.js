import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const projectRoot = process.cwd()

const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ||
  process.env.BASE_PATH?.replace(/^\//, '').replace(/\/$/, '') ||
  ''
const base = repoName ? `/${repoName}/` : '/'

/**
 * GitHub project pages live at https://user.github.io/<repo>/.
 * Relative links like href="about.html" break when the entry URL has no trailing slash.
 * Prefix internal *.html and /js/* script URLs with /repo so navigation always resolves.
 */
function githubPagesAbsoluteLinks() {
  const prefix = repoName ? `/${repoName}` : ''
  return {
    name: 'github-pages-absolute-links',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (!prefix) return html
        html = html.replace(
          /href="(?!https?:\/\/|mailto:|#|\/)([^"]+\.html)"/gi,
          (_, rel) => `href="${prefix}/${rel}"`
        )
        html = html.replace(/src="(?!https?:\/\/)(js\/[^"]+)"/gi, (_, rel) => `src="${prefix}/${rel}"`)
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
