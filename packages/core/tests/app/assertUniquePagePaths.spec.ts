import { expect, it } from 'vitest'

import type { Page } from '../../src/index.js'
import { assertUniquePagePaths } from '../../src/index.js'

const createPage = ({
  path,
  htmlFilePath,
  filePath,
}: {
  path: string
  htmlFilePath?: string
  filePath: string | null
}): Page =>
  ({
    path,
    htmlFilePath: htmlFilePath ?? path,
    filePath,
  }) as unknown as Page

const getErrorMessage = (pages: Page[]): string => {
  try {
    assertUniquePagePaths(pages)
  } catch (error) {
    return (error as Error).message
  }
  throw new Error('assertUniquePagePaths did not throw')
}

it('should pass when all pages have unique route paths', () => {
  expect(() =>
    assertUniquePagePaths([
      createPage({ path: '/foo.html', filePath: '/docs/foo.md' }),
      createPage({ path: '/bar.html', filePath: '/docs/bar.md' }),
      createPage({ path: '/404.html', filePath: null }),
    ]),
  ).not.toThrow()
})

it('should throw when multiple pages resolve to the same route path', () => {
  const message = getErrorMessage([
    createPage({
      path: '/foo.html',
      htmlFilePath: '/docs/.vuepress/dist/foo.html',
      filePath: '/docs/_foo.md',
    }),
    createPage({
      path: '/foo.html',
      htmlFilePath: '/docs/.vuepress/dist/foo.html',
      filePath: '/docs/foo.md',
    }),
  ])

  expect(message).toContain(
    'route path "/foo.html" is resolved by multiple pages:',
  )
  expect(message).toContain('    /docs/_foo.md')
  expect(message).toContain('    /docs/foo.md')
})

it('should throw when multiple pages resolve to the same output file', () => {
  const message = getErrorMessage([
    createPage({
      path: '/b',
      htmlFilePath: '/docs/.vuepress/dist/b.html',
      filePath: '/docs/a.md',
    }),
    createPage({
      path: '/b.html',
      htmlFilePath: '/docs/.vuepress/dist/b.html',
      filePath: '/docs/b.html.md',
    }),
  ])

  expect(message).toContain(
    'output file "/docs/.vuepress/dist/b.html" is resolved by multiple pages:',
  )
  expect(message).toContain('    /docs/a.md')
  expect(message).toContain('    /docs/b.html.md')
  expect(message).not.toContain('- route path "')
})

it('should report all conflicts in a single error', () => {
  const message = getErrorMessage([
    createPage({ path: '/foo.html', filePath: '/docs/_foo.md' }),
    createPage({ path: '/foo.html', filePath: '/docs/foo.md' }),
    createPage({
      path: '/x.html',
      htmlFilePath: '/docs/.vuepress/dist/same.html',
      filePath: '/docs/x.md',
    }),
    createPage({
      path: '/y.html',
      htmlFilePath: '/docs/.vuepress/dist/same.html',
      filePath: '/docs/y.md',
    }),
  ])

  expect(message.match(/Duplicate page paths detected:/g)).toHaveLength(1)
  expect(message).toContain(
    'route path "/foo.html" is resolved by multiple pages:',
  )
  expect(message).toContain(
    'output file "/docs/.vuepress/dist/same.html" is resolved by multiple pages:',
  )
  expect(message).toContain('    /docs/_foo.md')
  expect(message).toContain('    /docs/foo.md')
  expect(message).toContain('    /docs/x.md')
  expect(message).toContain('    /docs/y.md')
})

it('should include all pages when more than two pages conflict', () => {
  const message = getErrorMessage([
    createPage({ path: '/foo.html', filePath: '/docs/_foo.md' }),
    createPage({ path: '/foo.html', filePath: '/docs/foo.md' }),
    createPage({ path: '/foo.html', filePath: '/docs/foo/index.md' }),
  ])

  expect(message).toContain('    /docs/_foo.md')
  expect(message).toContain('    /docs/foo.md')
  expect(message).toContain('    /docs/foo/index.md')
})

it('should mark pages without source file as virtual page', () => {
  const message = getErrorMessage([
    createPage({ path: '/404.html', filePath: null }),
    createPage({ path: '/404.html', filePath: '/docs/404.md' }),
  ])

  expect(message).toContain('    (virtual page)')
  expect(message).toContain('    /docs/404.md')
})

it('should not report output file conflicts that are covered by a route path conflict', () => {
  const message = getErrorMessage([
    createPage({
      path: '/foo.html',
      htmlFilePath: '/docs/.vuepress/dist/foo.html',
      filePath: '/docs/_foo.md',
    }),
    createPage({
      path: '/foo.html',
      htmlFilePath: '/docs/.vuepress/dist/foo.html',
      filePath: '/docs/foo.md',
    }),
  ])

  expect(message).toContain('- route path "')
  expect(message).not.toContain('- output file "')
})

it('should not throw for pages with the same file name in different directories', () => {
  expect(() =>
    assertUniquePagePaths([
      createPage({
        path: '/a/foo.html',
        htmlFilePath: '/docs/.vuepress/dist/a/foo.html',
        filePath: '/docs/a/foo.md',
      }),
      createPage({
        path: '/b/foo.html',
        htmlFilePath: '/docs/.vuepress/dist/b/foo.html',
        filePath: '/docs/b/foo.md',
      }),
    ]),
  ).not.toThrow()
})
