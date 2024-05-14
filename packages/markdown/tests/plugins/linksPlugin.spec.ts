import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { linksPlugin } from '../../src/index.js'
import type { MarkdownEnv } from '../../src/index.js'

describe('@vuepress/markdown > plugins > linksPlugin', () => {
  describe('external links', () => {
    describe('protocol links', () => {
      const source = [
        '[https-github](https://github.com)',
        '[http-github](http://github.com)',
        '[github](//github.com)',
        '[https-github-md](https://github.com/foo/bar/blob/main/README.md)',
        '[http-github-md](http://github.com/foo/bar/blob/main/README.md)',
        '[github-md](//github.com/foo/bar/blob/main/README.md)',
        // autolink
        '<https://github.com>',
        '<http://github.com>',
        '<https://github.com/foo/bar/blob/main/README.md>',
        '<http://github.com/foo/bar/blob/main/README.md>',
      ].join('\n\n')

      it('should render default attrs', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https-github</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http-github</a>',
            '<a href="//github.com" target="_blank" rel="noopener noreferrer">github</a>',
            '<a href="https://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer">https-github-md</a>',
            '<a href="http://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer">http-github-md</a>',
            '<a href="//github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer">github-md</a>',
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http://github.com</a>',
            '<a href="https://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer">https://github.com/foo/bar/blob/main/README.md</a>',
            '<a href="http://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer">http://github.com/foo/bar/blob/main/README.md</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toBeUndefined()
      })

      it('should add extra attrs', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          externalAttrs: {
            foo: 'bar',
          },
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer" foo="bar">https-github</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer" foo="bar">http-github</a>',
            '<a href="//github.com" target="_blank" rel="noopener noreferrer" foo="bar">github</a>',
            '<a href="https://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer" foo="bar">https-github-md</a>',
            '<a href="http://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer" foo="bar">http-github-md</a>',
            '<a href="//github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer" foo="bar">github-md</a>',
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer" foo="bar">https://github.com</a>',
            '<a href="http://github.com" target="_blank" rel="noopener noreferrer" foo="bar">http://github.com</a>',
            '<a href="https://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer" foo="bar">https://github.com/foo/bar/blob/main/README.md</a>',
            '<a href="http://github.com/foo/bar/blob/main/README.md" target="_blank" rel="noopener noreferrer" foo="bar">http://github.com/foo/bar/blob/main/README.md</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )
        expect(env.links).toBeUndefined()
      })

      it('should override default attrs', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          externalAttrs: {
            rel: 'foobar',
          },
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="https://github.com" target="_blank" rel="foobar">https-github</a>',
            '<a href="http://github.com" target="_blank" rel="foobar">http-github</a>',
            '<a href="//github.com" target="_blank" rel="foobar">github</a>',
            '<a href="https://github.com/foo/bar/blob/main/README.md" target="_blank" rel="foobar">https-github-md</a>',
            '<a href="http://github.com/foo/bar/blob/main/README.md" target="_blank" rel="foobar">http-github-md</a>',
            '<a href="//github.com/foo/bar/blob/main/README.md" target="_blank" rel="foobar">github-md</a>',
            '<a href="https://github.com" target="_blank" rel="foobar">https://github.com</a>',
            '<a href="http://github.com" target="_blank" rel="foobar">http://github.com</a>',
            '<a href="https://github.com/foo/bar/blob/main/README.md" target="_blank" rel="foobar">https://github.com/foo/bar/blob/main/README.md</a>',
            '<a href="http://github.com/foo/bar/blob/main/README.md" target="_blank" rel="foobar">http://github.com/foo/bar/blob/main/README.md</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )
        expect(env.links).toBeUndefined()
      })
    })

    describe('absolute links', () => {
      const source = [
        '[html](/path/to/index.html)',
        '[pdf](/path/to/index.pdf)',
        '[png](/path/to/index.png)',
      ].join('\n\n')

      it('should render default attrs', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          base: '/base/',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="/path/to/index.html" target="_blank" rel="noopener noreferrer">html</a>',
            '<a href="/path/to/index.pdf" target="_blank" rel="noopener noreferrer">pdf</a>',
            '<a href="/path/to/index.png" target="_blank" rel="noopener noreferrer">png</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toBeUndefined()
      })
    })
  })

  describe('internal links', () => {
    describe('relative links', () => {
      const source = [
        '[foo1](foo.md)',
        '[foo2](foo.md#hash)',
        '[foo3](./foo.md)',
        '[bar1](../bar.md)',
        '[bar2](../bar.md#hash)',
        '[bar3](./../bar.md)',
        '[foobar1](foo/bar.md)',
        '[foobar2](foo/bar.md#hash)',
        '[foobar3](../foo/bar.md)',
        '[foobar4](../foo/bar.md#hash)',
        '[index1](index.md)',
        '[index2](index.md#hash)',
        '[index3](./index.md)',
        '[index4](../index.md)',
        '[index5](../foo/bar/index.md)',
        '[readme1](readme.md)',
        '[readme2](../readme.md#hash)',
        '[readme3](../foo/bar/readme.md)',
      ].join('\n\n')

      it('should render to <a> tag correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          internalTag: 'a',
        })
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="foo.html">foo1</a>',
            '<a href="foo.html#hash">foo2</a>',
            '<a href="foo.html">foo3</a>',
            '<a href="../bar.html">bar1</a>',
            '<a href="../bar.html#hash">bar2</a>',
            '<a href="../bar.html">bar3</a>',
            '<a href="foo/bar.html">foobar1</a>',
            '<a href="foo/bar.html#hash">foobar2</a>',
            '<a href="../foo/bar.html">foobar3</a>',
            '<a href="../foo/bar.html#hash">foobar4</a>',
            '<a href="index.html">index1</a>',
            '<a href="index.html#hash">index2</a>',
            '<a href="index.html">index3</a>',
            '<a href="../">index4</a>',
            '<a href="../foo/bar/">index5</a>',
            '<a href="index.html">readme1</a>',
            '<a href="../#hash">readme2</a>',
            '<a href="../foo/bar/">readme3</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'foo.md',
            absolute: null,
          },
          {
            raw: 'foo.md#hash',
            relative: 'foo.md',
            absolute: null,
          },
          {
            raw: './foo.md',
            relative: 'foo.md',
            absolute: null,
          },
          {
            raw: '../bar.md',
            relative: '../bar.md',
            absolute: null,
          },
          {
            raw: '../bar.md#hash',
            relative: '../bar.md',
            absolute: null,
          },
          {
            raw: './../bar.md',
            relative: '../bar.md',
            absolute: null,
          },
          {
            raw: 'foo/bar.md',
            relative: 'foo/bar.md',
            absolute: null,
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'foo/bar.md',
            absolute: null,
          },
          {
            raw: '../foo/bar.md',
            relative: '../foo/bar.md',
            absolute: null,
          },
          {
            raw: '../foo/bar.md#hash',
            relative: '../foo/bar.md',
            absolute: null,
          },
          {
            raw: 'index.md',
            relative: 'index.md',
            absolute: null,
          },
          {
            raw: 'index.md#hash',
            relative: 'index.md',
            absolute: null,
          },
          {
            raw: './index.md',
            relative: 'index.md',
            absolute: null,
          },
          {
            raw: '../index.md',
            relative: '../index.md',
            absolute: null,
          },
          {
            raw: '../foo/bar/index.md',
            relative: '../foo/bar/index.md',
            absolute: null,
          },
          {
            raw: 'readme.md',
            relative: 'readme.md',
            absolute: null,
          },
          {
            raw: '../readme.md#hash',
            relative: '../readme.md',
            absolute: null,
          },
          {
            raw: '../foo/bar/readme.md',
            relative: '../foo/bar/readme.md',
            absolute: null,
          },
        ])
      })

      it('should render relative links correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {}

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouteLink to="foo.html">foo1</RouteLink>',
            '<RouteLink to="foo.html#hash">foo2</RouteLink>',
            '<RouteLink to="foo.html">foo3</RouteLink>',
            '<RouteLink to="../bar.html">bar1</RouteLink>',
            '<RouteLink to="../bar.html#hash">bar2</RouteLink>',
            '<RouteLink to="../bar.html">bar3</RouteLink>',
            '<RouteLink to="foo/bar.html">foobar1</RouteLink>',
            '<RouteLink to="foo/bar.html#hash">foobar2</RouteLink>',
            '<RouteLink to="../foo/bar.html">foobar3</RouteLink>',
            '<RouteLink to="../foo/bar.html#hash">foobar4</RouteLink>',
            '<RouteLink to="index.html">index1</RouteLink>',
            '<RouteLink to="index.html#hash">index2</RouteLink>',
            '<RouteLink to="index.html">index3</RouteLink>',
            '<RouteLink to="../">index4</RouteLink>',
            '<RouteLink to="../foo/bar/">index5</RouteLink>',
            '<RouteLink to="index.html">readme1</RouteLink>',
            '<RouteLink to="../#hash">readme2</RouteLink>',
            '<RouteLink to="../foo/bar/">readme3</RouteLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'foo.md',
            absolute: null,
          },
          {
            raw: 'foo.md#hash',
            relative: 'foo.md',
            absolute: null,
          },
          {
            raw: './foo.md',
            relative: 'foo.md',
            absolute: null,
          },
          {
            raw: '../bar.md',
            relative: '../bar.md',
            absolute: null,
          },
          {
            raw: '../bar.md#hash',
            relative: '../bar.md',
            absolute: null,
          },
          {
            raw: './../bar.md',
            relative: '../bar.md',
            absolute: null,
          },
          {
            raw: 'foo/bar.md',
            relative: 'foo/bar.md',
            absolute: null,
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'foo/bar.md',
            absolute: null,
          },
          {
            raw: '../foo/bar.md',
            relative: '../foo/bar.md',
            absolute: null,
          },
          {
            raw: '../foo/bar.md#hash',
            relative: '../foo/bar.md',
            absolute: null,
          },
          {
            raw: 'index.md',
            relative: 'index.md',
            absolute: null,
          },
          {
            raw: 'index.md#hash',
            relative: 'index.md',
            absolute: null,
          },
          {
            raw: './index.md',
            relative: 'index.md',
            absolute: null,
          },
          {
            raw: '../index.md',
            relative: '../index.md',
            absolute: null,
          },
          {
            raw: '../foo/bar/index.md',
            relative: '../foo/bar/index.md',
            absolute: null,
          },
          {
            raw: 'readme.md',
            relative: 'readme.md',
            absolute: null,
          },
          {
            raw: '../readme.md#hash',
            relative: '../readme.md',
            absolute: null,
          },
          {
            raw: '../foo/bar/readme.md',
            relative: '../foo/bar/readme.md',
            absolute: null,
          },
        ])
      })

      it('should convert to absolute links correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          filePathRelative: 'path/to/file.md',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouteLink to="/path/to/foo.html">foo1</RouteLink>',
            '<RouteLink to="/path/to/foo.html#hash">foo2</RouteLink>',
            '<RouteLink to="/path/to/foo.html">foo3</RouteLink>',
            '<RouteLink to="/path/bar.html">bar1</RouteLink>',
            '<RouteLink to="/path/bar.html#hash">bar2</RouteLink>',
            '<RouteLink to="/path/bar.html">bar3</RouteLink>',
            '<RouteLink to="/path/to/foo/bar.html">foobar1</RouteLink>',
            '<RouteLink to="/path/to/foo/bar.html#hash">foobar2</RouteLink>',
            '<RouteLink to="/path/foo/bar.html">foobar3</RouteLink>',
            '<RouteLink to="/path/foo/bar.html#hash">foobar4</RouteLink>',
            '<RouteLink to="/path/to/">index1</RouteLink>',
            '<RouteLink to="/path/to/#hash">index2</RouteLink>',
            '<RouteLink to="/path/to/">index3</RouteLink>',
            '<RouteLink to="/path/">index4</RouteLink>',
            '<RouteLink to="/path/foo/bar/">index5</RouteLink>',
            '<RouteLink to="/path/to/">readme1</RouteLink>',
            '<RouteLink to="/path/#hash">readme2</RouteLink>',
            '<RouteLink to="/path/foo/bar/">readme3</RouteLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/to/foo.md',
          },
          {
            raw: 'foo.md#hash',
            relative: 'path/to/foo.md',
            absolute: '/path/to/foo.md',
          },
          {
            raw: './foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/to/foo.md',
          },
          {
            raw: '../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/bar.md',
          },
          {
            raw: '../bar.md#hash',
            relative: 'path/bar.md',
            absolute: '/path/bar.md',
          },
          {
            raw: './../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/bar.md',
          },
          {
            raw: 'foo/bar.md',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/to/foo/bar.md',
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/to/foo/bar.md',
          },
          {
            raw: '../foo/bar.md',
            relative: 'path/foo/bar.md',
            absolute: '/path/foo/bar.md',
          },
          {
            raw: '../foo/bar.md#hash',
            relative: 'path/foo/bar.md',
            absolute: '/path/foo/bar.md',
          },
          {
            raw: 'index.md',
            relative: 'path/to/index.md',
            absolute: '/path/to/index.md',
          },
          {
            raw: 'index.md#hash',
            relative: 'path/to/index.md',
            absolute: '/path/to/index.md',
          },
          {
            raw: './index.md',
            relative: 'path/to/index.md',
            absolute: '/path/to/index.md',
          },
          {
            raw: '../index.md',
            relative: 'path/index.md',
            absolute: '/path/index.md',
          },
          {
            raw: '../foo/bar/index.md',
            relative: 'path/foo/bar/index.md',
            absolute: '/path/foo/bar/index.md',
          },
          {
            raw: 'readme.md',
            relative: 'path/to/readme.md',
            absolute: '/path/to/readme.md',
          },
          {
            raw: '../readme.md#hash',
            relative: 'path/readme.md',
            absolute: '/path/readme.md',
          },
          {
            raw: '../foo/bar/readme.md',
            relative: 'path/foo/bar/readme.md',
            absolute: '/path/foo/bar/readme.md',
          },
        ])
      })

      it('should convert to absolute links correctly if the file path contains non-ASCII characters', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          filePathRelative: '中/文/路径.md',
        }
        const encoded中 = encodeURI('中')
        const encoded文 = encodeURI('文')

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            `<RouteLink to="/${encoded中}/${encoded文}/foo.html">foo1</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/foo.html#hash">foo2</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/foo.html">foo3</RouteLink>`,
            `<RouteLink to="/${encoded中}/bar.html">bar1</RouteLink>`,
            `<RouteLink to="/${encoded中}/bar.html#hash">bar2</RouteLink>`,
            `<RouteLink to="/${encoded中}/bar.html">bar3</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/foo/bar.html">foobar1</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/foo/bar.html#hash">foobar2</RouteLink>`,
            `<RouteLink to="/${encoded中}/foo/bar.html">foobar3</RouteLink>`,
            `<RouteLink to="/${encoded中}/foo/bar.html#hash">foobar4</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/">index1</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/#hash">index2</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/">index3</RouteLink>`,
            `<RouteLink to="/${encoded中}/">index4</RouteLink>`,
            `<RouteLink to="/${encoded中}/foo/bar/">index5</RouteLink>`,
            `<RouteLink to="/${encoded中}/${encoded文}/">readme1</RouteLink>`,
            `<RouteLink to="/${encoded中}/#hash">readme2</RouteLink>`,
            `<RouteLink to="/${encoded中}/foo/bar/">readme3</RouteLink>`,
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: `${encoded中}/${encoded文}/foo.md`,
            absolute: `/${encoded中}/${encoded文}/foo.md`,
          },
          {
            raw: 'foo.md#hash',
            relative: `${encoded中}/${encoded文}/foo.md`,
            absolute: `/${encoded中}/${encoded文}/foo.md`,
          },
          {
            raw: './foo.md',
            relative: `${encoded中}/${encoded文}/foo.md`,
            absolute: `/${encoded中}/${encoded文}/foo.md`,
          },
          {
            raw: '../bar.md',
            relative: `${encoded中}/bar.md`,
            absolute: `/${encoded中}/bar.md`,
          },
          {
            raw: '../bar.md#hash',
            relative: `${encoded中}/bar.md`,
            absolute: `/${encoded中}/bar.md`,
          },
          {
            raw: './../bar.md',
            relative: `${encoded中}/bar.md`,
            absolute: `/${encoded中}/bar.md`,
          },
          {
            raw: 'foo/bar.md',
            relative: `${encoded中}/${encoded文}/foo/bar.md`,
            absolute: `/${encoded中}/${encoded文}/foo/bar.md`,
          },
          {
            raw: 'foo/bar.md#hash',
            relative: `${encoded中}/${encoded文}/foo/bar.md`,
            absolute: `/${encoded中}/${encoded文}/foo/bar.md`,
          },
          {
            raw: '../foo/bar.md',
            relative: `${encoded中}/foo/bar.md`,
            absolute: `/${encoded中}/foo/bar.md`,
          },
          {
            raw: '../foo/bar.md#hash',
            relative: `${encoded中}/foo/bar.md`,
            absolute: `/${encoded中}/foo/bar.md`,
          },
          {
            raw: 'index.md',
            relative: `${encoded中}/${encoded文}/index.md`,
            absolute: `/${encoded中}/${encoded文}/index.md`,
          },
          {
            raw: 'index.md#hash',
            relative: `${encoded中}/${encoded文}/index.md`,
            absolute: `/${encoded中}/${encoded文}/index.md`,
          },
          {
            raw: './index.md',
            relative: `${encoded中}/${encoded文}/index.md`,
            absolute: `/${encoded中}/${encoded文}/index.md`,
          },
          {
            raw: '../index.md',
            relative: `${encoded中}/index.md`,
            absolute: `/${encoded中}/index.md`,
          },
          {
            raw: '../foo/bar/index.md',
            relative: `${encoded中}/foo/bar/index.md`,
            absolute: `/${encoded中}/foo/bar/index.md`,
          },
          {
            raw: 'readme.md',
            relative: `${encoded中}/${encoded文}/readme.md`,
            absolute: `/${encoded中}/${encoded文}/readme.md`,
          },
          {
            raw: '../readme.md#hash',
            relative: `${encoded中}/readme.md`,
            absolute: `/${encoded中}/readme.md`,
          },
          {
            raw: '../foo/bar/readme.md',
            relative: `${encoded中}/foo/bar/readme.md`,
            absolute: `/${encoded中}/foo/bar/readme.md`,
          },
        ])
      })

      it('should not conflict with base', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          base: '/path/',
          filePathRelative: 'path/to/file.md',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouteLink to="/path/to/foo.html">foo1</RouteLink>',
            '<RouteLink to="/path/to/foo.html#hash">foo2</RouteLink>',
            '<RouteLink to="/path/to/foo.html">foo3</RouteLink>',
            '<RouteLink to="/path/bar.html">bar1</RouteLink>',
            '<RouteLink to="/path/bar.html#hash">bar2</RouteLink>',
            '<RouteLink to="/path/bar.html">bar3</RouteLink>',
            '<RouteLink to="/path/to/foo/bar.html">foobar1</RouteLink>',
            '<RouteLink to="/path/to/foo/bar.html#hash">foobar2</RouteLink>',
            '<RouteLink to="/path/foo/bar.html">foobar3</RouteLink>',
            '<RouteLink to="/path/foo/bar.html#hash">foobar4</RouteLink>',
            '<RouteLink to="/path/to/">index1</RouteLink>',
            '<RouteLink to="/path/to/#hash">index2</RouteLink>',
            '<RouteLink to="/path/to/">index3</RouteLink>',
            '<RouteLink to="/path/">index4</RouteLink>',
            '<RouteLink to="/path/foo/bar/">index5</RouteLink>',
            '<RouteLink to="/path/to/">readme1</RouteLink>',
            '<RouteLink to="/path/#hash">readme2</RouteLink>',
            '<RouteLink to="/path/foo/bar/">readme3</RouteLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toEqual([
          {
            raw: 'foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/path/to/foo.md',
          },
          {
            raw: 'foo.md#hash',
            relative: 'path/to/foo.md',
            absolute: '/path/path/to/foo.md',
          },
          {
            raw: './foo.md',
            relative: 'path/to/foo.md',
            absolute: '/path/path/to/foo.md',
          },
          {
            raw: '../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/path/bar.md',
          },
          {
            raw: '../bar.md#hash',
            relative: 'path/bar.md',
            absolute: '/path/path/bar.md',
          },
          {
            raw: './../bar.md',
            relative: 'path/bar.md',
            absolute: '/path/path/bar.md',
          },
          {
            raw: 'foo/bar.md',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/path/to/foo/bar.md',
          },
          {
            raw: 'foo/bar.md#hash',
            relative: 'path/to/foo/bar.md',
            absolute: '/path/path/to/foo/bar.md',
          },
          {
            raw: '../foo/bar.md',
            relative: 'path/foo/bar.md',
            absolute: '/path/path/foo/bar.md',
          },
          {
            raw: '../foo/bar.md#hash',
            relative: 'path/foo/bar.md',
            absolute: '/path/path/foo/bar.md',
          },
          {
            raw: 'index.md',
            relative: 'path/to/index.md',
            absolute: '/path/path/to/index.md',
          },
          {
            raw: 'index.md#hash',
            relative: 'path/to/index.md',
            absolute: '/path/path/to/index.md',
          },
          {
            raw: './index.md',
            relative: 'path/to/index.md',
            absolute: '/path/path/to/index.md',
          },
          {
            raw: '../index.md',
            relative: 'path/index.md',
            absolute: '/path/path/index.md',
          },
          {
            raw: '../foo/bar/index.md',
            relative: 'path/foo/bar/index.md',
            absolute: '/path/path/foo/bar/index.md',
          },
          {
            raw: 'readme.md',
            relative: 'path/to/readme.md',
            absolute: '/path/path/to/readme.md',
          },
          {
            raw: '../readme.md#hash',
            relative: 'path/readme.md',
            absolute: '/path/path/readme.md',
          },
          {
            raw: '../foo/bar/readme.md',
            relative: 'path/foo/bar/readme.md',
            absolute: '/path/path/foo/bar/readme.md',
          },
        ])
      })
    })

    describe('absolute links', () => {
      const source = [
        '[md](/path/to/index.md)',
        '[md-with-redundant-base](/base/path/to/index.md)',
        '[html](/base/path/to/index.html)',
      ].join('\n\n')

      it('should resolve to internal links correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin)
        const env: MarkdownEnv = {
          base: '/base/',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<RouteLink to="/path/to/">md</RouteLink>',
            '<RouteLink to="/base/path/to/">md-with-redundant-base</RouteLink>',
            '<RouteLink to="/path/to/">html</RouteLink>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toEqual([
          {
            raw: '/path/to/index.md',
            relative: 'path/to/index.md',
            absolute: '/base/path/to/index.md',
          },
          {
            raw: '/base/path/to/index.md',
            relative: 'base/path/to/index.md',
            absolute: '/base/base/path/to/index.md',
          },
          {
            raw: '/base/path/to/index.html',
            relative: 'path/to/index.html',
            absolute: '/base/path/to/index.html',
          },
        ])
      })

      it('should render to <a> tag correctly', () => {
        const md = MarkdownIt({ html: true }).use(linksPlugin, {
          internalTag: 'a',
        })
        const env: MarkdownEnv = {
          base: '/base/',
        }

        const rendered = md.render(source, env)

        expect(rendered).toEqual(
          [
            '<a href="/base/path/to/">md</a>',
            '<a href="/base/base/path/to/">md-with-redundant-base</a>',
            '<a href="/base/path/to/">html</a>',
          ]
            .map((a) => `<p>${a}</p>`)
            .join('\n') + '\n',
        )

        expect(env.links).toEqual([
          {
            raw: '/path/to/index.md',
            relative: 'path/to/index.md',
            absolute: '/base/path/to/index.md',
          },
          {
            raw: '/base/path/to/index.md',
            relative: 'base/path/to/index.md',
            absolute: '/base/base/path/to/index.md',
          },
          {
            raw: '/base/path/to/index.html',
            relative: 'path/to/index.html',
            absolute: '/base/path/to/index.html',
          },
        ])
      })
    })
  })

  describe('empty links', () => {
    it('should render correctly', () => {
      const md = MarkdownIt({ html: true }).use(linksPlugin)
      const env: MarkdownEnv = {}

      const rendered = md.render('[empty]()', env)

      expect(rendered).toEqual('<p><a href="">empty</a></p>\n')
      expect(env.links).toBeUndefined()
    })
  })
})
