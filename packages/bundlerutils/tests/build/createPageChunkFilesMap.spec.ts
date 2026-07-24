import type { Page } from '@vuepress/core'
import { expect, test, vi } from 'vitest'

import { createPageChunkFilesMap } from '../../src/index.js'

const createPage = (
  page: Pick<Page, 'chunkName' | 'path' | 'pathInferred'>,
): Page => page as Page

test('should map final paths and inferred route aliases to page chunks', () => {
  const pages = [
    createPage({
      chunkName: 'permalink',
      path: '/permalink/',
      pathInferred: '/posts/foo.md',
    }),
    createPage({
      chunkName: 'custom-path',
      path: '/custom/',
      pathInferred: '/中文/README.md',
    }),
    createPage({
      chunkName: 'regular',
      path: '/regular.html',
      pathInferred: '/regular.md',
    }),
    createPage({
      chunkName: 'virtual',
      path: '/virtual.html',
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
      ['/posts/foo.html', ['permalink.js']],
      ['/custom/', ['custom-path.js']],
      ['/%E4%B8%AD%E6%96%87/', ['custom-path.js']],
      ['/regular.html', ['regular.js']],
      ['/virtual.html', ['virtual.js']],
    ]),
  )
})

const exactPage = createPage({
  chunkName: 'exact',
  path: '/legacy.html',
  pathInferred: null,
})
const redirectingPage = createPage({
  chunkName: 'permalink',
  path: '/permalink/',
  pathInferred: '/legacy.md',
})

test.for([
  { name: 'before', pages: [exactPage, redirectingPage] },
  { name: 'after', pages: [redirectingPage, exactPage] },
])(
  'should prioritize an exact page path when it appears $name its redirect alias',
  ({ pages }) => {
    const resolvePageChunkFiles = vi.fn((page: Page) => [
      `${page.chunkName}.js`,
    ])

    expect(
      createPageChunkFilesMap({
        pages,
        resolvePageChunkFiles,
      }).get('/legacy.html'),
    ).toEqual(['exact.js'])
    expect(resolvePageChunkFiles).toHaveBeenCalledTimes(pages.length)
  },
)
