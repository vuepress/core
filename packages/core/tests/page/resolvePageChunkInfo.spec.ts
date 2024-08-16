import { path, sanitizeFileName } from '@vuepress/utils'
import { expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, resolvePageChunkInfo } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

it('should resolve page chunk info correctly', () => {
  const resolved = resolvePageChunkInfo({
    app,
    htmlFilePathRelative: 'foo.html',
  })

  expect(resolved).toEqual({
    chunkFilePath: app.dir.temp('pages/foo.html.js'),
    chunkFilePathRelative: 'pages/foo.html.js',
    chunkName: sanitizeFileName('foo.html'),
  })
})
