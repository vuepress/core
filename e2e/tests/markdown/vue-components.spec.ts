import { expect, test } from '@playwright/test'

test('should render vue components correctly', async ({ page }) => {
  await page.goto('markdown/vue-components.html')

  await expect(page.locator('.component-for-markdown-global p')).toHaveText(
    'component for markdown global',
  )
  await expect(page.locator('.component-for-markdown-import-foo p')).toHaveText(
    'component for markdown import foo',
  )
  await expect(page.locator('.component-for-markdown-import-bar p')).toHaveText(
    'component for markdown import bar',
  )
})
