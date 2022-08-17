import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { loadUserConfig } from '../../src/index.js'

const tsCases: [string, any][] = [
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

const jsCases: [string, any][] = [
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

const mjsCases: [string, any][] = [
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

describe('cli > config > loadUserConfig', () => {
  describe('should load ts config file correctly', () => {
    tsCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), async () => {
        const { userConfig } = await loadUserConfig(source)
        expect(userConfig).toEqual(expected)
      })
    })
  })

  describe('should load js config file correctly', () => {
    jsCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), async () => {
        const { userConfig } = await loadUserConfig(source)
        expect(userConfig).toEqual(expected)
      })
    })
  })

  describe('should load mjs config file correctly', () => {
    mjsCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), async () => {
        const { userConfig } = await loadUserConfig(source)
        expect(userConfig).toEqual(expected)
      })
    })
  })
})
