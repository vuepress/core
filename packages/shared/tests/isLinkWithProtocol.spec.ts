import { expect, it } from 'vitest'
import { isLinkWithProtocol } from '../src/index.js'

const testCases: [string, ReturnType<typeof isLinkWithProtocol>][] = [
  ['ftp://foobar.com', true],
  ['ms-windows-store://home', true],
  ['mailto:foobar', true],
  ['tel:foobar', true],
  ['https://foobar.com', true],
  ['http://foobar.com', true],
  ['foobar.com', false],
  ['/foo/bar', false],
  ['../foo/bar', false],
  ['//foobar.com', false],
]

testCases.forEach(([source, expected]) => {
  it(`link: ${source}`, () => {
    expect(isLinkWithProtocol(source)).toBe(expected)
  })
})
