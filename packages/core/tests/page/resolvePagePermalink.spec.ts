import { logger, path } from '@vuepress/utils'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import type { Bundler } from '../../src/index.js'
import { createBaseApp, resolvePagePermalink } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

const appWithPermalinkPattern = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
  permalinkPattern: '/:year/:month/:day/:slug/app',
})

beforeAll(async () => {
  await app.init()
})

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

  it('should return null', () => {
    const resolved = resolvePagePermalink({
      app: appWithPermalinkPattern,
      frontmatter: {
        permalink: null,
      },
      slug: '',
      date: '',
      pathInferred: '/inferred',
      pathLocale: '',
    })

    expect(resolved).toBe(null)
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

describe('placeholder replacement', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should replace every occurrence of a repeated placeholder', () => {
    const resolved = resolvePagePermalink({
      app,
      frontmatter: {
        permalinkPattern: '/:year/:year/:slug',
      },
      slug: 's',
      date: '2020-10-07',
      pathInferred: null,
      pathLocale: '',
    })

    expect(resolved).toBe('/2020/2020/s')
  })

  it('should replace adjacent and interleaved placeholders', () => {
    const resolved = resolvePagePermalink({
      app,
      frontmatter: {
        permalinkPattern: '/:year:month-:slug/:day:raw',
      },
      slug: 's',
      date: '2020-10-07',
      pathInferred: '/foo/bar.html',
      pathLocale: '',
    })

    expect(resolved).toBe('/202010-s/07foo/bar.html')
  })

  it('should replace repeated :raw with the whole path', () => {
    const resolved = resolvePagePermalink({
      app,
      frontmatter: {
        permalinkPattern: '/:raw/:raw',
      },
      slug: 'foo-bar',
      date: '2020-10-07',
      pathInferred: '/foo/bar.html',
      pathLocale: '',
    })

    expect(resolved).toBe('/foo/bar.html/foo/bar.html')
  })

  it('should not interpret special replacement patterns in slug', () => {
    const trickySlug = "$&$$$`$'"

    const resolved = resolvePagePermalink({
      app,
      frontmatter: {
        permalinkPattern: '/:slug/app',
      },
      slug: trickySlug,
      date: '2020-10-07',
      pathInferred: null,
      pathLocale: '',
    })

    expect(resolved).toBe(`/${trickySlug}/app`)
  })

  it('should warn when the slug is empty and the pattern contains :slug', () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})

    const resolved = resolvePagePermalink({
      app,
      frontmatter: {
        permalinkPattern: '/:slug/:raw',
      },
      slug: '',
      date: '2020-10-07',
      pathInferred: null,
      pathLocale: '',
      filePathRelative: 'virtual-page.md',
    })

    // the path is still normalized instead of producing an illegal path
    expect(resolved).toBe('/')
    expect(warnSpy).toHaveBeenCalledTimes(1)

    const message = String(warnSpy.mock.calls[0][0])
    expect(message).toContain('slug')
    expect(message).toContain('virtual-page.md')
    expect(message).toContain('/:slug/:raw')
  })

  it('should not warn about an empty slug when the pattern has no :slug', () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})

    const resolved = resolvePagePermalink({
      app,
      frontmatter: {
        permalinkPattern: '/:year/:raw',
      },
      slug: '',
      date: '2020-10-07',
      pathInferred: '/foo.html',
      pathLocale: '',
      filePathRelative: 'virtual-page.md',
    })

    expect(resolved).toBe('/2020/foo.html')
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('should warn and keep unknown placeholders literally', () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})

    const resolved = resolvePagePermalink({
      app,
      frontmatter: {
        permalinkPattern: '/:author/:slug',
      },
      slug: 's',
      date: '2020-10-07',
      pathInferred: null,
      pathLocale: '',
      filePathRelative: 'foo.md',
    })

    expect(resolved).toBe('/:author/s')
    expect(warnSpy).toHaveBeenCalledTimes(1)

    const message = String(warnSpy.mock.calls[0][0])
    expect(message).toContain(':author')
    expect(message).toContain('/:author/:slug')
    expect(message).toContain('foo.md')
  })
})
