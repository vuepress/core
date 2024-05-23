import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('router/navigate-by-router.html')
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
  await expect(page).toHaveURL(`${BASE}404.html#404`)
  await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
})

test('should preserve hash and query', async ({ page }) => {
  await page.locator('#not-found-with-hash-and-query').click()
  await expect(page).toHaveURL(`${BASE}404.html#404?notFound=true`)
  await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
})
