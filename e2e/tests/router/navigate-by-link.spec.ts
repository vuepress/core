import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('router/navigate-by-link.html')
})

test.describe('markdown links', () => {
  test('should navigate to home correctly', async ({ page }) => {
    await page.locator('#markdown-links + ul > li > a').nth(0).click()
    await expect(page).toHaveURL(BASE)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should navigate to 404 page correctly', async ({ page }) => {
    await page.locator('#markdown-links + ul > li > a').nth(1).click()
    await expect(page).toHaveURL(`${BASE}404.html`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('should preserve query', async ({ page }) => {
    await page.locator('#markdown-links + ul > li > a').nth(2).click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve query and hash', async ({ page }) => {
    await page.locator('#markdown-links + ul > li > a').nth(3).click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve hash', async ({ page }) => {
    await page.locator('#markdown-links + ul > li > a').nth(4).click()
    await expect(page).toHaveURL(`${BASE}404.html#_404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('should preserve hash and query', async ({ page }) => {
    await page.locator('#markdown-links + ul > li > a').nth(5).click()
    await expect(page).toHaveURL(`${BASE}404.html#_404?notFound=true`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})

test.describe('html links', () => {
  test('should navigate to home correctly', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(0).click()
    await expect(page).toHaveURL(BASE)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should navigate to 404 page correctly', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(1).click()
    await expect(page).toHaveURL(`${BASE}404.html`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('should preserve query', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(2).click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve query and hash', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(3).click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve hash', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(4).click()
    await expect(page).toHaveURL(`${BASE}404.html#_404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('should preserve hash and query', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(5).click()
    await expect(page).toHaveURL(`${BASE}404.html#_404?notFound=true`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})

test.describe('markdown links with html paths', () => {
  test('should navigate to home correctly', async ({ page }) => {
    const locator = page
      .locator('#markdown-links-with-html-paths + ul > li > a')
      .nth(0)
    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL('/')
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })
})
