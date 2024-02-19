import { defineConfig } from 'cypress'
import { fs, getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)
const resolveSourceMarkdownPath = (...args: string[]): string =>
  path.resolve(__dirname, 'docs', ...args)

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9080',
    specPattern: 'tests/**/*.cy.ts',
    setupNodeEvents(on) {
      on('task', {
        'hmr:title': async () => {
          const hmrTitleSourceMarkdownPath =
            resolveSourceMarkdownPath('hmr/title.md')
          const content = await fs.readFile(hmrTitleSourceMarkdownPath, 'utf-8')
          await fs.writeFile(
            hmrTitleSourceMarkdownPath,
            content.replace('# HMR Title', '# Updated Title'),
          )
          return true
        },
        'hmr:title:restore': async () => {
          const hmrTitleSourceMarkdownPath =
            resolveSourceMarkdownPath('hmr/title.md')
          const content = await fs.readFile(hmrTitleSourceMarkdownPath, 'utf-8')
          await fs.writeFile(
            hmrTitleSourceMarkdownPath,
            content.replace('# Updated Title', '# HMR Title'),
          )
          return true
        },
        'hmr:frontmatter': async () => {
          const hmrFrontmatterSourceMarkdownPath =
            resolveSourceMarkdownPath('hmr/frontmatter.md')
          const content = await fs.readFile(
            hmrFrontmatterSourceMarkdownPath,
            'utf-8',
          )
          await fs.writeFile(
            hmrFrontmatterSourceMarkdownPath,
            content.replace('foo: HMR foo', 'foo: Updated foo'),
          )
          return true
        },
        'hmr:frontmatter:restore': async () => {
          const hmrFrontmatterSourceMarkdownPath =
            resolveSourceMarkdownPath('hmr/frontmatter.md')
          const content = await fs.readFile(
            hmrFrontmatterSourceMarkdownPath,
            'utf-8',
          )
          await fs.writeFile(
            hmrFrontmatterSourceMarkdownPath,
            content.replace('foo: Updated foo', 'foo: HMR foo'),
          )
          return true
        },
      })
    },
  },
  env: {
    E2E_BASE: process.env.E2E_BASE ?? '/',
    E2E_COMMAND: process.env.E2E_COMMAND ?? 'dev',
  },
})
