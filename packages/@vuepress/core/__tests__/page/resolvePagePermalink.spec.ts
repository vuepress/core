import { createBaseApp, resolvePagePermalink } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})

const appWithPermalink = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
  permalinkPattern: '/app',
})

beforeAll(async () => {
  await app.init()
})

describe('core > page > resolvePagePermalink', () => {
  it('should return null', () => {
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

  describe('use permalink or pattern', () => {
    it('should use permalinkPattern in app', () => {
      const resolved = resolvePagePermalink({
        app: appWithPermalink,
        frontmatter: {},
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/app')
    })

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

    it('permalinkPattern in frontmatter should have higher priority', () => {
      const resolved = resolvePagePermalink({
        app: appWithPermalink,
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
      const resolved1 = resolvePagePermalink({
        app: appWithPermalink,
        frontmatter: {
          permalink: '/frontmatter',
        },
        slug: '',
        date: '',
        pathInferred: null,
        pathLocale: '',
      })

      const resolved2 = resolvePagePermalink({
        app,
        frontmatter: {
          permalink: '/frontmatter',
          permalinkPattern: '/:year/:month/:day/:slug/frontmatter',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      const resolved3 = resolvePagePermalink({
        app: appWithPermalink,
        frontmatter: {
          permalink: '/frontmatter',
          permalinkPattern: '/:year/:month/:day/:slug/frontmatter',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved1).toBe('/frontmatter')
      expect(resolved2).toBe('/frontmatter')
      expect(resolved3).toBe('/frontmatter')
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
})
