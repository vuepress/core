import { createMarkdown } from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import { createBaseApp, renderPageContent } from '../../src'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})
app.markdown = createMarkdown()

describe('core > page > renderPageContent', () => {
  it('should render page content correctly', async () => {
    const resolved = await renderPageContent({
      app,
      content: 'foobar',
      filePath: app.dir.source('foo.md'),
      filePathRelative: 'foo.md',
      options: {},
    })

    expect(resolved).toEqual({
      contentRendered: '<p>foobar</p>\n',
      deps: [],
      excerpt: '',
      frontmatter: {},
      headers: [],
      links: [],
      sfcBlocks: [],
      title: '',
    })
  })

  describe('page title', () => {
    it('should use title in frontmatter', async () => {
      const resolved = await renderPageContent({
        app,
        content: '# title in header',
        filePath: null,
        filePathRelative: null,
        options: {
          frontmatter: {
            title: 'title in frontmatter',
          },
        },
      })

      expect(resolved.title).toEqual('title in frontmatter')
    })

    it('should use title in the first h1 header', async () => {
      const resolved = await renderPageContent({
        app,
        content: '# title in header',
        filePath: null,
        filePathRelative: null,
        options: {},
      })

      expect(resolved.title).toEqual('title in header')
    })

    it('should use empty title', async () => {
      const resolved = await renderPageContent({
        app,
        content: '',
        filePath: null,
        filePathRelative: null,
        options: {},
      })

      expect(resolved.title).toEqual('')
    })
  })

  describe('page frontmatter', () => {
    it('should merge markdown frontmatter and options frontmatter', async () => {
      const resolved = await renderPageContent({
        app,
        content: `\
---
title: title in markdown frontmatter
---
`,
        filePath: null,
        filePathRelative: null,
        options: {
          frontmatter: {
            description: 'description in options frontmatter',
          },
        },
      })

      expect(resolved.frontmatter).toEqual({
        title: 'title in markdown frontmatter',
        description: 'description in options frontmatter',
      })
    })

    it('should use fields from markdown frontmatter first', async () => {
      const resolved = await renderPageContent({
        app,
        content: `\
---
title: title in markdown frontmatter
---
`,
        filePath: null,
        filePathRelative: null,
        options: {
          frontmatter: {
            title: 'title in options frontmatter',
          },
        },
      })

      expect(resolved.frontmatter).toEqual({
        title: 'title in markdown frontmatter',
      })
    })
  })

  describe('page excerpt', () => {
    it('should render page excerpt correctly', async () => {
      const resolved = await renderPageContent({
        app,
        content: `\
---
foo: foo
bar: 1
baz: true
---

excerpt

<!-- more -->

foobar
`,
        filePath: null,
        filePathRelative: null,
        options: {},
      })

      expect(resolved.excerpt).toEqual('<p>excerpt</p>\n')
    })

    it('should extract empty page excerpt', async () => {
      const resolved = await renderPageContent({
        app,
        content: '',
        filePath: null,
        filePathRelative: null,
        options: {},
      })

      expect(resolved.excerpt).toEqual('')
    })
  })
})
