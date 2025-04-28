import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('router/navigate-by-link.html')
})

test.describe('markdown links', () => {
  const selector = '#markdown-links + ul > li > a'

  test('should navigate to home correctly', async ({ page }) => {
    await page.locator(selector).nth(0).click()
    await expect(page).toHaveURL(BASE)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should navigate to 404 page correctly', async ({ page }) => {
    await page.locator(selector).nth(1).click()
    await expect(page).toHaveURL(`${BASE}404.html`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('should preserve query', async ({ page }) => {
    await page.locator(selector).nth(2).click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve query and hash', async ({ page }) => {
    await page.locator(selector).nth(3).click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve hash', async ({ page }) => {
    await page.locator(selector).nth(4).click()
    await expect(page).toHaveURL(`${BASE}404.html#404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})

test.describe('html links', () => {
  const selector = '#html-links + p > a'

  test('should navigate to home correctly', async ({ page }) => {
    await page.locator(selector).nth(0).click()
    await expect(page).toHaveURL(BASE)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should navigate to 404 page correctly', async ({ page }) => {
    await page.locator(selector).nth(1).click()
    await expect(page).toHaveURL(`${BASE}404.html`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('should preserve query', async ({ page }) => {
    await page.locator(selector).nth(2).click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve query and hash', async ({ page }) => {
    await page.locator(selector).nth(3).click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve hash', async ({ page }) => {
    await page.locator(selector).nth(4).click()
    await expect(page).toHaveURL(`${BASE}404.html#404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})

test.describe('html clean links', () => {
  const selector = '#html-clean-links + p > a'

  test('should navigate to home correctly', async ({ page }) => {
    await page.locator(selector).nth(0).click()
    await expect(page).toHaveURL(BASE)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should navigate to 404 page correctly', async ({ page }) => {
    await page.locator('#html-clean-links + p> a').nth(1).click()
    await expect(page).toHaveURL(`${BASE}404.html`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })

  test('should preserve query', async ({ page }) => {
    await page.locator(selector).nth(2).click()
    await expect(page).toHaveURL(`${BASE}?home=true`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve query and hash', async ({ page }) => {
    await page.locator(selector).nth(3).click()
    await expect(page).toHaveURL(`${BASE}?home=true#home`)
    await expect(page.locator('#home-h2')).toHaveText('Home H2')
  })

  test('should preserve hash', async ({ page }) => {
    await page.locator(selector).nth(4).click()
    await expect(page).toHaveURL(`${BASE}404.html#404`)
    await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
  })
})

test.describe('markdown clean links', () => {
  const selector = '#markdown-clean-links + blockquote + ul > li > a'

  test('should navigate to home correctly', async ({ page }) => {
    const locator = page.locator(selector).nth(0)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL('/')
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should navigate to 404 page correctly', async ({ page }) => {
    const locator = page.locator(selector).nth(1)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}404.html`)
      await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/404')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should preserve query', async ({ page }) => {
    const locator = page.locator(selector).nth(2)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}?home=true`)
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/?home=true')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should preserve query and hash', async ({ page }) => {
    const locator = page.locator(selector).nth(3)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}?home=true#home`)
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/?home=true#home')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should preserve hash', async ({ page }) => {
    const locator = page.locator(selector).nth(4)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}404.html#404`)
      await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/404#404')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })
})

test.describe('markdown links with html paths', () => {
  const selector = '#markdown-links-with-html-paths + blockquote + ul > li > a'

  test('should navigate to home correctly', async ({ page }) => {
    const locator = page.locator(selector).nth(0)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL('/')
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should navigate to 404 page correctly', async ({ page }) => {
    const locator = page.locator(selector).nth(1)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}404.html`)
      await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/404.html')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should preserve query', async ({ page }) => {
    const locator = page.locator(selector).nth(2)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}?home=true`)
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/?home=true')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should preserve query and hash', async ({ page }) => {
    const locator = page.locator(selector).nth(3)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}?home=true#home`)
      await expect(page.locator('#home-h2')).toHaveText('Home H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/?home=true#home')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })

  test('should preserve hash', async ({ page }) => {
    const locator = page.locator(selector).nth(4)

    if (BASE === '/') {
      await locator.click()
      await expect(page).toHaveURL(`${BASE}404.html#404`)
      await expect(page.locator('#notfound-h2')).toHaveText('NotFound H2')
    } else {
      await expect(locator).toHaveAttribute('href', '/404.html#404')
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  })
})
