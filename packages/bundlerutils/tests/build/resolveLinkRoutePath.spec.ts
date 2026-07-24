import { expect, test } from 'vitest'

import { resolveLinkRoutePath } from '../../src/index.js'

const TEST_CASES = [
  [null, '/', null],
  ['/foo.md', '/', '/foo.html'],
  ['/foo/README.md', '/', '/foo/'],
  ['/base/foo.md', '/base/', '/foo.html'],
  ['/base/foo/index.html', '/base/', '/foo/'],
  ['/base/base/foo.md', '/base/', '/base/foo.html'],
  ['/foo.md', '/base/', '/foo.html'],
] as const

test.for(TEST_CASES)(
  'should resolve %s with base %s to %s',
  ([absolute, base, expected]) => {
    expect(resolveLinkRoutePath(absolute, base)).toBe(expected)
  },
)
