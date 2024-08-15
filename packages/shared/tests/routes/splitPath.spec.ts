import { expect, it } from 'vitest'
import { splitPath } from '../../src/index.js'

const TEST_CASES: [string, ReturnType<typeof splitPath>][] = [
  ['/a/b/c/', { pathname: '/a/b/c/', hashAndQueries: '' }],
  ['/a/b/c/?a=1', { pathname: '/a/b/c/', hashAndQueries: '?a=1' }],
  ['/a/b/c/#b', { pathname: '/a/b/c/', hashAndQueries: '#b' }],
  ['/a/b/c/?a=1#b', { pathname: '/a/b/c/', hashAndQueries: '?a=1#b' }],
  ['a/index.html', { pathname: 'a/index.html', hashAndQueries: '' }],
  ['/a/index.html?a=1', { pathname: '/a/index.html', hashAndQueries: '?a=1' }],
  ['/a/index.html#a', { pathname: '/a/index.html', hashAndQueries: '#a' }],
  [
    '/a/index.html?a=1#b',
    { pathname: '/a/index.html', hashAndQueries: '?a=1#b' },
  ],
]

TEST_CASES.forEach(([source, expected]) => {
  it(`${source} -> ${JSON.stringify(expected)}`, () => {
    expect(splitPath(source)).toEqual(expected)
  })
})
