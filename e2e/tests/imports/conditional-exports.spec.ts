import { expect, test } from '@playwright/test'
import { COMMAND } from '../../utils/env'

test('should load different files correctly', async ({ page }) => {
  await page.goto('imports/conditional-exports.html')

  await expect(page.locator('.e2e-theme-content p')).toHaveText('browser-mjs')

  if (COMMAND === 'build') {
    expect(
      await page.evaluate(() =>
        fetch('./conditional-exports.html').then((res) => res.text()),
      ),
    ).toContain('<p>node-mjs</p>')
  }
})
