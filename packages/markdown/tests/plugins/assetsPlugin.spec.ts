import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import type { MarkdownEnv } from '../../src/index.js'
import { assetsPlugin } from '../../src/index.js'

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
    // data uri
    '![data-uri](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wr4H/wAAAABJRU5ErkJggg==)',
  ]

  const TEST_CASES: {
    description: string
    md: MarkdownIt
    env: MarkdownEnv
    expected: string[]
  }[] = [
    {
      description: 'should handle assets link with default options',
      md: MarkdownIt().use(assetsPlugin),
      env: {
        base: '/base/',
      },
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
        // data uri
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wr4H/wAAAABJRU5ErkJggg==" alt="data-uri">',
      ],
    },
    {
      description: 'should respect `absolutePathPrependBase` option',
      md: MarkdownIt().use(assetsPlugin, {
        absolutePathPrependBase: true,
      }),
      env: {
        base: '/base/',
      },
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
        '<img src="/base/absolute.png" alt="absolute">',
        '<img src="/base/foo/absolute.png" alt="absolute-foo">',
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
        // data uri
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wr4H/wAAAABJRU5ErkJggg==" alt="data-uri">',
      ],
    },
  ]

  TEST_CASES.forEach(({ description, md, env, expected }) => {
    it(description, () => {
      expect(md.render(source.join('\n\n'), env)).toEqual(
        `${expected.map((item) => `<p>${item}</p>`).join('\n')}\n`,
      )
    })
  })
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

      /* data uri */
      '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wr4H/wAAAABJRU5ErkJggg==">',
    ]

    const TEST_CASES: {
      description: string
      md: MarkdownIt
      env: MarkdownEnv
      expected: string[]
    }[] = [
      {
        description: 'should handle assets link with default options',
        md: MarkdownIt({ html: true }).use(assetsPlugin),
        env: {
          base: '/base/',
        },
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
          // absolute paths and no-prefix paths
          '<img srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
          // keep as is
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
          // absolute paths and no-prefix paths
          '<img alt="attrs" src="" width="100px" srcset="/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',

          /* data uri */
          '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wr4H/wAAAABJRU5ErkJggg==">',
        ],
      },
      {
        description: 'should respect `absolutePathPrependBase` option',
        md: MarkdownIt({ html: true }).use(assetsPlugin, {
          absolutePathPrependBase: true,
        }),
        env: {
          base: '/base/',
        },
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
          '<img src="/base/absolute.png">',
          '<img src="/base/foo/absolute.png">',
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
          // absolute paths and no-prefix paths
          '<img srcset="/base/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',
          // keep as is
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
          // absolute paths and no-prefix paths
          '<img alt="attrs" src="" width="100px" srcset="/base/absolute.png 1x, no-prefix.png 2x, http://foobar.com/icon.png">',

          /* data uri */
          '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wr4H/wAAAABJRU5ErkJggg==">',
        ],
      },
    ]

    TEST_CASES.forEach(({ description, md, env, expected }) => {
      it(description, () => {
        // block
        expect(md.render(source.join('\n\n'), env)).toEqual(
          expected.map((item) => item).join('\n'),
        )

        // block with leading white space
        expect(
          md.render(source.map((item) => `   ${item}`).join('\n\n'), env),
        ).toEqual(expected.map((item) => `   ${item}`).join('\n'))

        // inline with prefix
        expect(
          md.render(source.map((item) => `foo${item}`).join('\n\n'), env),
        ).toEqual(`${expected.map((item) => `<p>foo${item}</p>`).join('\n')}\n`)

        // inline with suffix
        expect(
          md.render(source.map((item) => `${item}foo`).join('\n\n'), env),
        ).toEqual(`${expected.map((item) => `<p>${item}foo</p>`).join('\n')}\n`)

        // inline with line break
        expect(
          md.render(
            source.map((item) => item.replace('<img', '<img\n')).join('\n\n'),
            env,
          ),
        ).toEqual(
          `${expected
            .map((item) => `<p>${item.replace('<img', '<img\n')}</p>`)
            .join('\n')}\n`,
        )

        // wrapped item
        expect(
          md.render(source.map((item) => `<p>${item}</p>`).join('\n\n'), env),
        ).toEqual(expected.map((item) => `<p>${item}</p>`).join('\n'))

        // wrapped item with line break
        expect(
          md.render(
            source
              .map((item) => `<p>${item.replace('<img', '<img\n')}</p>`)
              .join('\n\n'),
            env,
          ),
        ).toEqual(
          expected
            .map((item) => `<p>${item.replace('<img', '<img\n')}</p>`)
            .join('\n'),
        )

        // wrapped multiple items
        expect(
          md.render(
            source.map((item) => `<p>${item}${item}</p>`).join('\n\n'),
            env,
          ),
        ).toEqual(expected.map((item) => `<p>${item}${item}</p>`).join('\n'))

        // deeply wrapped multiple items
        expect(
          md.render(
            source
              .map((item) => `<p>\n<span>\n${item}\n${item}\n</span>\n</p>`)
              .join('\n\n'),
            env,
          ),
        ).toEqual(
          expected
            .map((item) => `<p>\n<span>\n${item}\n${item}\n</span>\n</p>`)
            .join('\n'),
        )
      })
    })
  })

  // multi-line `<img>` tag will be wrapped with `<p>` tag
  describe('multi-line', () => {
    const source = [
      /* src */
      `<img alt="attrs" src="
          .../attrs.png
          " width="100px">`,
      `<img alt="attrs" src="
          /absolute/attrs.png
          " width="100px">`,

      /* srcset */
      `<img srcset="./foo.png      1x  ,
              ../sub/foo.png  2x,./foo/bar.png
    1024w ,../../out.png, /absolute/attrs.png">`,
      `<img alt="attrs"  srcset=" ./attrs.png 1x
    ,default.png ,/absolute/attrs.png" width="100px">`,

      /** both */
      `<img src="
          ./default.png
    " srcset="./foo.png      1x  ,
              ../sub/foo.png  2x,./foo/bar.png
    1024w ,../../out.png, /absolute/attrs.png">`,
      `<img alt="attrs" src="./default.png" srcset=" ./attrs.png 1x
    ,default.png ,/absolute/attrs.png" width="100px">`,
    ]

    const TEST_CASES: {
      description: string
      md: MarkdownIt
      env: MarkdownEnv
      expected: string[]
    }[] = [
      {
        description: 'should handle assets link with default options',
        md: MarkdownIt({ html: true }).use(assetsPlugin),
        env: {
          base: '/base/',
        },
        expected: [
          /* src */
          '<p><img alt="attrs" src=".../attrs.png" width="100px"></p>',
          '<p><img alt="attrs" src="/absolute/attrs.png" width="100px"></p>',

          /* srcset */
          '<p><img srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../../out.png, /absolute/attrs.png"></p>',
          '<p><img alt="attrs"  srcset="./attrs.png 1x, default.png, /absolute/attrs.png" width="100px"></p>',

          /* both */
          '<p><img src="./default.png" srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../../out.png, /absolute/attrs.png"></p>',
          '<p><img alt="attrs" src="./default.png" srcset="./attrs.png 1x, default.png, /absolute/attrs.png" width="100px"></p>',
        ],
      },
      {
        description: 'should respect `absolutePathPrependBase` option',
        md: MarkdownIt({ html: true }).use(assetsPlugin, {
          absolutePathPrependBase: true,
        }),
        env: {
          base: '/base/',
        },
        expected: [
          /* src */
          '<p><img alt="attrs" src=".../attrs.png" width="100px"></p>',
          '<p><img alt="attrs" src="/base/absolute/attrs.png" width="100px"></p>',

          /* srcset */
          '<p><img srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../../out.png, /base/absolute/attrs.png"></p>',
          '<p><img alt="attrs"  srcset="./attrs.png 1x, default.png, /base/absolute/attrs.png" width="100px"></p>',

          /* both */
          '<p><img src="./default.png" srcset="./foo.png 1x, ../sub/foo.png 2x, ./foo/bar.png 1024w, ../../out.png, /base/absolute/attrs.png"></p>',
          '<p><img alt="attrs" src="./default.png" srcset="./attrs.png 1x, default.png, /base/absolute/attrs.png" width="100px"></p>',
        ],
      },
    ]

    TEST_CASES.forEach(({ description, md, env, expected }) => {
      it(description, () => {
        // double quote
        expect(md.render(source.join('\n\n'), env)).toEqual(
          `${expected.map((item) => item).join('\n')}\n`,
        )
        // single quote
        expect(md.render(source.join('\n\n').replace(/"/g, "'"), env)).toEqual(
          `${expected.map((item) => item.replace(/"/g, "'")).join('\n')}\n`,
        )
      })
    })
  })
})
