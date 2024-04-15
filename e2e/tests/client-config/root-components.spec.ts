import { expect, test } from '@playwright/test'

test('should render root components correctly', async ({ page }) => {
  await page.goto('', { waitUntil: 'domcontentloaded' })

  await expect(page.locator('.root-component-from-theme p')).toHaveText(
    'root component from theme',
  )
  await expect(page.locator('.root-component-from-user-config p')).toHaveText(
    'root component from user config',
  )
})
