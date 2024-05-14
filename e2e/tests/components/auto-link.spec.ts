import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('components/auto-link.html')
})

test('should render route-link correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #route-link a')

  for (const el of await locator.all()) {
    await expect(el).toHaveAttribute('class', /route-link/)
  }
})

test('should render external-link correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #external-link a')

  for (const el of await locator.all()) {
    await expect(el).toHaveAttribute('class', /external-link/)
  }
})

test('should render config correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #config a')

  await expect(locator.nth(0)).toHaveText('text1')
  await expect(locator.nth(0)).toHaveAttribute('href', BASE)
  await expect(locator.nth(0)).toHaveAttribute('aria-label', 'label')

  await expect(locator.nth(1)).toHaveText('text2')
  await expect(locator.nth(1)).toHaveAttribute(
    'href',
    'https://example.com/test/',
  )
  await expect(locator.nth(1)).toHaveAttribute('target', '_blank')
  await expect(locator.nth(1)).toHaveAttribute('rel', 'noopener noreferrer')
})
