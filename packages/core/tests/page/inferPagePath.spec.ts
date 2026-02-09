import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { createBaseApp, inferPagePath } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
  locales: {
    '/': {},
    '/en/': {},
    '/zh/': {},
    '/中文/': {},
  },
})
const appWithoutLocales = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

const TEST_CASES: [string, ReturnType<typeof inferPagePath>][] = [
  [
    'README.md',
    {
      pathInferred: '/',
      pathLocale: '/',
    },
  ],
  [
    'foo.md',
    {
      pathInferred: '/foo.html',
      pathLocale: '/',
    },
  ],
  [
    'en/README.md',
    {
      pathInferred: '/en/',
      pathLocale: '/en/',
    },
  ],
  [
    'en/foo.md',
    {
      pathInferred: '/en/foo.html',
      pathLocale: '/en/',
    },
  ],
  [
    'zh/README.md',
    {
      pathInferred: '/zh/',
      pathLocale: '/zh/',
    },
  ],
  [
    'zh/foo.md',
    {
      pathInferred: '/zh/foo.html',
      pathLocale: '/zh/',
    },
  ],
  [
    '中文/README.md',
    {
      pathInferred: '/中文/',
      pathLocale: '/中文/',
    },
  ],
  [
    '中文/foo.md',
    {
      pathInferred: '/中文/foo.html',
      pathLocale: '/中文/',
    },
  ],
]

describe('should infer page path according to relative path of page file', () => {
  TEST_CASES.forEach(([source, expected]) => {
    it(JSON.stringify(source), () => {
      expect(
        inferPagePath({
          app,
          filePathRelative: source,
          options: {},
        }),
      ).toEqual(expected)
    })
  })
})

it('should use `/` as the default locale path', () => {
  expect(
    inferPagePath({
      app: appWithoutLocales,
      filePathRelative: 'en/foo/bar.md',
      options: {},
    }),
  ).toEqual({
    pathInferred: '/en/foo/bar.html',
    pathLocale: '/',
  })
})

it('should handle empty file relative path', () => {
  expect(
    inferPagePath({
      app,
      filePathRelative: null,
      options: {},
    }),
  ).toEqual({
    pathInferred: null,
    pathLocale: '/',
  })
})

it('should respect options.path', () => {
  expect(
    inferPagePath({
      app,
      filePathRelative: 'foo/bar.md',
      options: { path: '/custom/path.html' },
    }),
  ).toEqual({
    pathInferred: '/foo/bar.html',
    pathLocale: '/',
  })

  expect(
    inferPagePath({
      app,
      filePathRelative: 'zh/foo/bar.md',
      options: { path: '/zh/custom/path.html' },
    }),
  ).toEqual({
    pathInferred: '/zh/foo/bar.html',
    pathLocale: '/zh/',
  })
})
