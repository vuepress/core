import * as MarkdownIt from 'markdown-it'
import { assetsPlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'

const source = [
  '![foo](./foo.png)',
  '![foo2](../sub/foo.png)',
  '![foo-bar](./foo/bar.png)',
  '![foo-bar2](../sub/foo/bar.png)',
  '![baz](../baz.png)',
  '![out](../../out.png)',
  '![invalid](.../invalid.png)',
  '![absolute](/absolute.png)',
  '![url](http://foobar.com/icon.png)',
  '![empty]()',
  '![alias](@alias/foo.png)',
  '![~alias](~@alias/foo.png)',
  '![中国](./中国.png)',
  '![finish](./100%.png)',
].join('\n\n')

describe('@vuepress/markdown > plugins > assetsPlugin', () => {
  it('should handle assets link with default options', () => {
    const md = MarkdownIt().use(assetsPlugin)
    const env: MarkdownEnv = {
      filePathRelative: 'sub/foo.md',
    }

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        '<img src="@source/sub/foo.png" alt="foo">',
        '<img src="@source/sub/foo.png" alt="foo2">',
        '<img src="@source/sub/foo/bar.png" alt="foo-bar">',
        '<img src="@source/sub/foo/bar.png" alt="foo-bar2">',
        '<img src="@source/baz.png" alt="baz">',
        '<img src="@source/../out.png" alt="out">',
        '<img src=".../invalid.png" alt="invalid">',
        '<img src="/absolute.png" alt="absolute">',
        '<img src="http://foobar.com/icon.png" alt="url">',
        '<img src="" alt="empty">',
        '<img src="@alias/foo.png" alt="alias">',
        '<img src="~@alias/foo.png" alt="~alias">',
        '<img src="@source/sub/中国.png" alt="中国">',
        '<img src="@source/sub/100%.png" alt="finish">',
      ]
        .map((item) => `<p>${item}</p>`)
        .join('\n') + '\n'
    )
  })

  it('should respect `relativePathPrefix` option', () => {
    const md = MarkdownIt().use(assetsPlugin, {
      relativePathPrefix: '@foo',
    })
    const env: MarkdownEnv = {
      filePathRelative: 'sub/foo.md',
    }

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        '<img src="@foo/sub/foo.png" alt="foo">',
        '<img src="@foo/sub/foo.png" alt="foo2">',
        '<img src="@foo/sub/foo/bar.png" alt="foo-bar">',
        '<img src="@foo/sub/foo/bar.png" alt="foo-bar2">',
        '<img src="@foo/baz.png" alt="baz">',
        '<img src="@foo/../out.png" alt="out">',
        '<img src=".../invalid.png" alt="invalid">',
        '<img src="/absolute.png" alt="absolute">',
        '<img src="http://foobar.com/icon.png" alt="url">',
        '<img src="" alt="empty">',
        '<img src="@alias/foo.png" alt="alias">',
        '<img src="~@alias/foo.png" alt="~alias">',
        '<img src="@foo/sub/中国.png" alt="中国">',
        '<img src="@foo/sub/100%.png" alt="finish">',
      ]
        .map((item) => `<p>${item}</p>`)
        .join('\n') + '\n'
    )
  })

  it('should not handle assets link if `filePathRelative` is not provided', () => {
    const md = MarkdownIt().use(assetsPlugin)
    const env: MarkdownEnv = {}

    const rendered = md.render(source, env)

    expect(rendered).toEqual(
      [
        '<img src="./foo.png" alt="foo">',
        '<img src="../sub/foo.png" alt="foo2">',
        '<img src="./foo/bar.png" alt="foo-bar">',
        '<img src="../sub/foo/bar.png" alt="foo-bar2">',
        '<img src="../baz.png" alt="baz">',
        '<img src="../../out.png" alt="out">',
        '<img src=".../invalid.png" alt="invalid">',
        '<img src="/absolute.png" alt="absolute">',
        '<img src="http://foobar.com/icon.png" alt="url">',
        '<img src="" alt="empty">',
        '<img src="@alias/foo.png" alt="alias">',
        '<img src="~@alias/foo.png" alt="~alias">',
        '<img src="./%E4%B8%AD%E5%9B%BD.png" alt="中国">',
        '<img src="./100%25.png" alt="finish">',
      ]
        .map((item) => `<p>${item}</p>`)
        .join('\n') + '\n'
    )
  })
})
