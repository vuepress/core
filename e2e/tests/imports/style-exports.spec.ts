import { expect, test } from '@playwright/test'

test('should load dynamic imported styles correctly', async ({ page }) => {
  await page.goto('imports/style-exports.html')

  const locator = page.locator('.style-exports')

  await expect(locator).toHaveText('dynamic import')
  await expect(locator).toHaveCSS('font-size', '20px')
})

test('should load static imported styles correctly', async ({ page }) => {
  await page.goto('imports/style-exports.html')

  const locator = page.locator('.style-exports-foo')

  await expect(locator).toHaveText('static import')
  await expect(locator).toHaveCSS('font-size', '30px')
})
