import { expect, test } from '@playwright/test'

test.describe('en-US', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('lang', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
  })

  test('title', async ({ page }) => {
    const locator = page.locator('head title')

    await expect(page).toHaveTitle('VuePress E2E')
    await expect(locator).toHaveCount(1)
    await expect(locator.first()).toHaveText('VuePress E2E', {
      useInnerText: true,
    })
  })

  test('description', async ({ page }) => {
    const locator = page.locator('head meta[name="description"]')

    await expect(locator).toHaveCount(1)
    await expect(locator.first()).toHaveAttribute(
      'content',
      'VuePress E2E Test Site',
    )
  })

  test('head', async ({ page }) => {
    const fooLocator = page.locator('head meta[name="foo"]')
    const barLocator = page.locator('head meta[name="bar"]')
    const bazLocator = page.locator('head meta[name="baz"]')
    const fooEnLocator = page.locator('head meta[name="foo-en"]')

    await expect(fooLocator).toHaveCount(1)
    await expect(fooLocator.first()).toHaveAttribute('content', 'foo')

    await expect(barLocator).toHaveCount(1)
    await expect(barLocator.first()).toHaveAttribute('content', 'foobar')

    await expect(bazLocator).toHaveCount(1)
    await expect(bazLocator.first()).toHaveAttribute('content', 'foobar baz')

    await expect(fooEnLocator).toHaveCount(1)
    await expect(fooEnLocator.first()).toHaveAttribute('content', 'foo-en')
  })
})

test.describe('zh-CN', () => {
  test.beforeEach(async ({ page }) => page.goto('/zh/'))

  test('lang', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  })

  test('title', async ({ page }) => {
    const locator = page.locator('head title')

    await expect(page).toHaveTitle('VuePress E2E')
    await expect(locator).toHaveCount(1)
    await expect(locator.first()).toHaveText('VuePress E2E', {
      useInnerText: true,
    })
  })

  test('description', async ({ page }) => {
    const locator = page.locator('head meta[name="description"]')

    await expect(locator).toHaveCount(1)
    await expect(locator.first()).toHaveAttribute(
      'content',
      'VuePress E2E 测试站点',
    )
  })

  test('head', async ({ page }) => {
    const fooLocator = page.locator('head meta[name="foo"]')
    const barLocator = page.locator('head meta[name="bar"]')
    const bazLocator = page.locator('head meta[name="baz"]')
    const fooZhLocator = page.locator('head meta[name="foo-zh"]')

    await expect(fooLocator).toHaveCount(1)
    await expect(fooLocator.first()).toHaveAttribute('content', 'foo')

    await expect(barLocator).toHaveCount(1)
    await expect(barLocator.first()).toHaveAttribute('content', 'foobar zh')

    await expect(bazLocator).toHaveCount(1)
    await expect(bazLocator.first()).toHaveAttribute('content', 'baz')

    await expect(fooZhLocator).toHaveCount(1)
    await expect(fooZhLocator.first()).toHaveAttribute('content', 'foo-zh')
  })
})
