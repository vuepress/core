import { describe, expect, it, vi } from 'vitest'

import { routes } from '../../src/internal/routes.js'
import { resolveRoutePath } from '../../src/router/resolveRoutePath.js'

// mock the generated `@internal/routes` module to provide test fixtures
vi.mock('../../src/internal/routes.js', () => ({
  routes: {
    value: {
      '/': { loader: vi.fn() },
      '/foo/': { loader: vi.fn() },
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

  // directory route
  // no slash -> normalize to .html -> fallback to directory route
  ['/foo', '/foo/'],
  ['/foo/', '/foo/'],
  ['/foo/index.html', '/foo/'],
  ['/foo/README.md', '/foo/'],

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

  it('should fallback to directory route when normalized .html route does not exist', () => {
    // `/foo` normalizes to `/foo.html` which does not exist in routes,
    // but `/foo/` exists, so it should fallback to `/foo/`
    expect(routes.value['/foo.html']).toBeUndefined()
    expect(routes.value['/foo/']).toBeDefined()
    expect(resolveRoutePath('/foo')).toBe('/foo/')
  })
})
