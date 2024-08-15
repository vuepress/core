import { expect, it } from 'vitest'
import { isLinkExternal } from '../../src/index.js'

const TEST_CASES: [
  Parameters<typeof isLinkExternal>,
  ReturnType<typeof isLinkExternal>,
][] = [
  // http links
  [['https://foobar.com'], true],
  [['https://foobar.com', '/base/'], true],
  [['http://foobar.com'], true],
  [['http://foobar.com', '/base/'], true],
  [['//foobar.com'], true],
  [['//foobar.com', '/base/'], true],
  [['https://foobar.com/base/README.md'], true],
  [['https://foobar.com/base/README.md', '/base/'], true],
  [['http://foobar.com/base/README.md'], true],
  [['http://foobar.com/base/README.md', '/base/'], true],
  [['//foobar.com/base/README.md'], true],
  [['//foobar.com/base/README.md', '/base/'], true],

  // links with other protocols
  [['mailto:foobar', '/base/'], true],
  [['tel:foobar', '/base/'], true],
  [['ftp://foobar.com'], true],
  [['ftp://foobar.com', '/base/'], true],
  [['ftp://foobar.com/base/README.md'], true],
  [['ftp://foobar.com/base/README.md', '/base/'], true],
  [['ms-windows-store://home', '/base/'], true],

  // absolute links
  [['/foo/bar'], false],
  [['/foo/bar', '/base/'], true],
  [['/foo/bar', '/foo/'], false],
  [['/foo/bar/baz.md'], false],
  [['/foo/bar/baz.md', '/base/'], false],
  [['/foo/bar/baz.md', '/foo/'], false],
  [['/foo/bar/baz.html'], false],
  [['/foo/bar/baz.html', '/base/'], true],
  [['/foo/bar/baz.html', '/foo/'], false],

  // relative links
  [['foobar.com'], false],
  [['foobar.com', '/base/'], false],
  [['foo/bar'], false],
  [['foo/bar', '/base/'], false],
  [['foo/bar', '/foo/'], false],
  [['foo/bar/baz.md'], false],
  [['foo/bar/baz.md', '/base/'], false],
  [['foo/bar/baz.md', '/foo/'], false],
  [['foo/bar/baz.html'], false],
  [['foo/bar/baz.html', '/base/'], false],
  [['foo/bar/baz.html', '/foo/'], false],
  [['./foo/bar'], false],
  [['./foo/bar', '/base/'], false],
  [['./foo/bar', '/foo/'], false],
  [['./foo/bar/baz.md'], false],
  [['./foo/bar/baz.md', '/base/'], false],
  [['./foo/bar/baz.md', '/foo/'], false],
  [['./foo/bar/baz.html'], false],
  [['./foo/bar/baz.html', '/base/'], false],
  [['./foo/bar/baz.html', '/foo/'], false],
]

TEST_CASES.forEach(([[link, base], expected]) => {
  it(`link: ${link}, base: ${base}`, () => {
    expect(isLinkExternal(link, base)).toBe(expected)
    expect(isLinkExternal(`${link}#foobar`, base)).toBe(expected)
    expect(isLinkExternal(`${link}?foo=bar`, base)).toBe(expected)
    expect(isLinkExternal(`${link}?foo=bar#foobar`, base)).toBe(expected)
  })
})
