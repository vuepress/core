import { expect, test } from '@playwright/test'

test('Should load CSS modules correctly', async ({ page }) => {
  await page.goto('styles/css-modules.html')
  await expect(page.locator('#e2e-theme-css-modules-scss')).toHaveText('234px')
  await expect(page.locator('#e2e-theme-css-modules-css')).toHaveCSS(
    'color',
    'rgb(0, 129, 0)',
  )
})
