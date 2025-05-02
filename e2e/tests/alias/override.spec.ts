import { expect, test } from '@playwright/test'

test('longer alias shall override shorter ones', async ({ page }) => {
  await page.goto('alias/override.html')
  await expect(page.locator('#a')).toHaveText('dir2 > a')
  await expect(page.locator('#b')).toHaveText('dir2 > b')
})
