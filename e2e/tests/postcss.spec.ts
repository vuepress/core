import { expect, test } from '@playwright/test'

test('Should load postcss config from the site source directory', async ({
  page,
}) => {
  await page.goto('')

  await expect
    .poll(() =>
      page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue('--postcss-e2e')
          .trim(),
      ),
    )
    .toBe('1')
})
