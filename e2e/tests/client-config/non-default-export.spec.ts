import { expect, test } from '@playwright/test'

test('should apply styles correctly if the client config file does not have default export', async ({
  page,
}) => {
  await page.goto('client-config/non-default-export.html')
  await expect(page.locator('#non-default-export')).toHaveCSS(
    'font-size',
    '123px',
  )
})
