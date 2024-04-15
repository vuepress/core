import { expect, test } from '@playwright/test'

test('should update head correctly', async ({ page }) => {
  const htmlLocator = page.locator('html')
  const titleLocator = page.locator('head title')
  const descriptionLocator = page.locator('head meta[name="description"]')
  const fooLocator = page.locator('head meta[name="foo"]')
  const barLocator = page.locator('head meta[name="bar"]')
  const bazLocator = page.locator('head meta[name="baz"]')
  const fooEnLocator = page.locator('head meta[name="foo-en"]')
  const fooZhLocator = page.locator('head meta[name="foo-zh"]')

  // en-US
  await page.goto('')

  // lang
  await expect(htmlLocator).toHaveAttribute('lang', 'en-US')
  // title
  await expect(page).toHaveTitle('VuePress E2E')
  await expect(titleLocator).toHaveCount(1)
  await expect(titleLocator.first()).toHaveText('VuePress E2E', {
    useInnerText: true,
  })
  // description
  await expect(descriptionLocator).toHaveCount(1)
  await expect(descriptionLocator.first()).toHaveAttribute(
    'content',
    'VuePress E2E Test Site',
  )
  // head
  await expect(fooLocator).toHaveCount(1)
  await expect(fooLocator.first()).toHaveAttribute('content', 'foo')
  await expect(barLocator).toHaveCount(1)
  await expect(barLocator.first()).toHaveAttribute('content', 'foobar')
  await expect(bazLocator).toHaveCount(1)
  await expect(bazLocator.first()).toHaveAttribute('content', 'foobar baz')
  await expect(fooEnLocator).toHaveCount(1)
  await expect(fooEnLocator.first()).toHaveAttribute('content', 'foo-en')

  // navigate to zh-CN
  await page.locator('.e2e-theme-nav a', { hasText: 'zh-CN' }).click()

  // lang
  await expect(htmlLocator).toHaveAttribute('lang', 'zh-CN')
  // title
  await expect(page).toHaveTitle('VuePress E2E')
  await expect(titleLocator).toHaveCount(1)
  await expect(titleLocator.first()).toHaveText('VuePress E2E', {
    useInnerText: true,
  })
  // description
  await expect(descriptionLocator).toHaveCount(1)
  await expect(descriptionLocator.first()).toHaveAttribute(
    'content',
    'VuePress E2E 测试站点',
  )
  // head
  await expect(fooLocator).toHaveCount(1)
  await expect(fooLocator.first()).toHaveAttribute('content', 'foo')
  await expect(barLocator).toHaveCount(1)
  await expect(barLocator.first()).toHaveAttribute('content', 'foobar zh')
  await expect(bazLocator).toHaveCount(1)
  await expect(bazLocator.first()).toHaveAttribute('content', 'baz')
  await expect(fooZhLocator).toHaveCount(1)
  await expect(fooZhLocator.first()).toHaveAttribute('content', 'foo-zh')
})
