import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('router/navigate-by-link.html')
})

test('TODO', async ({ page }) => {
  // TODO
  await expect(page).toHaveURL(`${BASE}router/navigate-by-link.html`)
})
