import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('components/auto-link.html')
})

test('should render route-link correctly', async ({ page }) => {
  for (const el of await page
    .locator('.e2e-theme-content #route-link a')
    .all()) {
    await expect(el).toHaveAttribute('class', /route-link/)
  }
})

test('should render anchor-link correctly', async ({ page }) => {
  for (const el of await page
    .locator('.e2e-theme-content #anchor-link a')
    .all()) {
    await expect(el).toHaveAttribute('class', /anchor-link/)
  }
})

test('should render config correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #config a')

  await expect(locator).toHaveText('text')
  await expect(locator).toHaveAttribute('href', '/')
  await expect(locator).toHaveAttribute('aria-label', 'label')
})
