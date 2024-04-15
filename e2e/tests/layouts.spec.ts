import { expect, test } from '@playwright/test'

test('CustomLayout', async ({ page }) => {
  await page.goto('/layouts/custom-layout.html')
  await expect(page.locator('.e2e-theme-custom-layout-content')).toHaveText(
    'Should use CustomLayout',
  )
})

test('Layout', async ({ page }) => {
  await page.goto('/layouts/layout.html')
  await expect(page.locator('.e2e-theme-content')).toHaveText(
    'Should use Layout',
  )
})

test('NotFound', async ({ page }) => {
  await page.goto('/404.html')
  await expect(page.locator('.e2e-theme-not-found')).toHaveText('404 Not Found')
})
