import type { Page } from '@vuepress/core'
import { expect, test } from 'vitest'

import type { PageChunkFilesMap } from '../../src/index.js'
import { resolveLinkedPageChunkFiles } from '../../src/index.js'

const createPage = (links: Page['links']): Page => ({ links }) as Page

test('should resolve and dedupe linked page chunk files', () => {
  const page = createPage([
    {
      raw: './foo.md',
      relative: 'guide/foo.md',
      absolute: '/base/guide/foo.md',
    },
    {
      raw: './bar/README.md',
      relative: 'guide/bar/README.md',
      absolute: '/base/guide/bar/README.md',
    },
    {
      raw: './foo.md',
      relative: 'guide/foo.md',
      absolute: '/base/guide/foo.md',
    },
  ])
  const pageChunkFilesMap: PageChunkFilesMap = new Map([
    ['/guide/foo.html', ['foo.js', 'shared.js']],
    ['/guide/bar/', ['bar.js', 'shared.js']],
  ])

  expect(
    resolveLinkedPageChunkFiles({
      base: '/base/',
      page,
      pageChunkFilesMap,
    }),
  ).toEqual(new Set(['foo.js', 'shared.js', 'bar.js']))
})

test('should ignore unresolvable links and links without mapped chunks', () => {
  const page = createPage([
    {
      raw: './virtual.md',
      relative: 'virtual.md',
      absolute: null,
    },
    {
      raw: './missing.md',
      relative: 'missing.md',
      absolute: '/missing.md',
    },
  ])

  expect(
    resolveLinkedPageChunkFiles({
      base: '/',
      page,
      pageChunkFilesMap: new Map(),
    }),
  ).toEqual(new Set())
})
