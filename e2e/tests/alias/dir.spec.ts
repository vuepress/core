import { expect, test } from '@playwright/test'

test('should apply alias to subpath', async ({ page }) => {
  await page.goto('alias/dir.html')
  await expect(page.locator('#result')).toHaveText('dir1 > c')
})
