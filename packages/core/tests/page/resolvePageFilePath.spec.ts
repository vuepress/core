import { path } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'
import { createBaseApp, resolvePageFilePath } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})

describe('core > page > resolvePageFilePath', () => {
  it('should return null if the filePath is empty', () => {
    const resolved = resolvePageFilePath({
      app,
      options: {},
    })
    expect(resolved).toEqual({
      filePath: null,
      filePathRelative: null,
    })
  })

  const absoluteFilePath = app.dir.source('file.md')
  const relativeFilePath = 'file.md'

  it('should resolve path correctly if filePath is absolute', () => {
    const resolved = resolvePageFilePath({
      app,
      options: {
        filePath: absoluteFilePath,
      },
    })
    expect(resolved).toEqual({
      filePath: absoluteFilePath,
      filePathRelative: relativeFilePath,
    })
  })

  it('should throw if filePath is relative', () => {
    const consoleError = console.error
    console.error = vi.fn()

    expect(() =>
      resolvePageFilePath({
        app,
        options: {
          filePath: relativeFilePath,
        },
      })
    ).toThrow()

    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
