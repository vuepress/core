import { createMarkdown } from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import { expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, resolveAppPages } from '../../src/index.js'

it('should create two pages with default 404 page', async () => {
  const app = createBaseApp({
    source: path.resolve(__dirname, '../__fixtures__/pages'),
    theme: { name: 'test' },
    bundler: {} as Bundler,
  })
  app.markdown = createMarkdown()

  const pages = await resolveAppPages(app)
  const fooPage = pages.find((page) => page.path === '/foo.html')
  const barPage = pages.find((page) => page.path === '/bar.html')
  const notFoundPage = pages.find((page) => page.path === '/404.html')

  expect(pages).toHaveLength(3)
  expect(fooPage?.filePathRelative).toEqual('foo.md')
  expect(barPage?.filePathRelative).toEqual('bar.md')
  expect(notFoundPage?.filePathRelative).toBeNull()
  expect(notFoundPage?.frontmatter.layout).toEqual('NotFound')
})

it('should create two pages with custom 404 page', async () => {
  const app = createBaseApp({
    source: path.resolve(__dirname, '../__fixtures__/pages-with-404'),
    theme: { name: 'test' },
    bundler: {} as Bundler,
  })
  app.markdown = createMarkdown()

  const pages = await resolveAppPages(app)
  const fooPage = pages.find((page) => page.path === '/foo.html')
  const barPage = pages.find((page) => page.path === '/bar.html')
  const notFoundPage = pages.find((page) => page.path === '/404.html')

  expect(pages).toHaveLength(3)
  expect(fooPage?.filePathRelative).toEqual('foo.md')
  expect(barPage?.filePathRelative).toEqual('bar.md')
  expect(notFoundPage?.filePathRelative).toEqual('404.md')
})

it('should process extendsPageOptions hook correctly', async () => {
  const app = createBaseApp({
    source: path.resolve(__dirname, '../__fixtures__/pages-with-404'),
    theme: { name: 'test' },
    bundler: {} as Bundler,
  })

  app.use({
    name: 'foo',
    extendsPageOptions: (pageOptions) => {
      pageOptions.frontmatter ??= {}
      pageOptions.frontmatter.foo = 'bar'
    },
  })
  app.pluginApi.registerHooks()
  app.markdown = createMarkdown()

  const pages = await resolveAppPages(app)

  pages.forEach((page) => {
    expect(page.frontmatter.foo).toBe('bar')
  })
})

it('should process extendsPage hook correctly', async () => {
  const app = createBaseApp({
    source: path.resolve(__dirname, '../__fixtures__/pages-with-404'),
    theme: { name: 'test' },
    bundler: {} as Bundler,
  })

  app.use({
    name: 'foo',
    extendsPage: (page) => {
      page.frontmatter.foo = 'baz'
    },
  })
  app.pluginApi.registerHooks()
  app.markdown = createMarkdown()

  const pages = await resolveAppPages(app)

  pages.forEach((page) => {
    expect(page.frontmatter.foo).toBe('baz')
  })
})
