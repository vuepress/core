import { path } from '@vuepress/utils'
import { expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, resolvePageComponentInfo } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

it('should resolve page component info correctly', async () => {
  const resolved = await resolvePageComponentInfo({
    app,
    htmlFilePathRelative: 'foo.html',
  })

  expect(resolved).toEqual({
    componentFilePath: app.dir.temp('pages/foo.html.vue'),
    componentFilePathRelative: 'pages/foo.html.vue',
  })
})
