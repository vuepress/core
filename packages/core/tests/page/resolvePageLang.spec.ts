import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { createBaseApp, resolvePageLang } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
  lang: 'site-lang',
  locales: {
    '/': {
      lang: 'locales-lang',
    },
  },
})

describe('core > page > resolvePageLang', () => {
  it('should use frontmatter lang', () => {
    const lang = resolvePageLang({
      app,
      frontmatter: {
        lang: 'frontmatter-lang',
      },
      pathLocale: '/',
    })

    expect(lang).toBe('frontmatter-lang')
  })

  it('should use locales lang 1', () => {
    const lang = resolvePageLang({
      app,
      frontmatter: {
        lang: '',
      },
      pathLocale: '/',
    })

    expect(lang).toBe('locales-lang')
  })

  it('should use locales lang 2', () => {
    const lang = resolvePageLang({
      app,
      frontmatter: {},
      pathLocale: '/',
    })

    expect(lang).toBe('locales-lang')
  })

  it('should use site lang', () => {
    const lang = resolvePageLang({
      app,
      frontmatter: {},
      pathLocale: '/foo/',
    })

    expect(lang).toBe('site-lang')
  })
})
