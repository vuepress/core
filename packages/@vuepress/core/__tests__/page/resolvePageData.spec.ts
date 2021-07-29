import { createBaseApp, resolvePageData } from '@vuepress/core'
import type { Page } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > page > resolvePageData', () => {
  it('should resolve page data correctly', async () => {
    const mockPage = ({
      key: 'foo',
      path: '/bar.html',
      title: 'mock',
      lang: 'en-US',
      frontmatter: {},
      excerpt: '',
      headers: [],
    } as unknown) as Page

    expect(
      await resolvePageData({
        app,
        page: mockPage,
      })
    ).toEqual(mockPage)
  })
})
