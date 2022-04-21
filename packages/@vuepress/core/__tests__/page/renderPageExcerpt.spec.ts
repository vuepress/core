import { createMarkdown } from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import { createBaseApp, renderPageExcerpt } from '../../src'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})
app.markdown = createMarkdown()

describe('core > page > renderPageExcerpt', () => {
  it('should render page excerpt correctly', () => {
    const resolved = renderPageExcerpt({
      app,
      excerptRaw: 'foobar',
      frontmatter: {},
      filePath: null,
      filePathRelative: null,
    })

    expect(resolved).toBe('<p>foobar</p>\n')
  })
})
