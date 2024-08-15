import { expect, test } from '@playwright/test'

const TEST_CASES = [
  {
    path: '/?query=1',
    notFound: false,
  },
  {
    path: '/#hash',
    notFound: false,
  },
  {
    path: '/?query=1#hash',
    notFound: false,
  },
  {
    path: encodeURI('/永久链接-ascii-中文/?query=1'),
    notFound: false,
  },
]

test('should resolve routes when including both the query and hash', async ({
  page,
}) => {
  const listItemsLocator = await page
    .locator('.e2e-theme-content #includes-query-and-hash + ul > li')
    .all()

  for (const [index, li] of listItemsLocator.entries()) {
    const textContent = await li.textContent()
    const resolvedRoute = JSON.parse(
      /: (\{.*\})\s*$/.exec(textContent!)![1],
    ) as { path: string; notFound: boolean }

    expect(resolvedRoute.path).toEqual(TEST_CASES[index].path)
    expect(resolvedRoute.notFound).toEqual(TEST_CASES[index].notFound)
  }
})
