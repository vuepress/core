import { resolveAppEnv, resolveAppOptions } from '@vuepress/core'

const source = '/foo'

const testCases: [
  Parameters<typeof resolveAppEnv>,
  ReturnType<typeof resolveAppEnv>
][] = [
  [
    [resolveAppOptions({ source }), false],
    {
      isBuild: false,
      isDev: true,
      isDebug: false,
    },
  ],
  [
    [resolveAppOptions({ source, debug: true }), false],
    {
      isBuild: false,
      isDev: true,
      isDebug: true,
    },
  ],
  [
    [resolveAppOptions({ source }), true],
    {
      isBuild: true,
      isDev: false,
      isDebug: false,
    },
  ],
]

describe('core > app > resolveAppEnv', () => {
  describe('should create app env correctly', () => {
    testCases.forEach(([params, expected], i) => {
      it(`case ${i}`, () => {
        expect(resolveAppEnv(...params)).toEqual(expected)
      })
    })
  })
})
