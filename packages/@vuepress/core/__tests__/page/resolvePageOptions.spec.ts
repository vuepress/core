import { createBaseApp, resolvePageOptions } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > page > resolvePageOptions', () => {
  it('should resolve page options correctly', async () => {
    expect(
      await resolvePageOptions({
        app,
        optionsRaw: {
          filePath: 'README.md',
        },
      })
    ).toEqual({
      filePath: 'README.md',
    })
  })
})
