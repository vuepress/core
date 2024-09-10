import { path } from '@vuepress/utils'
import { expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, resolvePageComponentInfo } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

it('should resolve page component info correctly without source file path', () => {
  const resolved = resolvePageComponentInfo({
    app,
    filePath: null,
    filePathRelative: null,
    htmlFilePathRelative: 'foo.html',
  })

  expect(resolved).toEqual({
    componentFilePath: app.dir.temp('pages/foo.html.vue'),
    componentFilePathRelative: 'pages/foo.html.vue',
  })
})

it('should resolve page component info correctly with source file path', () => {
  const resolved = resolvePageComponentInfo({
    app,
    filePath: app.dir.source('foo.md'),
    filePathRelative: 'foo.md',
    htmlFilePathRelative: 'foo.html',
  })

  expect(resolved).toEqual({
    componentFilePath: app.dir.source('foo.md'),
    componentFilePathRelative: 'foo.md',
  })
})
