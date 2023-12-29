import { expect, it } from 'vitest'
import { isLinkHttp } from '../src/index.js'

const testCases: [string, ReturnType<typeof isLinkHttp>][] = [
  ['https://foobar.com', true],
  ['http://foobar.com', true],
  ['//foobar.com', true],
  ['foobar.com', false],
  ['/foo/bar', false],
]

testCases.forEach(([source, expected]) => {
  it(`link: ${source}`, () => {
    expect(isLinkHttp(source)).toBe(expected)
  })
})
