import type { Bundler, Page } from '@vuepress/core'
import { createBaseApp, createPage as createVuePressPage } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { expect, test } from 'vitest'

import type { PageChunkFilesMap } from '../../src/index.js'
import { resolveLinkedPageChunkFiles } from '../../src/index.js'

const createPage = (links: Page['links'], pagePath = '/current.html'): Page =>
  ({ links, path: pagePath }) as Page

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

test('should resolve relative links from virtual pages against the current route', async () => {
  const app = createBaseApp({
    source: path.resolve(__dirname, 'fake-source'),
    theme: { name: 'test' },
    bundler: {} as Bundler,
  })
  await app.init()

  const page = await createVuePressPage(app, {
    path: '/guide/virtual.html',
    content: ['[foo](./foo.md)', '[bar](../bar/README.md)'].join('\n\n'),
  })
  const pageChunkFilesMap: PageChunkFilesMap = new Map([
    ['/guide/foo.html', ['foo.js', 'shared.js']],
    ['/bar/', ['bar.js', 'shared.js']],
  ])

  expect(page.links).toEqual([
    {
      raw: './foo.md',
      relative: 'foo.md',
      absolute: null,
    },
    {
      raw: '../bar/README.md',
      relative: '../bar/README.md',
      absolute: null,
    },
  ])
  expect(
    resolveLinkedPageChunkFiles({
      base: '/',
      page,
      pageChunkFilesMap,
    }),
  ).toEqual(new Set(['foo.js', 'shared.js', 'bar.js']))
})

test('should ignore unresolvable links and links without mapped chunks', () => {
  const page = createPage([
    {
      raw: '',
      relative: '',
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
