import { expect, test } from '@playwright/test'

test('should import styles in client config file not exports', async ({
  page,
}) => {
  await page.goto('markdown/anchors.html', { waitUntil: 'domcontentloaded' })

  await expect(page.locator('#title')).toHaveCSS('font-size', '32px')
})
