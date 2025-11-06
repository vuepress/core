import { path, sanitizeFileName } from '@vuepress/utils'
import { expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, resolvePageChunkInfo } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

it('should resolve page chunk info correctly without source file path', () => {
  const resolved = resolvePageChunkInfo({
    app,
    filePath: null,
    filePathRelative: null,
    htmlFilePathRelative: 'foo.html',
  })

  expect(resolved).toEqual({
    chunkFilePath: app.dir.temp('pages/foo.html.vue'),
    chunkFilePathRelative: 'pages/foo.html.vue',
    chunkName: sanitizeFileName('foo.html'),
  })
})

it('should resolve page chunk info correctly with source file path', () => {
  const resolved = resolvePageChunkInfo({
    app,
    filePath: app.dir.source('foo.md'),
    filePathRelative: 'foo.md',
    htmlFilePathRelative: 'foo.html',
  })

  expect(resolved).toEqual({
    chunkFilePath: app.dir.source('foo.md'),
    chunkFilePathRelative: 'foo.md',
    chunkName: sanitizeFileName('foo.html'),
  })
})
