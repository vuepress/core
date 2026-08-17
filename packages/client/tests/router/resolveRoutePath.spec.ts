import { describe, expect, it, vi } from 'vitest'

import { routes } from '../../src/internal/routes.js'
import { resolveRoutePath } from '../../src/router/resolveRoutePath.js'

// mock the generated `@internal/routes` module to provide test fixtures
vi.mock('../../src/internal/routes.js', () => ({
  routes: {
    value: {
      '/': { loader: vi.fn() },
      '/bar/': { loader: vi.fn() },
      '/foo/': { loader: vi.fn() },
      '/foo.html': { loader: vi.fn() },
      '/foo/bar.html': { loader: vi.fn() },
      '/foo/index.html': { loader: vi.fn() },
    },
  },
  redirects: {
    value: {},
  },
}))

const TEST_CASES: [string, string][] = [
  // root
  ['/', '/'],
  ['/index.html', '/'],

  // directory route with a same-named file route
  // the same-named file route has priority, so `/foo` resolves to `/foo.html`
  // instead of falling back to `/foo/`
  ['/foo', '/foo.html'],
  ['/foo/', '/foo/'],
  ['/foo/index.html', '/foo/'],
  ['/foo/README.md', '/foo/'],

  // directory route without a same-named file route
  // fallback to the directory route, `/bar` -> `/bar.html` -> `/bar/`
  ['/bar', '/bar/'],
  ['/bar/', '/bar/'],

  // file route
  ['/foo/bar', '/foo/bar.html'],
  ['/foo/bar.html', '/foo/bar.html'],
  ['/foo/bar.md', '/foo/bar.html'],

  // 404 paths should be kept as-is (normalized)
  ['/not-exist', '/not-exist.html'],
  ['/foo/not-exist', '/foo/not-exist.html'],
]

describe('resolveRoutePath', () => {
  it('should resolve route paths correctly', () => {
    TEST_CASES.forEach(([path, expected]) => {
      expect(resolveRoutePath(path), `"${path}"`).toBe(expected)
    })
  })

  it('should fallback to directory route when the same-named file route does not exist', () => {
    // `/bar` normalizes to `/bar.html` which does not exist in routes,
    // but `/bar/` exists, so it should fallback to `/bar/`
    expect(routes.value['/bar.html']).toBeUndefined()
    expect(routes.value['/bar/']).toBeDefined()
    expect(resolveRoutePath('/bar')).toBe('/bar/')
  })

  it('should prioritize the same-named file route over the directory route', () => {
    // `/foo` normalizes to `/foo.html` which exists in routes,
    // so it should NOT fallback to `/foo/` even though `/foo/` exists
    expect(routes.value['/foo.html']).toBeDefined()
    expect(routes.value['/foo/']).toBeDefined()
    expect(resolveRoutePath('/foo')).toBe('/foo.html')
  })
})
