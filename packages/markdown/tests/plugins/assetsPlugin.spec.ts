import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { assetsPlugin } from '../../src/index.js'
import type { MarkdownEnv } from '../../src/index.js'

describe('@vuepress/markdown > plugins > assetsPlugin', () => {
  describe('markdown image syntax', () => {
    const source = [
      // relative paths
      '![foo](./foo.png)',
      '![foo2](../sub/foo.png)',
      '![foo-bar](./foo/bar.png)',
      '![foo-bar2](../sub/foo/bar.png)',
      '![baz](../baz.png)',
      '![out](../../out.png)',
      '![汉字](./汉字.png)',
      '![100%](./100%.png)',
      // absolute paths
      '![absolute](/absolute.png)',
      '![absolute-foo](/foo/absolute.png)',
      // no-prefix paths
      '![no-prefix](no-prefix.png)',
      '![no-prefix-foo](foo/no-prefix.png)',
      '![alias](@alias/foo.png)',
      '![汉字](@alias/汉字.png)',
      '![100%](@alias/100%.png)',
      '![~alias](~@alias/foo.png)',
      '![~汉字](~@alias/汉字.png)',
      '![~100%](~@alias/100%.png)',
      // keep as is
      '![url](http://foobar.com/icon.png)',
      '![empty]()',
      // invalid paths
      '![invalid](.../invalid.png)',
      '![汉字](.../汉字.png)',
      '![100%](.../100%.png)',
    ]

    const testCases: {
      description: string
      md: MarkdownIt
      env: MarkdownEnv
      expected: string[]
    }[] = [
      {
        description: 'should handle assets link with default options',
        md: MarkdownIt().use(assetsPlugin),
        env: {
          filePathRelative: 'sub/foo.md',
        },
        expected: [
          // relative paths
          '<img src="@source/sub/foo.png" alt="foo">',
          '<img src="@source/sub/foo.png" alt="foo2">',
          '<img src="@source/sub/foo/bar.png" alt="foo-bar">',
          '<img src="@source/sub/foo/bar.png" alt="foo-bar2">',
          '<img src="@source/baz.png" alt="baz">',
          '<img src="@source/../out.png" alt="out">',
          '<img src="@source/sub/汉字.png" alt="汉字">',
          '<img src="@source/sub/100%.png" alt="100%">',
          // absolute paths
          '<img src="/absolute.png" alt="absolute">',
          '<img src="/foo/absolute.png" alt="absolute-foo">',
          // no-prefix paths
          '<img src="@source/sub/no-prefix.png" alt="no-prefix">',
          '<img src="@source/sub/foo/no-prefix.png" alt="no-prefix-foo">',
          '<img src="@source/sub/@alias/foo.png" alt="alias">',
          '<img src="@source/sub/@alias/汉字.png" alt="汉字">',
          '<img src="@source/sub/@alias/100%.png" alt="100%">',
          '<img src="@source/sub/~@alias/foo.png" alt="~alias">',
          '<img src="@source/sub/~@alias/汉字.png" alt="~汉字">',
          '<img src="@source/sub/~@alias/100%.png" alt="~100%">',
          // keep as is
          '<img src="http://foobar.com/icon.png" alt="url">',
          '<img src="" alt="empty">',
          // invalid paths
          '<img src="@source/sub/.../invalid.png" alt="invalid">',
          '<img src="@source/sub/.../汉字.png" alt="汉字">',
          '<img src="@source/sub/.../100%.png" alt="100%">',
        ],
      },
      {
        description: 'should respect `relativePathPrefix` option',
        md: MarkdownIt().use(assetsPlugin, {
          relativePathPrefix: '@foo',
        }),
        env: {
          filePathRelative: 'sub/foo.md',
        },
        expected: [
          // relative paths
          '<img src="@foo/sub/foo.png" alt="foo">',
          '<img src="@foo/sub/foo.png" alt="foo2">',
          '<img src="@foo/sub/foo/bar.png" alt="foo-bar">',
          '<img src="@foo/sub/foo/bar.png" alt="foo-bar2">',
          '<img src="@foo/baz.png" alt="baz">',
          '<img src="@foo/../out.png" alt="out">',
          '<img src="@foo/sub/汉字.png" alt="汉字">',
          '<img src="@foo/sub/100%.png" alt="100%">',
          // absolute paths
          '<img src="/absolute.png" alt="absolute">',
          '<img src="/foo/absolute.png" alt="absolute-foo">',
          // no-prefix paths
          '<img src="@foo/sub/no-prefix.png" alt="no-prefix">',
          '<img src="@foo/sub/foo/no-prefix.png" alt="no-prefix-foo">',
          '<img src="@foo/sub/@alias/foo.png" alt="alias">',
          '<img src="@foo/sub/@alias/汉字.png" alt="汉字">',
          '<img src="@foo/sub/@alias/100%.png" alt="100%">',
          '<img src="@foo/sub/~@alias/foo.png" alt="~alias">',
          '<img src="@foo/sub/~@alias/汉字.png" alt="~汉字">',
          '<img src="@foo/sub/~@alias/100%.png" alt="~100%">',
          // keep as is
          '<img src="http://foobar.com/icon.png" alt="url">',
          '<img src="" alt="empty">',
          // invalid paths
          '<img src="@foo/sub/.../invalid.png" alt="invalid">',
          '<img src="@foo/sub/.../汉字.png" alt="汉字">',
          '<img src="@foo/sub/.../100%.png" alt="100%">',
        ],
      },
      {
        description:
          'should not handle relative paths if `env.filePathRelative` is not provided',
        md: MarkdownIt().use(assetsPlugin),
        env: {},
        expected: [
          // relative paths
          '<img src="./foo.png" alt="foo">',
          '<img src="../sub/foo.png" alt="foo2">',
          '<img src="./foo/bar.png" alt="foo-bar">',
          '<img src="../sub/foo/bar.png" alt="foo-bar2">',
          '<img src="../baz.png" alt="baz">',
          '<img src="../../out.png" alt="out">',
          '<img src="./汉字.png" alt="汉字">',
          '<img src="./100%.png" alt="100%">',
          // absolute paths
          '<img src="/absolute.png" alt="absolute">',
          '<img src="/foo/absolute.png" alt="absolute-foo">',
          // no-prefix paths
          '<img src="no-prefix.png" alt="no-prefix">',
          '<img src="foo/no-prefix.png" alt="no-prefix-foo">',
          '<img src="@alias/foo.png" alt="alias">',
          '<img src="@alias/汉字.png" alt="汉字">',
          '<img src="@alias/100%.png" alt="100%">',
          '<img src="~@alias/foo.png" alt="~alias">',
          '<img src="~@alias/汉字.png" alt="~汉字">',
          '<img src="~@alias/100%.png" alt="~100%">',
          // keep as is
          '<img src="http://foobar.com/icon.png" alt="url">',
          '<img src="" alt="empty">',
          // invalid paths
          '<img src=".../invalid.png" alt="invalid">',
          '<img src=".../汉字.png" alt="汉字">',
          '<img src=".../100%.png" alt="100%">',
        ],
      },
    ]

    testCases.forEach(({ description, md, env, expected }) =>
      it(description, () => {
        expect(md.render(source.join('\n\n'), env)).toEqual(
          expected.map((item) => `<p>${item}</p>`).join('\n') + '\n'
        )
      })
    )
  })

  describe('html <img> tag', () => {
    describe('single-line', () => {
      const source = [
        /* src */
        // relative paths
        '<img src="./foo.png">',
        '<img src="../sub/foo.png">',
        '<img src="./foo/bar.png">',
        '<img src="../sub/foo/bar.png">',
        '<img src="../baz.png">',
        '<img src="../../out.png">',
        '<img src="./汉字.png">',
        '<img src="./100%.png">',
        '<img alt="attrs" src="./attrs.png" width="100px">',
        // aliases
        '<img src="@alias/foo.png">',
        '<img src="@alias/汉字.png">',
        '<img src="@alias/100%.png">',
        '<img alt="attrs" src="@alias/attrs.png" width="100px">',
        // webpack legacy aliases
        '<img src="~@alias/foo.png">',
        '<img src="~@alias/汉字.png">',
        '<img src="~@alias/100%.png">',
        '<img alt="attrs" src="~@alias/attrs.png" width="100px">',
        // absolute paths
        '<img src="/absolute.png">',
        '<img src="/foo/absolute.png">',
        // no-prefix paths
        '<img src="no-prefix.png">',
        '<img src="foo/no-prefix.png">',
        '<img alt="attrs" src="attrs.png" width="100px">',
        // keep as is
        '<img src="http://foobar.com/icon.png">',
        '<img src="">',
        // invalid paths
        '<img src=".../invalid.png">',
        '<img src=".../汉字.png">',
        '<img src=".../100%.png">',
        '<img alt="attrs" src=".../attrs.png" width="100px">',

        /* srcset */
        // relative paths
        '<img srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../sub/foo/bar.png 2048w, ../baz.png 4096w, ../../out.png">',
        '<img srcset="./汉字.png 1x, ./100%.png">',
        '<img alt="attrs" srcset="./attrs.png" width="100px">',
        // aliases
        '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x">',
        '<img alt="attrs" srcset="@alias/attrs.png 1024w" width="100px">',
        // webpack legacy aliases
        '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x">',
        '<img alt="attrs" srcset="~@alias/attrs.png 1024w" width="100px">',
        // keep as is
        '<img srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
        '<img srcset="">',
        '<img alt="attrs" srcset="attrs.png 1x, default.png" width="100px">',
        // invalid paths
        '<img srcset=".../invalid.png 1x, .../汉字.png 2x, .../100%.png 3x">',
        '<img alt="attrs" srcset=".../attrs.png 1x, .../default.png" width="100px">',
        // invalid srcset
        '<img srcset="../invalid.png, ../汉字.png, .../100%.png 3x">',

        /* both */
        // relative paths
        '<img srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../sub/foo/bar.png 2048w, ../baz.png 4096w, ../../out.png 3x" src="./default.png">',
        '<img src="./100%.png" srcset="./汉字.png 1x">',
        '<img src="./default.png" srcset="./attrs1.png 1x, ./attrs2.png 2x" alt="attrs" width="100px">',
        // aliases
        '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x" alt="attrs" src="@alias/attrs.png" width="100px">',
        '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x" alt="attrs" src="~@alias/attrs.png" width="100px">',
        // keep as is
        '<img alt="attrs" src="" width="100px" srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
      ]

      const testCases: {
        description: string
        md: MarkdownIt
        env: MarkdownEnv
        expected: string[]
      }[] = [
        {
          description: 'should handle assets link with default options',
          md: MarkdownIt({ html: true }).use(assetsPlugin),
          env: {
            filePathRelative: 'sub/foo.md',
          },
          expected: [
            /* src */
            // relative paths
            '<img src="@source/sub/foo.png">',
            '<img src="@source/sub/foo.png">',
            '<img src="@source/sub/foo/bar.png">',
            '<img src="@source/sub/foo/bar.png">',
            '<img src="@source/baz.png">',
            '<img src="@source/../out.png">',
            '<img src="@source/sub/汉字.png">',
            '<img src="@source/sub/100%.png">',
            '<img alt="attrs" src="@source/sub/attrs.png" width="100px">',
            // aliases
            '<img src="@alias/foo.png">',
            '<img src="@alias/汉字.png">',
            '<img src="@alias/100%.png">',
            '<img alt="attrs" src="@alias/attrs.png" width="100px">',
            // webpack legacy aliases
            '<img src="~@alias/foo.png">',
            '<img src="~@alias/汉字.png">',
            '<img src="~@alias/100%.png">',
            '<img alt="attrs" src="~@alias/attrs.png" width="100px">',
            // absolute paths
            '<img src="/absolute.png">',
            '<img src="/foo/absolute.png">',
            // no-prefix paths
            '<img src="no-prefix.png">',
            '<img src="foo/no-prefix.png">',
            '<img alt="attrs" src="attrs.png" width="100px">',
            // keep as is
            '<img src="http://foobar.com/icon.png">',
            '<img src="">',
            // invalid paths
            '<img src=".../invalid.png">',
            '<img src=".../汉字.png">',
            '<img src=".../100%.png">',
            '<img alt="attrs" src=".../attrs.png" width="100px">',

            /* srcset */
            // relative paths
            '<img srcset="@source/sub/foo.png 1x, @source/sub/foo.png 2x, @source/sub/foo/bar.png 1024w, @source/sub/foo/bar.png 2048w, @source/baz.png 4096w, @source/../out.png">',
            '<img srcset="@source/sub/汉字.png 1x, @source/sub/100%.png">',
            '<img alt="attrs" srcset="@source/sub/attrs.png" width="100px">',
            // aliases
            '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x">',
            '<img alt="attrs" srcset="@alias/attrs.png 1024w" width="100px">',
            // webpack legacy aliases
            '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x">',
            '<img alt="attrs" srcset="~@alias/attrs.png 1024w" width="100px">',
            // keep as is
            '<img srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
            '<img srcset="">',
            '<img alt="attrs" srcset="attrs.png 1x, default.png" width="100px">',
            // invalid paths
            '<img srcset=".../invalid.png 1x, .../汉字.png 2x, .../100%.png 3x">',
            '<img alt="attrs" srcset=".../attrs.png 1x, .../default.png" width="100px">',
            // invalid srcset
            '<img srcset="@source/invalid.png, @source/汉字.png, .../100%.png 3x">',

            /* both */
            // relative paths
            '<img srcset="@source/sub/foo.png 1x, @source/sub/foo.png 2x, @source/sub/foo/bar.png 1024w, @source/sub/foo/bar.png 2048w, @source/baz.png 4096w, @source/../out.png 3x" src="@source/sub/default.png">',
            '<img src="@source/sub/100%.png" srcset="@source/sub/汉字.png 1x">',
            '<img src="@source/sub/default.png" srcset="@source/sub/attrs1.png 1x, @source/sub/attrs2.png 2x" alt="attrs" width="100px">',
            // aliases
            '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x" alt="attrs" src="@alias/attrs.png" width="100px">',
            '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x" alt="attrs" src="~@alias/attrs.png" width="100px">',
            // keep as is
            '<img alt="attrs" src="" width="100px" srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
          ],
        },
        {
          description: 'should respect `relativePathPrefix` option',
          md: MarkdownIt({ html: true }).use(assetsPlugin, {
            relativePathPrefix: '@foo',
          }),
          env: {
            filePathRelative: 'sub/foo.md',
          },
          expected: [
            /* src */
            // relative paths
            '<img src="@foo/sub/foo.png">',
            '<img src="@foo/sub/foo.png">',
            '<img src="@foo/sub/foo/bar.png">',
            '<img src="@foo/sub/foo/bar.png">',
            '<img src="@foo/baz.png">',
            '<img src="@foo/../out.png">',
            '<img src="@foo/sub/汉字.png">',
            '<img src="@foo/sub/100%.png">',
            '<img alt="attrs" src="@foo/sub/attrs.png" width="100px">',
            // aliases
            '<img src="@alias/foo.png">',
            '<img src="@alias/汉字.png">',
            '<img src="@alias/100%.png">',
            '<img alt="attrs" src="@alias/attrs.png" width="100px">',
            // webpack legacy aliases
            '<img src="~@alias/foo.png">',
            '<img src="~@alias/汉字.png">',
            '<img src="~@alias/100%.png">',
            '<img alt="attrs" src="~@alias/attrs.png" width="100px">',
            // absolute paths
            '<img src="/absolute.png">',
            '<img src="/foo/absolute.png">',
            // no-prefix paths
            '<img src="no-prefix.png">',
            '<img src="foo/no-prefix.png">',
            '<img alt="attrs" src="attrs.png" width="100px">',
            // keep as is
            '<img src="http://foobar.com/icon.png">',
            '<img src="">',
            // invalid paths
            '<img src=".../invalid.png">',
            '<img src=".../汉字.png">',
            '<img src=".../100%.png">',
            '<img alt="attrs" src=".../attrs.png" width="100px">',

            /* srcset */
            // relative paths
            '<img srcset="@foo/sub/foo.png 1x, @foo/sub/foo.png 2x, @foo/sub/foo/bar.png 1024w, @foo/sub/foo/bar.png 2048w, @foo/baz.png 4096w, @foo/../out.png">',
            '<img srcset="@foo/sub/汉字.png 1x, @foo/sub/100%.png">',
            '<img alt="attrs" srcset="@foo/sub/attrs.png" width="100px">',
            // aliases
            '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x">',
            '<img alt="attrs" srcset="@alias/attrs.png 1024w" width="100px">',
            // webpack legacy aliases
            '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x">',
            '<img alt="attrs" srcset="~@alias/attrs.png 1024w" width="100px">',
            // keep as is
            '<img srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
            '<img srcset="">',
            '<img alt="attrs" srcset="attrs.png 1x, default.png" width="100px">',
            // invalid paths
            '<img srcset=".../invalid.png 1x, .../汉字.png 2x, .../100%.png 3x">',
            '<img alt="attrs" srcset=".../attrs.png 1x, .../default.png" width="100px">',
            // invalid srcset
            '<img srcset="@foo/invalid.png, @foo/汉字.png, .../100%.png 3x">',

            /* both */
            // relative paths
            '<img srcset="@foo/sub/foo.png 1x, @foo/sub/foo.png 2x, @foo/sub/foo/bar.png 1024w, @foo/sub/foo/bar.png 2048w, @foo/baz.png 4096w, @foo/../out.png 3x" src="@foo/sub/default.png">',
            '<img src="@foo/sub/100%.png" srcset="@foo/sub/汉字.png 1x">',
            '<img src="@foo/sub/default.png" srcset="@foo/sub/attrs1.png 1x, @foo/sub/attrs2.png 2x" alt="attrs" width="100px">',
            // aliases
            '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x" alt="attrs" src="@alias/attrs.png" width="100px">',
            '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x" alt="attrs" src="~@alias/attrs.png" width="100px">',
            // keep as is
            '<img alt="attrs" src="" width="100px" srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
          ],
        },
        {
          description:
            'should not handle relative paths if `env.filePathRelative` is not provided',
          md: MarkdownIt({ html: true }).use(assetsPlugin),
          env: {},
          expected: [
            /* src */
            // relative paths
            '<img src="./foo.png">',
            '<img src="../sub/foo.png">',
            '<img src="./foo/bar.png">',
            '<img src="../sub/foo/bar.png">',
            '<img src="../baz.png">',
            '<img src="../../out.png">',
            '<img src="./汉字.png">',
            '<img src="./100%.png">',
            '<img alt="attrs" src="./attrs.png" width="100px">',
            // aliases
            '<img src="@alias/foo.png">',
            '<img src="@alias/汉字.png">',
            '<img src="@alias/100%.png">',
            '<img alt="attrs" src="@alias/attrs.png" width="100px">',
            // webpack legacy aliases
            '<img src="~@alias/foo.png">',
            '<img src="~@alias/汉字.png">',
            '<img src="~@alias/100%.png">',
            '<img alt="attrs" src="~@alias/attrs.png" width="100px">',
            // absolute paths
            '<img src="/absolute.png">',
            '<img src="/foo/absolute.png">',
            // no-prefix paths
            '<img src="no-prefix.png">',
            '<img src="foo/no-prefix.png">',
            '<img alt="attrs" src="attrs.png" width="100px">',
            // keep as is
            '<img src="http://foobar.com/icon.png">',
            '<img src="">',
            // invalid paths
            '<img src=".../invalid.png">',
            '<img src=".../汉字.png">',
            '<img src=".../100%.png">',
            '<img alt="attrs" src=".../attrs.png" width="100px">',

            /* srcset */
            // relative paths
            '<img srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../sub/foo/bar.png 2048w, ../baz.png 4096w, ../../out.png">',
            '<img srcset="./汉字.png 1x, ./100%.png">',
            '<img alt="attrs" srcset="./attrs.png" width="100px">',
            // aliases
            '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x">',
            '<img alt="attrs" srcset="@alias/attrs.png 1024w" width="100px">',
            // webpack legacy aliases
            '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x">',
            '<img alt="attrs" srcset="~@alias/attrs.png 1024w" width="100px">',
            // keep as is
            '<img srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
            '<img srcset="">',
            '<img alt="attrs" srcset="attrs.png 1x, default.png" width="100px">',
            // invalid paths
            '<img srcset=".../invalid.png 1x, .../汉字.png 2x, .../100%.png 3x">',
            '<img alt="attrs" srcset=".../attrs.png 1x, .../default.png" width="100px">',
            // invalid srcset
            '<img srcset="../invalid.png, ../汉字.png, .../100%.png 3x">',

            /* both */
            // relative paths
            '<img srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../sub/foo/bar.png 2048w, ../baz.png 4096w, ../../out.png 3x" src="./default.png">',
            '<img src="./100%.png" srcset="./汉字.png 1x">',
            '<img src="./default.png" srcset="./attrs1.png 1x, ./attrs2.png 2x" alt="attrs" width="100px">',
            // aliases
            '<img srcset="@alias/foo.png 1x, @alias/汉字.png 2x, @alias/100%.png 3x" alt="attrs" src="@alias/attrs.png" width="100px">',
            '<img srcset="~@alias/foo.png 1x, ~@alias/汉字.png 2x, ~@alias/100%.png 3x" alt="attrs" src="~@alias/attrs.png" width="100px">',
            // keep as is
            '<img alt="attrs" src="" width="100px" srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
          ],
        },
      ]

      testCases.forEach(({ description, md, env, expected }) =>
        it(description, () => {
          // block
          expect(md.render(source.join('\n\n'), env)).toEqual(
            expected.map((item) => `${item}`).join('\n')
          )

          // block with leading white space
          expect(
            md.render(source.map((item) => `   ${item}`).join('\n\n'), env)
          ).toEqual(expected.map((item) => `   ${item}`).join('\n'))

          // inline with prefix
          expect(
            md.render(source.map((item) => `foo${item}`).join('\n\n'), env)
          ).toEqual(
            expected.map((item) => `<p>foo${item}</p>`).join('\n') + '\n'
          )

          // inline with suffix
          expect(
            md.render(source.map((item) => `${item}foo`).join('\n\n'), env)
          ).toEqual(
            expected.map((item) => `<p>${item}foo</p>`).join('\n') + '\n'
          )

          // inline with line break
          expect(
            md.render(
              source.map((item) => item.replace('<img', '<img\n')).join('\n\n'),
              env
            )
          ).toEqual(
            expected
              .map((item) => `<p>${item.replace('<img', '<img\n')}</p>`)
              .join('\n') + '\n'
          )

          // wrapped item
          expect(
            md.render(source.map((item) => `<p>${item}</p>`).join('\n\n'), env)
          ).toEqual(expected.map((item) => `<p>${item}</p>`).join('\n'))

          // wrapped item with line break
          expect(
            md.render(
              source
                .map((item) => `<p>${item.replace('<img', '<img\n')}</p>`)
                .join('\n\n'),
              env
            )
          ).toEqual(
            expected
              .map((item) => `<p>${item.replace('<img', '<img\n')}</p>`)
              .join('\n')
          )

          // wrapped multiple items
          expect(
            md.render(
              source.map((item) => `<p>${item}${item}</p>`).join('\n\n'),
              env
            )
          ).toEqual(expected.map((item) => `<p>${item}${item}</p>`).join('\n'))

          // deeply wrapped multiple items
          expect(
            md.render(
              source
                .map((item) => `<p>\n<span>\n${item}\n${item}\n</span>\n</p>`)
                .join('\n\n'),
              env
            )
          ).toEqual(
            expected
              .map((item) => `<p>\n<span>\n${item}\n${item}\n</span>\n</p>`)
              .join('\n')
          )
        })
      )
    })

    // multi-line `<img>` tag will be wrapped with `<p>` tag
    describe('multi-line', () => {
      const source = [
        /* src */
        `<img alt="attrs" src="
          .../attrs.png
          " width="100px">`,

        /* srcset */
        `<img srcset="./foo.png      1x  ,
              ../sub/foo.png  2x,./foo/bar.png
    1024w ,../../out.png">`,
        `<img alt="attrs"  srcset=" ./attrs.png 1x
    ,default.png " width="100px">`,

        /** both */
        `<img src="
          ./default.png
    " srcset="./foo.png      1x  ,
              ../sub/foo.png  2x,./foo/bar.png
    1024w ,../../out.png">`,
        `<img alt="attrs" src="./default.png" srcset=" ./attrs.png 1x
    ,default.png " width="100px">`,
      ]

      const testCases: {
        description: string
        md: MarkdownIt
        env: MarkdownEnv
        expected: string[]
      }[] = [
        {
          description: 'should handle assets link with default options',
          md: MarkdownIt({ html: true }).use(assetsPlugin),
          env: {
            filePathRelative: 'sub/foo.md',
          },
          expected: [
            /* src */
            '<p><img alt="attrs" src=".../attrs.png" width="100px"></p>',

            /* srcset */
            '<p><img srcset="@source/sub/foo.png 1x, @source/sub/foo.png 2x, @source/sub/foo/bar.png 1024w, @source/../out.png"></p>',
            '<p><img alt="attrs"  srcset="@source/sub/attrs.png 1x, default.png" width="100px"></p>',

            /* both */
            '<p><img src="@source/sub/default.png" srcset="@source/sub/foo.png 1x, @source/sub/foo.png 2x, @source/sub/foo/bar.png 1024w, @source/../out.png"></p>',
            '<p><img alt="attrs" src="@source/sub/default.png" srcset="@source/sub/attrs.png 1x, default.png" width="100px"></p>',
          ],
        },
        {
          description: 'should respect `relativePathPrefix` option',
          md: MarkdownIt({ html: true }).use(assetsPlugin, {
            relativePathPrefix: '@foo',
          }),
          env: {
            filePathRelative: 'sub/foo.md',
          },
          expected: [
            /* src */
            '<p><img alt="attrs" src=".../attrs.png" width="100px"></p>',

            /* srcset */
            '<p><img srcset="@foo/sub/foo.png 1x, @foo/sub/foo.png 2x, @foo/sub/foo/bar.png 1024w, @foo/../out.png"></p>',
            '<p><img alt="attrs"  srcset="@foo/sub/attrs.png 1x, default.png" width="100px"></p>',

            /* both */
            '<p><img src="@foo/sub/default.png" srcset="@foo/sub/foo.png 1x, @foo/sub/foo.png 2x, @foo/sub/foo/bar.png 1024w, @foo/../out.png"></p>',
            '<p><img alt="attrs" src="@foo/sub/default.png" srcset="@foo/sub/attrs.png 1x, default.png" width="100px"></p>',
          ],
        },
        {
          description:
            'should not handle assets link if `filePathRelative` is not provided',
          md: MarkdownIt({ html: true }).use(assetsPlugin),
          env: {},
          expected: [
            /* src */
            '<p><img alt="attrs" src=".../attrs.png" width="100px"></p>',

            /* srcset */
            '<p><img srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../../out.png"></p>',
            '<p><img alt="attrs"  srcset="./attrs.png 1x, default.png" width="100px"></p>',

            /* both */
            '<p><img src="./default.png" srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../../out.png"></p>',
            '<p><img alt="attrs" src="./default.png" srcset="./attrs.png 1x, default.png" width="100px"></p>',
          ],
        },
      ]

      testCases.forEach(({ description, md, env, expected }) =>
        it(description, () => {
          // double quote
          expect(md.render(source.join('\n\n'), env)).toEqual(
            expected.map((item) => `${item}`).join('\n') + '\n'
          )
          // single quote
          expect(
            md.render(source.join('\n\n').replace(/"/g, "'"), env)
          ).toEqual(
            expected.map((item) => `${item}`.replace(/"/g, "'")).join('\n') +
              '\n'
          )
        })
      )
    })
  })
})
