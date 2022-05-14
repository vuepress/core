import { isLinkExternal } from '@vuepress/shared'

const testCases: [
  Parameters<typeof isLinkExternal>,
  ReturnType<typeof isLinkExternal>
][] = [
  // http & ftp links
  [['https://foobar.com'], true],
  [['https://foobar.com', '/base/'], true],
  [['http://foobar.com'], true],
  [['http://foobar.com', '/base/'], true],
  [['//foobar.com'], true],
  [['//foobar.com', '/base/'], true],
  [['ftp://foobar.com'], true],
  [['ftp://foobar.com', '/base/'], true],
  [['https://foobar.com/base/README.md'], true],
  [['https://foobar.com/base/README.md', '/base/'], true],
  [['http://foobar.com/base/README.md'], true],
  [['http://foobar.com/base/README.md', '/base/'], true],
  [['//foobar.com/base/README.md'], true],
  [['//foobar.com/base/README.md', '/base/'], true],
  [['ftp://foobar.com/base/README.md'], true],
  [['ftp://foobar.com/base/README.md', '/base/'], true],

  // links with other protocols
  [['mailto:foobar', '/base/'], false],
  [['tel:foobar', '/base/'], false],

  // absolute links
  [['/foo/bar'], false],
  [['/foo/bar', '/base/'], true],
  [['/foo/bar', '/foo/'], false],
  [['/foo/bar/baz.md'], false],
  [['/foo/bar/baz.md', '/base/'], false],
  [['/foo/bar/baz.md', '/foo/'], false],

  // relative links
  [['foobar.com'], false],
  [['foobar.com', '/base/'], false],
  [['foo/bar'], false],
  [['foo/bar', '/base/'], false],
  [['foo/bar', '/foo/'], false],
  [['foo/bar/baz.md'], false],
  [['foo/bar/baz.md', '/base/'], false],
  [['foo/bar/baz.md', '/foo/'], false],
]

describe('shared > isLinkExternal', () => {
  describe('should determine external link correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source[0]}, base: ${source[1] || '/'}`, () => {
        expect(isLinkExternal(...source)).toBe(expected)
      })
    })
  })
})
