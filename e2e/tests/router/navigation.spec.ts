import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test('should preserve query', async ({ page }) => {
  await page.goto('router/navigation.html')

  await page.locator('#home').click()

  await expect(page).toHaveURL(`${BASE}?home=true`)
})

test('should preserve hash', async ({ page }) => {
  await page.goto('router/navigation.html')

  await page.locator('#not-found').click()

  await expect(page).toHaveURL(`${BASE}404.html#404`)
})
