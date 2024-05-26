import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('router/navigate-by-link.html')
})

test.describe('should preserve query', () => {
  test('markdown links with html suffix', async ({ page }) => {
    const homeAnchor = page
      .locator('#markdown-links-with-html + ul > li > a')
      .nth(0)
    if (BASE === '/') {
      await homeAnchor.click()
      await expect(page).toHaveURL('/?home=true')
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      expect(await homeAnchor.getAttribute('target')).toBe('_blank')
    }
  })

  test('markdown links with md suffix', async ({ page }) => {
    await page.locator('#markdown-links-with-md + ul > li > a').nth(0).click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('html links', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(0).click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })
})

test.describe('should preserve query and hash', () => {
  test('markdown links with html suffix', async ({ page }) => {
    const homeAnchor = page
      .locator('#markdown-links-with-html + ul > li > a')
      .nth(1)
    if (BASE === '/') {
      await homeAnchor.click()
      await expect(page).toHaveURL('/?home=true#home')
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      expect(await homeAnchor.getAttribute('target')).toBe('_blank')
    }
  })

  test('markdown links with md suffix', async ({ page }) => {
    await page.locator('#markdown-links-with-md + ul > li > a').nth(1).click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('html links', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(1).click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })
})

test.describe('should preserve hash', () => {
  test('markdown links with html suffix', async ({ page }) => {
    const notFound = page
      .locator('#markdown-links-with-html + ul > li > a')
      .nth(2)
    if (BASE === '/') {
      await notFound.click()
      await expect(page).toHaveURL('/404.html#404')
      await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
    } else {
      expect(await notFound.getAttribute('target')).toBe('_blank')
    }
  })

  test('markdown links with md suffix', async ({ page }) => {
    await page.locator('#markdown-links-with-md + ul > li > a').nth(2).click()
    await expect(page).toHaveURL(`${BASE}404.html#404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('html links', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(2).click()
    await expect(page).toHaveURL(`${BASE}404.html#404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})

test.describe('should preserve hash and query', () => {
  test('markdown links with html suffix', async ({ page }) => {
    const notFound = page
      .locator('#markdown-links-with-html + ul > li > a')
      .nth(3)
    if (BASE === '/') {
      await notFound.click()
      await expect(page).toHaveURL('/404.html#404?notFound=true')
      await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
    } else {
      expect(await notFound.getAttribute('target')).toBe('_blank')
    }
  })

  test('markdown links with md suffix', async ({ page }) => {
    await page.locator('#markdown-links-with-md + ul > li > a').nth(3).click()
    await expect(page).toHaveURL(`${BASE}404.html#404?notFound=true`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('html links', async ({ page }) => {
    await page.locator('#html-links + p > a').nth(3).click()
    await expect(page).toHaveURL(`${BASE}404.html#404?notFound=true`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})
