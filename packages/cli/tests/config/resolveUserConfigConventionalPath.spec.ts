import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { resolveUserConfigConventionalPath } from '../../src/index.js'

const resolveFixtures = (str: string): string =>
  path.resolve(__dirname, '../__fixtures__/config/convention', str)

const testCases: [string, string][] = [
  [resolveFixtures('case1'), 'vuepress.config.ts'],
  [resolveFixtures('case2'), '.vuepress/config.ts'],
  [resolveFixtures('case3'), 'vuepress.config.js'],
  [resolveFixtures('case4'), '.vuepress/config.js'],
  [resolveFixtures('case5'), 'vuepress.config.mjs'],
  [resolveFixtures('case6'), '.vuepress/config.mjs'],
]

describe('cli > config > resolveUserConfigConventionalPath', () => {
  describe('should resolve conventional config file correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(expected, () => {
        const configFile = resolveUserConfigConventionalPath(source, source)
        expect(configFile).toEqual(path.resolve(source, expected))
      })
    })
  })
})
