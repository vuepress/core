import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { createBaseApp, resolvePageDataInfo } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})

describe('core > page > resolvePageDataInfo', () => {
  it('should resolve page data file path correctly', () => {
    const key = 'foobar'
    const htmlFilePathRelative = 'foobar.html'
    const expectedFilePath = app.dir.temp(`pages/${htmlFilePathRelative}.js`)
    expect(
      resolvePageDataInfo({
        app,
        key,
        htmlFilePathRelative,
      })
    ).toEqual({
      dataFilePath: expectedFilePath,
      dataFilePathRelative: path.relative(app.dir.temp(), expectedFilePath),
      dataFileChunkName: key,
    })
  })
})
