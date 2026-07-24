import type { Page } from '@vuepress/core'
import { describe, expect, it } from 'vitest'

import { createPageChunkFilesMap } from '../../src/index.js'

const createPage = (
  page: Pick<Page, 'chunkName' | 'path' | 'pathInferred'>,
): Page => page as Page

describe('createPageChunkFilesMap', () => {
  it('should map final paths and inferred route aliases to page chunks', () => {
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
})
