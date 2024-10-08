import { expect, it } from 'vitest'
import { resolveRoutePathFromUrl } from '../../src/index.js'

const TEST_CASES: [
  Parameters<typeof resolveRoutePathFromUrl>,
  ReturnType<typeof resolveRoutePathFromUrl>,
][] = [
  // with default base `/`
  [['https://vuepress.vuejs.org/base/foo'], '/base/foo'],
  [['http://vuepress.vuejs.org/base/foo'], '/base/foo'],
  [['//vuepress.vuejs.org/base/foo'], '/base/foo'],
  [['/base/foo'], '/base/foo'],
  [['base/foo'], 'base/foo'],

  // with base `/base/`
  [['https://vuepress.vuejs.org/base/foo', '/base/'], '/foo'],
  [['http://vuepress.vuejs.org/base/foo', '/base/'], '/foo'],
  [['//vuepress.vuejs.org/base/foo', '/base/'], '/foo'],
  [['//vuepress.vuejs.org/foo/bar', '/base/'], '/foo/bar'],
  [['/base/foo', '/base/'], '/foo'],
  [['/foo/bar', '/base/'], '/foo/bar'],
  [['base/foo', '/base/'], 'base/foo'],
  [['foo/bar', '/base/'], 'foo/bar'],
]

TEST_CASES.forEach(([source, expected]) => {
  it(`url: ${source[0]}, base: ${
    source[1] ?? '/'
  } => expected: ${expected}`, () => {
    expect(resolveRoutePathFromUrl(...source)).toEqual(expected)
  })
})
