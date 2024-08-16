import { path } from '@vuepress/utils'
import { expect, it, vi } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, resolvePageFilePath } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

const ABSOLUTE_FILE_PATH = app.dir.source('file.md')
const RELATIVE_FILE_PATH = 'file.md'

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

it('should resolve path correctly if filePath is absolute', () => {
  const resolved = resolvePageFilePath({
    app,
    options: {
      filePath: ABSOLUTE_FILE_PATH,
    },
  })
  expect(resolved).toEqual({
    filePath: ABSOLUTE_FILE_PATH,
    filePathRelative: RELATIVE_FILE_PATH,
  })
})

it('should throw if filePath is relative', () => {
  const consoleError = console.error
  console.error = vi.fn()

  expect(() =>
    resolvePageFilePath({
      app,
      options: {
        filePath: RELATIVE_FILE_PATH,
      },
    }),
  ).toThrow()

  expect(console.error).toHaveBeenCalled()

  console.error = consoleError
})
