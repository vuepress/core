import { path } from '@vuepress/utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { createBaseApp, resolvePagePermalink } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})

const appWithPermalinkPattern = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
  permalinkPattern: '/:year/:month/:day/:slug/app',
})

beforeAll(async () => {
  await app.init()
})

describe('core > page > resolvePagePermalink', () => {
  describe('use permalink or pattern', () => {
    it('should use permalink in frontmatter', () => {
      const resolved = resolvePagePermalink({
        app,
        frontmatter: {
          permalink: '/frontmatter',
        },
        slug: '',
        date: '',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/frontmatter')
    })

    it('should use permalinkPattern in frontmatter', () => {
      const resolved = resolvePagePermalink({
        app,
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/frontmatter',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/frontmatter')
    })

    it('should use permalinkPattern in app options', () => {
      const resolved = resolvePagePermalink({
        app: appWithPermalinkPattern,
        frontmatter: {},
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/app')
    })

    it('permalinkPattern in frontmatter should have higher priority', () => {
      const resolved = resolvePagePermalink({
        app: appWithPermalinkPattern,
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/frontmatter',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/frontmatter')
    })

    it('permalink in frontmatter should have highest priority', () => {
      const resolved = resolvePagePermalink({
        app: appWithPermalinkPattern,
        frontmatter: {
          permalink: '/frontmatter',
          permalinkPattern: '/:year/:month/:day/:slug/frontmatter',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/frontmatter')
    })
  })

  describe('permalink pattern', () => {
    it('should replace :raw with empty string 1', () => {
      const resolved = resolvePagePermalink({
        app,
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should replace :raw with empty string 2', () => {
      const resolved = resolvePagePermalink({
        app,
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: '',
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should replace :raw with empty string 3', () => {
      const resolved = resolvePagePermalink({
        app,
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: '/',
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should prefix with locale path', () => {
      const resolved = resolvePagePermalink({
        app,
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: '/raw.html',
        pathLocale: '/en/',
      })

      expect(resolved).toBe('/en/2020/10/07/foo-bar/raw.html')
    })
  })

  describe('should return null', () => {
    it('from permalinkPattern in frontmatter', () => {
      const resolved = resolvePagePermalink({
        app: appWithPermalinkPattern,
        frontmatter: {
          permalinkPattern: null,
        },
        slug: '',
        date: '',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe(null)
    })

    it('from permalinkPattern in app options', () => {
      const resolved = resolvePagePermalink({
        app,
        frontmatter: {},
        slug: '',
        date: '',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe(null)
    })
  })
})
