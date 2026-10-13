import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const getScrollY = (page: Page): Promise<number> =>
  page.evaluate(() => window.scrollY)

const getTargetTop = (page: Page): Promise<number | undefined> =>
  page.evaluate(
    () => document.getElementById('target')?.getBoundingClientRect().top,
  )

const scrollToBottom = async (page: Page): Promise<number> => {
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight)
  })
  await page.waitForTimeout(200)

  return getScrollY(page)
}

test('should scroll to top when navigating to another page', async ({
  page,
}) => {
  await page.goto('router/scroll-restoration.html')
  await expect(page.locator('h1')).toHaveText('Scroll Restoration')

  expect(await scrollToBottom(page)).toBeGreaterThan(0)

  await page.locator('a[href$="404.html"]').click()
  await expect(page.locator('#notfound-h2')).toBeVisible()

  expect(await getScrollY(page)).toBe(0)
})

test('should restore scroll position when navigating back', async ({
  page,
}) => {
  await page.goto('router/scroll-restoration.html')
  await expect(page.locator('h1')).toHaveText('Scroll Restoration')

  const bottom = await scrollToBottom(page)

  await page.locator('a[href$="404.html"]').click()
  await expect(page.locator('#notfound-h2')).toBeVisible()

  await page.goBack()
  await expect(page.locator('h1')).toHaveText('Scroll Restoration')
  await page.waitForTimeout(200)

  expect(await getScrollY(page)).toBe(bottom)
})

test('should scroll to the anchor target', async ({ page }) => {
  await page.goto('router/scroll-restoration.html#target')
  await expect(page.locator('h1')).toHaveText('Scroll Restoration')
  await page.waitForTimeout(200)

  expect(await getScrollY(page)).toBeGreaterThan(0)
  expect(await getTargetTop(page)).toBeLessThan(5)

  await page.evaluate(() => {
    window.scrollTo(0, 0)
  })
  await page.locator('a[href="#target"]').first().click()
  await page.waitForTimeout(200)

  expect(await getTargetTop(page)).toBeLessThan(5)
})

test('should restore scroll position when reloading', async ({ page }) => {
  await page.goto('router/scroll-restoration.html')
  await expect(page.locator('h1')).toHaveText('Scroll Restoration')

  const bottom = await scrollToBottom(page)

  await page.reload()
  await expect(page.locator('h1')).toHaveText('Scroll Restoration')
  await page.waitForTimeout(200)

  expect(await getScrollY(page)).toBe(bottom)
})
