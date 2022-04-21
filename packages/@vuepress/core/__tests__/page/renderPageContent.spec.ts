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
      frontmatter: {},
      filePath: app.dir.source('foo.md'),
      filePathRelative: 'foo.md',
    })

    expect(resolved).toEqual({
      contentRendered: '<p>foobar</p>\n',
      deps: [],
      headers: [],
      hoistedTags: [],
      links: [],
      title: '',
    })
  })

  describe('page title', () => {
    it('should use title in frontmatter', async () => {
      const resolved = await renderPageContent({
        app,
        content: '# title in header',
        frontmatter: {
          title: 'title in frontmatter',
        },
        filePath: null,
        filePathRelative: null,
      })

      expect(resolved.title).toEqual('title in frontmatter')
    })

    it('should use title in the first h1 header', async () => {
      const resolved = await renderPageContent({
        app,
        content: '# title in header',
        frontmatter: {},
        filePath: null,
        filePathRelative: null,
      })

      expect(resolved.title).toEqual('title in header')
    })

    it('should use empty title', async () => {
      const resolved = await renderPageContent({
        app,
        content: '',
        frontmatter: {},
        filePath: null,
        filePathRelative: null,
      })

      expect(resolved.title).toEqual('')
    })
  })
})
