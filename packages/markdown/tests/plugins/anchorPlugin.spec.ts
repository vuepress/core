import { describe, expect, it } from 'vitest'

import { createMarkdown } from '../../src/index.js'

describe('anchor plugin', () => {
  it('should add ids and header anchors to all heading levels', () => {
    const md = createMarkdown()

    expect(
      md.render('# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6\n'),
    ).toBe(
      [
        '<h1 id="h1" tabindex="-1"><a class="header-anchor" href="#h1"><span>h1</span></a></h1>',
        '<h2 id="h2" tabindex="-1"><a class="header-anchor" href="#h2"><span>h2</span></a></h2>',
        '<h3 id="h3" tabindex="-1"><a class="header-anchor" href="#h3"><span>h3</span></a></h3>',
        '<h4 id="h4" tabindex="-1"><a class="header-anchor" href="#h4"><span>h4</span></a></h4>',
        '<h5 id="h5" tabindex="-1"><a class="header-anchor" href="#h5"><span>h5</span></a></h5>',
        '<h6 id="h6" tabindex="-1"><a class="header-anchor" href="#h6"><span>h6</span></a></h6>',
      ].join('\n') + '\n',
    )
  })

  it('should generate unique slugs for duplicate headings', () => {
    const md = createMarkdown()

    expect(md.render('# foo\n## foo\n### foo\n')).toBe(
      [
        '<h1 id="foo" tabindex="-1"><a class="header-anchor" href="#foo"><span>foo</span></a></h1>',
        '<h2 id="foo-1" tabindex="-1"><a class="header-anchor" href="#foo-1"><span>foo</span></a></h2>',
        '<h3 id="foo-2" tabindex="-1"><a class="header-anchor" href="#foo-2"><span>foo</span></a></h3>',
      ].join('\n') + '\n',
    )
  })

  it('should not wrap a heading that already contains a link', () => {
    const md = createMarkdown()

    // wrapping the existing link would produce invalid nested `<a>` elements
    expect(md.render('# [vuepress](https://vuepress.vuejs.org)\n')).toBe(
      '<h1 id="vuepress" tabindex="-1"><a href="https://vuepress.vuejs.org" target="_blank" rel="noopener noreferrer">vuepress</a></h1>\n',
    )
  })

  it('should fall back to the `heading` placeholder for empty headings', () => {
    const md = createMarkdown()

    expect(md.render('#\n')).toBe(
      '<h1 id="heading" tabindex="-1"><a class="header-anchor" href="#heading"><span></span></a></h1>\n',
    )
  })

  it('should fall back to the `heading` placeholder for image-only headings', () => {
    const md = createMarkdown()

    expect(md.render('# ![alt](https://example.com/foo.png)\n')).toBe(
      '<h1 id="heading" tabindex="-1"><a class="header-anchor" href="#heading"><span><img src="https://example.com/foo.png" alt="alt"></span></a></h1>\n',
    )
  })

  it('should use the custom slugify function', () => {
    const md = createMarkdown({
      slugify: (str) => `custom-${str.toLowerCase().replaceAll(' ', '-')}`,
    })

    expect(md.render('# Foo Bar\n')).toBe(
      '<h1 id="custom-foo-bar" tabindex="-1"><a class="header-anchor" href="#custom-foo-bar"><span>Foo Bar</span></a></h1>\n',
    )
  })

  it('should only add anchors to the configured heading levels', () => {
    const md = createMarkdown({ anchor: { level: [2, 3] } })

    expect(md.render('# h1\n## h2\n#### h4\n')).toBe(
      [
        '<h1>h1</h1>',
        '<h2 id="h2" tabindex="-1"><a class="header-anchor" href="#h2"><span>h2</span></a></h2>',
        '<h4>h4</h4>',
      ].join('\n') + '\n',
    )
  })

  it('should let user options override the default anchor options', () => {
    const md = createMarkdown({ anchor: { tabIndex: false } })

    expect(md.render('# foo\n')).toBe(
      '<h1 id="foo"><a class="header-anchor" href="#foo"><span>foo</span></a></h1>\n',
    )
  })

  it('should record used slugs in the markdown env', () => {
    const md = createMarkdown()
    const env = {}

    md.render('# foo\n# foo\n', env)

    expect(env).toMatchObject({
      markdownItAnchor: {
        slugs: {
          'foo': true,
          'foo-1': true,
        },
      },
    })
  })
})
