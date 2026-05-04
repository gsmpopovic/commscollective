import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const projectRoot = process.cwd()

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
