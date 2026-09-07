import type { MarkdownLink } from '@vuepress/markdown'
import { expect, test } from 'vitest'

import { resolveLinkRouteKey } from '../../src/index.js'

const TEST_CASES = [
  [{ absolute: null, relative: '' }, '/', '/', null],
  [{ absolute: '/foo.md', relative: 'foo.md' }, '/', '/', '/foo'],
  [
    { absolute: '/foo/README.md', relative: 'foo/README.md' },
    '/',
    '/',
    '/foo/',
  ],
  [{ absolute: '/base/foo.md', relative: 'foo.md' }, '/base/', '/', '/foo'],
  [
    { absolute: '/base/foo/index.html', relative: 'foo/index.html' },
    '/base/',
    '/',
    '/foo/',
  ],
  [
    { absolute: '/base/base/foo.md', relative: 'base/foo.md' },
    '/base/',
    '/',
    '/base/foo',
  ],
  [{ absolute: '/foo.md', relative: 'foo.md' }, '/base/', '/', '/foo'],
  [
    { absolute: null, relative: 'foo.md' },
    '/base/',
    '/virtual/page.html',
    '/virtual/foo',
  ],
  [
    { absolute: null, relative: '../foo.md' },
    '/',
    '/virtual/page.html',
    '/foo',
  ],
  [
    { absolute: null, relative: 'foo/README.md' },
    '/',
    '/virtual/',
    '/virtual/foo/',
  ],
] as [MarkdownLink, string, string, string | null][]

test.for(TEST_CASES)(
  'should resolve $0 with base $1 and current route $2 to $3',
  ([link, base, current, expected]) => {
    expect(resolveLinkRouteKey({ base, current, link })).toBe(expected)
  },
)
