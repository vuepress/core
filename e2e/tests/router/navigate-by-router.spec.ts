import { expect, test } from '@playwright/test'

import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('router/navigate-by-router.html')
})

test('should navigate to home correctly', async ({ page }) => {
  await page.locator('#home').click()
  await expect(page).toHaveURL(BASE)
  await expect(page.locator('#home-h2')).toHaveText('Home H2')
})

test('should navigate to 404 page correctly', async ({ page }) => {
  await page.locator('#not-found').click()
  await expect(page).toHaveURL(`${BASE}404.html`)
  await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
})

test('should preserve query', async ({ page }) => {
  await page.locator('#home-with-query').click()
  await expect(page).toHaveURL(`${BASE}?home=true`)
  await expect(page.locator('#home-h2')).toHaveText('Home H2')
})

test('should preserve query and hash', async ({ page }) => {
  await page.locator('#home-with-query-and-hash').click()
  await expect(page).toHaveURL(`${BASE}?home=true#home`)
  await expect(page.locator('#home-h2')).toHaveText('Home H2')
})

test('should preserve hash', async ({ page }) => {
  await page.locator('#not-found-with-hash').click()
  await expect(page).toHaveURL(`${BASE}404.html#_404`)
  await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
})

test('should preserve complex hash', async ({ page }) => {
  await page.locator('#not-found-with-complex-hash').click()
  await expect(page).toHaveURL(`${BASE}404.html#/404?lang=en`)
  await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
})

test('should not crash when navigating to a malformed url', async ({
  page,
}) => {
  await page.locator('#malformed-url').click()
  // the 404 route is still redirected to the inferred `*.html` path, while
  // the malformed percent sequence must not break the 404 page rendering
  await expect(page).toHaveURL(/100%(25)?\.html$/)
  await expect(page.locator('.e2e-theme-not-found')).toHaveText('404 Not Found')
  await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
})
