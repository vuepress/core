import { expect, it } from 'vitest'

import { isLinkWithProtocol } from '../../src/index.js'

const TEST_CASES: [string, ReturnType<typeof isLinkWithProtocol>][] = [
  // with protocol
  ['ftp://foobar.com', true],
  ['ms-windows-store://home', true],
  ['mailto:foobar', true],
  ['tel:foobar', true],
  ['https://foobar.com', true],
  ['http://foobar.com', true],
  ['//foobar.com', true],

  // with protocol in upper/mixed case
  ['HTTPS://x', true],
  ['HTTP://x', true],
  ['HtTpS://x', true],
  ['FTP://foobar.com', true],
  ['Mailto:a@b', true],
  ['tel:+1', true],
  ['MS-WINDOWS-STORE://home', true],

  // protocol-relative link
  ['//cdn.example.com/x', true],

  // windows drive letter path
  ['C:\\docs\\a.md', false],
  ['C:/docs/a.md', false],
  ['c:/docs', false],

  // hostname
  ['foobar.com', false],

  // pathname
  ['/foo/bar', false],
  ['/internal', false],

  // relative path
  ['../foo/bar', false],
  ['./foo/bar', false],
  ['foo/bar', false],
  ['internal.md', false],

  // hash and query
  ['#hash', false],
  ['?q=1', false],
]

TEST_CASES.forEach(([source, expected]) => {
  it(`link: ${source}`, () => {
    expect(isLinkWithProtocol(source)).toBe(expected)
  })
})
