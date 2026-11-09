import { expect, test } from '@playwright/test'

import { IS_PROD } from '../../utils/env'

// pages using the same template ref key should all be rendered correctly,
// which requires a single vue runtime in the server bundle
for (const name of ['use-template-ref-1', 'use-template-ref-2']) {
  test(`should render ${name} correctly`, async ({ page }) => {
    await page.goto(`imports/${name}.html`)

    await expect(page.locator('#use-template-ref')).toHaveText(name)

    if (IS_PROD) {
      expect(
        await page.evaluate(
          async (url) => fetch(url).then(async (res) => res.text()),
          `./${name}.html`,
        ),
      ).toContain(`>${name}</div>`)
    }
  })
}
