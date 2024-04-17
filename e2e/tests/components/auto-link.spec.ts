import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

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

test('should render external-link correctly', async ({ page }) => {
  for (const el of await page
    .locator('.e2e-theme-content #external-link a')
    .all()) {
    await expect(el).toHaveAttribute('class', /external-link/)
  }
})

test('should render config correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #config a')

  await expect(await locator.nth(0)).toHaveText('text1')
  await expect(await locator.nth(0)).toHaveAttribute('href', BASE)
  await expect(await locator.nth(0)).toHaveAttribute('aria-label', 'label')

  await expect(await locator.nth(1)).toHaveText('text2')
  await expect(await locator.nth(1)).toHaveAttribute(
    'href',
    'https://example.com/test/',
  )
  await expect(await locator.nth(1)).toHaveAttribute('target', '_blank')
  await expect(await locator.nth(1)).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  )
})
