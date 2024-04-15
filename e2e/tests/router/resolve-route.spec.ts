import { expect, test } from '@playwright/test'

const testCases = [
  {
    selector: '#index',
    expected: {
      path: '/',
      meta: {},
      notFound: false,
    },
  },
  {
    selector: '#non-index',
    expected: {
      path: '/router/resolve-route.html',
      meta: {},
      notFound: false,
    },
  },
  {
    selector: '#non-ascii',
    expected: {
      path: encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'),
      meta: {},
      notFound: false,
    },
  },
  {
    selector: '#non-ascii-encoded',
    expected: {
      path: encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'),
      meta: {},
      notFound: false,
    },
  },
  {
    selector: '#non-existent',
    expected: {
      path: '/non-existent.html',
      meta: { foo: 'bar' },
      notFound: true,
    },
  },
  {
    selector: '#route-meta',
    expected: {
      path: '/page-data/route-meta.html',
      meta: { a: 0, b: 2, c: 3 },
      notFound: false,
    },
  },
]

test('should resolve routes correctly', async ({ page }) => {
  await page.goto('/router/resolve-route.html')

  for (const { selector, expected } of testCases) {
    const listItemsLocator = await page
      .locator(`.e2e-theme-content ${selector} + ul > li`)
      .all()
    for (const li of listItemsLocator) {
      const textContent = await li.textContent()
      const resolvedRoute = JSON.parse(/: (\{.*\})\s*$/.exec(textContent!)![1])
      expect(resolvedRoute.path).toEqual(expected.path)
      expect(resolvedRoute.meta).toStrictEqual(expected.meta)
      expect(resolvedRoute.notFound).toEqual(expected.notFound)
    }
  }
})
