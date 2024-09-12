import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { resolveUserConfigConventionalPath } from '../../src/index.js'

const resolveFixtures = (str: string): string =>
  path.resolve(__dirname, '../__fixtures__/config/convention', str)

const TEST_CASES: [string, string][] = [
  [resolveFixtures('case1'), 'vuepress.config.ts'],
  [resolveFixtures('case2'), '.vuepress/config.ts'],
  [resolveFixtures('case3'), 'vuepress.config.js'],
  [resolveFixtures('case4'), '.vuepress/config.js'],
  [resolveFixtures('case5'), 'vuepress.config.mjs'],
  [resolveFixtures('case6'), '.vuepress/config.mjs'],
]

describe('should resolve conventional config file correctly', () => {
  TEST_CASES.forEach(([source, expected]) => {
    it(expected, () => {
      const configFile = resolveUserConfigConventionalPath(source, source)
      expect(configFile).toEqual(path.resolve(source, expected))
    })
  })
})
