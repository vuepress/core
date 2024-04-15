import { expect, test } from '@playwright/test'

test.describe('title', () => {
  test('should use title from frontmatter', async ({ page }) => {
    await page.goto('/page-data/title-from-frontmatter.html')
    await expect(page).toHaveTitle(/title from frontmatter/)
  })

  test('should use title from h1', async ({ page }) => {
    await page.goto('/page-data/title-from-h1.html')
    await expect(page).toHaveTitle(/title from h1/)
  })
})

test.describe('frontmatter', () => {
  test('should set frontmatter correctly', async ({ page }) => {
    await page.goto('/page-data/frontmatter.html')
    await expect(page.locator('.e2e-theme-content p')).toHaveText(
      JSON.stringify({
        str: 'str',
        num: 1,
        bool: true,
        arr: [1, 2, 3],
        obj: { foo: 'bar', baz: 'qux' },
      }),
    )
  })
})
