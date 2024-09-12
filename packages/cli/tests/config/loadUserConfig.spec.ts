import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { loadUserConfig } from '../../src/index.js'

const TS_CASES: [string, unknown][] = [
  [
    path.resolve(__dirname, '../__fixtures__/config/ts/.vuepress/config.ts'),
    {
      description: 'hello from .vuepress/config.ts',
    },
  ],
  [
    path.resolve(__dirname, '../__fixtures__/config/ts/vuepress.config.ts'),
    {
      description: 'hello from vuepress.config.ts',
    },
  ],
]

const JS_CASES: [string, unknown][] = [
  [
    path.resolve(__dirname, '../__fixtures__/config/js/.vuepress/config.js'),
    {
      description: 'hello from .vuepress/config.js',
    },
  ],
  [
    path.resolve(__dirname, '../__fixtures__/config/js/vuepress.config.js'),
    {
      description: 'hello from vuepress.config.js',
    },
  ],
]

const MJS_CASES: [string, unknown][] = [
  [
    path.resolve(__dirname, '../__fixtures__/config/mjs/.vuepress/config.mjs'),
    {
      description: 'hello from .vuepress/config.mjs',
    },
  ],
  [
    path.resolve(__dirname, '../__fixtures__/config/mjs/vuepress.config.mjs'),
    {
      description: 'hello from vuepress.config.mjs',
    },
  ],
]

describe('should load ts config file correctly', () => {
  TS_CASES.forEach(([source, expected]) => {
    it(JSON.stringify(source), async () => {
      const { userConfig } = await loadUserConfig(source)
      expect(userConfig).toEqual(expected)
    })
  })
})

describe('should load js config file correctly', () => {
  JS_CASES.forEach(([source, expected]) => {
    it(JSON.stringify(source), async () => {
      const { userConfig } = await loadUserConfig(source)
      expect(userConfig).toEqual(expected)
    })
  })
})

describe('should load mjs config file correctly', () => {
  MJS_CASES.forEach(([source, expected]) => {
    it(JSON.stringify(source), async () => {
      const { userConfig } = await loadUserConfig(source)
      expect(userConfig).toEqual(expected)
    })
  })
})
