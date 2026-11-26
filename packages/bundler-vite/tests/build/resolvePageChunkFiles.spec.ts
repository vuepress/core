import type { Page } from '@vuepress/core'
import type { OutputChunk, RolldownOutput } from 'rolldown'
import { expect, test } from 'vitest'

import { createPageChunkFilesResolver } from '../../src/build/resolvePageChunkFiles.js'

const createPage = (chunkFilePath: string): Page => ({ chunkFilePath }) as Page

const createOutput = (
  items: (Partial<OutputChunk> | { type: 'asset'; fileName: string })[],
): RolldownOutput['output'] =>
  items.map((item) =>
    'type' in item
      ? { source: '', ...item }
      : {
          type: 'chunk',
          fileName: '',
          imports: [],
          dynamicImports: [],
          moduleIds: [],
          facadeModuleId: null,
          ...item,
        },
  ) as unknown as RolldownOutput['output']

test('should resolve chunk files of a page from its facade module', () => {
  const output = createOutput([
    {
      fileName: 'app.js',
      facadeModuleId: '/app/src/app.js',
      imports: ['shared.js'],
      dynamicImports: ['/app/src/page-a.md'],
    },
    {
      fileName: 'page-a-hash.js',
      facadeModuleId: '/app/src/page-a.md',
      imports: ['shared.js'],
      dynamicImports: ['page-a-child-hash.js'],
    },
    {
      fileName: 'page-b-hash.js',
      facadeModuleId: '/app/src/page-b.md',
    },
    { type: 'asset', fileName: 'style.css' },
  ])
  const resolvePageChunkFiles = createPageChunkFilesResolver(output)
  const page = createPage('/app/src/page-a.md')

  expect(resolvePageChunkFiles(page)).toEqual([
    'page-a-hash.js',
    'shared.js',
    'page-a-child-hash.js',
  ])
  expect(resolvePageChunkFiles(createPage('/app/src/page-b.md'))).toEqual([
    'page-b-hash.js',
  ])
})

test('should resolve chunk files of a page whose chunk has been merged', () => {
  const output = createOutput([
    {
      fileName: 'app.js',
      facadeModuleId: '/app/src/app.js',
      imports: ['shared.js'],
      dynamicImports: ['/app/src/page-a.md', '/app/src/page-b.md'],
    },
    {
      fileName: 'merged-pages-hash.js',
      facadeModuleId: null,
      moduleIds: [
        '\0rolldown/runtime.js',
        '/app/src/page-a.md',
        '/app/src/page-b.md',
      ],
      imports: ['shared.js'],
    },
  ])
  const resolvePageChunkFiles = createPageChunkFilesResolver(output)

  expect(resolvePageChunkFiles(createPage('/app/src/page-a.md'))).toEqual([
    'merged-pages-hash.js',
    'shared.js',
  ])
  expect(resolvePageChunkFiles(createPage('/app/src/page-b.md'))).toEqual([
    'merged-pages-hash.js',
    'shared.js',
  ])
})

test('should return empty array when no chunk matches the page', () => {
  const output = createOutput([
    {
      fileName: 'app.js',
      facadeModuleId: '/app/src/app.js',
    },
  ])
  const resolvePageChunkFiles = createPageChunkFilesResolver(output)

  expect(resolvePageChunkFiles(createPage('/app/src/page-a.md'))).toEqual([])
})

test('should return the cached chunk files when resolving the same page', () => {
  const output = createOutput([
    {
      fileName: 'page-a-hash.js',
      facadeModuleId: '/app/src/page-a.md',
      imports: ['shared.js'],
    },
  ])
  const resolvePageChunkFiles = createPageChunkFilesResolver(output)
  const page = createPage('/app/src/page-a.md')

  const pageChunkFiles = resolvePageChunkFiles(page)

  expect(resolvePageChunkFiles(page)).toBe(pageChunkFiles)
  // the cached empty result should also be returned by reference
  const missingPage = createPage('/app/src/missing.md')
  expect(resolvePageChunkFiles(missingPage)).toBe(
    resolvePageChunkFiles(missingPage),
  )
})
