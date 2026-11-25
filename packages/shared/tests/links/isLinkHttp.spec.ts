import { expect, it } from 'vitest'

import { isLinkHttp } from '../../src/index.js'

const TEST_CASES: [string, ReturnType<typeof isLinkHttp>][] = [
  ['https://foobar.com', true],
  ['http://foobar.com', true],
  ['//foobar.com', true],

  // upper/mixed case protocol
  ['HTTPS://x', true],
  ['HTTP://x', true],
  ['HtTp://x', true],

  // protocol-relative link
  ['//cdn.example.com/x', true],

  // other protocols
  ['Mailto:a@b', false],
  ['tel:+1', false],
  ['ftp://foobar.com', false],

  // windows drive letter path
  ['C:\\docs\\a.md', false],
  ['c:/docs', false],

  // internal links
  ['/internal', false],
  ['internal.md', false],
  ['#hash', false],
  ['?q=1', false],

  ['foobar.com', false],
  ['/foo/bar', false],
]

TEST_CASES.forEach(([source, expected]) => {
  it(`link: ${source}`, () => {
    expect(isLinkHttp(source)).toBe(expected)
  })
})
