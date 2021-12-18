import { createBaseApp } from '@vuepress/core'
import type { MarkdownEnv, MarkdownOptions } from '@vuepress/markdown'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { path } from '@vuepress/utils'

const getTestApp = async (markdown?: MarkdownOptions) => {
  const app = createBaseApp({
    source: path.resolve(__dirname, 'fake-source'),
    theme: path.resolve(__dirname, '../__fixtures__/theme-empty.js'),
    markdown,
  }).use(externalLinkIconPlugin)
  await app.init()
  return app
}

describe('@vuepress/plugin-external-link-icon > node > externalLinkIconPlugin', () => {
  const source = [
    '[https-github](https://github.com)',
    '[http-github](http://github.com)',
    '[github](//github.com)',
    '<https://github.com>',
    '<http://github.com>',
    '[foo](foo.md)',
  ].join('\n\n')

  it('should render external link icon correctly', async () => {
    const app = await getTestApp()

    const env: MarkdownEnv = {}

    const rendered = app.markdown.render(source, env)

    expect(rendered).toEqual(
      [
        '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https-github<ExternalLinkIcon/></a>',
        '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http-github<ExternalLinkIcon/></a>',
        '<a href="//github.com" target="_blank" rel="noopener noreferrer">github<ExternalLinkIcon/></a>',
        '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com<ExternalLinkIcon/></a>',
        '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http://github.com<ExternalLinkIcon/></a>',
        '<RouterLink to="foo.html">foo</RouterLink>',
      ]
        .map((a) => `<p>${a}</p>`)
        .join('\n') + '\n'
    )
  })

  it('should not render external link icon with self target', async () => {
    const app = await getTestApp({
      links: {
        externalAttrs: {
          target: '_self',
        },
      },
    })

    const env: MarkdownEnv = {}

    const rendered = app.markdown.render(source, env)

    expect(rendered).toEqual(
      [
        '<a href="https://github.com" target="_self" rel="noopener noreferrer">https-github</a>',
        '<a href="http://github.com" target="_self" rel="noopener noreferrer">http-github</a>',
        '<a href="//github.com" target="_self" rel="noopener noreferrer">github</a>',
        '<a href="https://github.com" target="_self" rel="noopener noreferrer">https://github.com</a>',
        '<a href="http://github.com" target="_self" rel="noopener noreferrer">http://github.com</a>',
        '<RouterLink to="foo.html">foo</RouterLink>',
      ]
        .map((a) => `<p>${a}</p>`)
        .join('\n') + '\n'
    )
  })

  it('should not render external link icon with `frontmatter.externalLinkIcon = false`', async () => {
    const app = await getTestApp()

    const env: MarkdownEnv = { frontmatter: { externalLinkIcon: false } }

    const rendered = app.markdown.render(source, env)

    expect(rendered).toEqual(
      [
        '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https-github</a>',
        '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http-github</a>',
        '<a href="//github.com" target="_blank" rel="noopener noreferrer">github</a>',
        '<a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com</a>',
        '<a href="http://github.com" target="_blank" rel="noopener noreferrer">http://github.com</a>',
        '<RouterLink to="foo.html">foo</RouterLink>',
      ]
        .map((a) => `<p>${a}</p>`)
        .join('\n') + '\n'
    )
  })
})
