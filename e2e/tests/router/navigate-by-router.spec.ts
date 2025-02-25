import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('router/navigate-by-router.html')
})

test.describe('should navigate to home correctly', () => {
  test('full', async ({ page }) => {
    await page.locator('#full .home').click()
    await expect(page).toHaveURL(BASE)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('clean', async ({ page }) => {
    await page.locator('#clean .home').click()
    await expect(page).toHaveURL(BASE)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })
})

test.describe('should navigate to 404 page correctly', () => {
  test('full', async ({ page }) => {
    await page.locator('#full .not-found').click()
    await expect(page).toHaveURL(`${BASE}404.html`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('clean', async ({ page }) => {
    await page.locator('#clean .not-found').click()
    await expect(page).toHaveURL(`${BASE}404.html`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})

test.describe('should preserve query', () => {
  test('full', async ({ page }) => {
    await page.locator('#full .home-with-query').click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('clean', async ({ page }) => {
    await page.locator('#clean .home-with-query').click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })
})

test.describe('should preserve query and hash', () => {
  test('full', async ({ page }) => {
    await page.locator('#full .home-with-query-and-hash').click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('clean', async ({ page }) => {
    await page.locator('#clean .home-with-query-and-hash').click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })
})

test.describe('should preserve  hash', () => {
  test('full', async ({ page }) => {
    await page.locator('#full .not-found-with-hash').click()
    await expect(page).toHaveURL(`${BASE}404.html#404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('clean', async ({ page }) => {
    await page.locator('#clean .not-found-with-hash').click()
    await expect(page).toHaveURL(`${BASE}404.html#404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})
