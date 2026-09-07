import type { Page } from '@vuepress/core'
import { expect, test, vi } from 'vitest'

import { createPageChunkFilesMap } from '../../src/index.js'

const createPage = (
  page: Pick<Page, 'chunkName' | 'pathInferred' | 'routeKey'>,
): Page => page as Page

test('should map final route keys and inferred route aliases to page chunks', () => {
  const pages = [
    createPage({
      chunkName: 'permalink',
      routeKey: '/permalink/',
      pathInferred: '/posts/foo.md',
    }),
    createPage({
      chunkName: 'custom-path',
      routeKey: '/custom/',
      pathInferred: '/中文/README.md',
    }),
    createPage({
      chunkName: 'regular',
      routeKey: '/regular',
      pathInferred: '/regular.md',
    }),
    createPage({
      chunkName: 'virtual',
      routeKey: '/virtual',
      pathInferred: null,
    }),
  ]

  expect(
    createPageChunkFilesMap({
      pages,
      resolvePageChunkFiles: (page) => [`${page.chunkName}.js`],
    }),
  ).toEqual(
    new Map([
      ['/permalink/', ['permalink.js']],
      ['/posts/foo', ['permalink.js']],
      ['/custom/', ['custom-path.js']],
      ['/%E4%B8%AD%E6%96%87/', ['custom-path.js']],
      ['/regular', ['regular.js']],
      ['/virtual', ['virtual.js']],
    ]),
  )
})

const exactPage = createPage({
  chunkName: 'exact',
  routeKey: '/legacy',
  pathInferred: null,
})
const redirectingPage = createPage({
  chunkName: 'permalink',
  routeKey: '/permalink/',
  pathInferred: '/legacy.md',
})

test.for([
  { name: 'before', pages: [exactPage, redirectingPage] },
  { name: 'after', pages: [redirectingPage, exactPage] },
])(
  'should prioritize an exact page route key when it appears $name its redirect alias',
  ({ pages }) => {
    const resolvePageChunkFiles = vi.fn((page: Page) => [
      `${page.chunkName}.js`,
    ])

    expect(
      createPageChunkFilesMap({
        pages,
        resolvePageChunkFiles,
      }).get('/legacy'),
    ).toEqual(['exact.js'])
    expect(resolvePageChunkFiles).toHaveBeenCalledTimes(pages.length)
  },
)
