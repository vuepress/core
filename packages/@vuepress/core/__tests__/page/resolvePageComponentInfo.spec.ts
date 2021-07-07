import { createBaseApp, resolvePageComponentInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > page > resolvePageComponentInfo', () => {
  it('should resolve page component info correctly', async () => {
    const resolved = await resolvePageComponentInfo({
      app,
      hoistedTags: [],
      htmlFilePathRelative: 'foo.html',
      key: 'key',
    })

    expect(resolved).toEqual({
      componentFilePath: app.dir.temp('pages/foo.html.vue'),
      componentFilePathRelative: 'pages/foo.html.vue',
      componentFileChunkName: 'key',
    })
  })
})
