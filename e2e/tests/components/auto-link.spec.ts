import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('components/auto-link.html')
})

test('should render route-link correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #route-link a')

  const count = await locator.count()

  const results = [
    '/',
    '/',
    '/',
    '/not-existent.html',
    '/not-existent.html',
    '/not-existent.html',
    '/routes/non-ascii-paths/中文目录名/中文文件名.html',
    '/routes/non-ascii-paths/中文目录名/中文文件名.html',
    '/routes/non-ascii-paths/中文目录名/中文文件名.html',
    '/#hash',
    '/?query',
    '/?query#hash',
    '#hash',
    '?query',
    '?query#hash',
    'route-link.html',
    'route-link.html',
    'route-link.html',
    'not-existent.html',
    'not-existent.html',
    'not-existent.html',
    '../',
    '../',
    '../404.html',
    '../404.html',
  ]

  for (let index = 0; index < count; index++) {
    const el = locator.nth(index)

    await expect(el).toHaveAttribute('class', /route-link/)
    await expect(el).toHaveAttribute('href', results[0].replace(/^\//, BASE))
  }
})

test('should render external-link correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #external-link a')

  for (const el of await locator.all()) {
    await expect(el).toHaveAttribute('class', /external-link/)
  }
})

test('should render config correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #config a')

  await expect(locator.nth(0)).toHaveText('text1')
  await expect(locator.nth(0)).toHaveAttribute('href', BASE)
  await expect(locator.nth(0)).toHaveAttribute('aria-label', 'label')

  await expect(locator.nth(1)).toHaveText('text2')
  await expect(locator.nth(1)).toHaveAttribute(
    'href',
    'https://example.com/test/',
  )
  await expect(locator.nth(1)).toHaveAttribute('target', '_blank')
  await expect(locator.nth(1)).toHaveAttribute('rel', 'noopener noreferrer')
})

test('should append attrs correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #attrs a')

  await expect(locator.nth(0)).toHaveText('text1')
  await expect(locator.nth(0)).toHaveAttribute('href', BASE)
  await expect(locator.nth(0)).toHaveAttribute('aria-label', 'label')
  await expect(locator.nth(0)).toHaveAttribute('class', /class/)
  await expect(locator.nth(0)).not.toHaveAttribute('icon')

  await expect(locator.nth(1)).toHaveText('text2')
  await expect(locator.nth(1)).toHaveAttribute(
    'href',
    'https://example.com/test/',
  )
  await expect(locator.nth(1)).toHaveAttribute('target', '_blank')
  await expect(locator.nth(1)).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(locator.nth(1)).toHaveAttribute('id', 'id')
  await expect(locator.nth(1)).not.toHaveAttribute('unknown')

  await expect(locator.nth(2)).toHaveText('text3')
  await expect(locator.nth(2)).toHaveAttribute(
    'href',
    'https://example.com/test.png',
  )
  await expect(locator.nth(2)).toHaveAttribute('target', '_blank')
  await expect(locator.nth(2)).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(locator.nth(2)).toHaveAttribute('download', 'example-test.png')
})

test('should render slots correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #slots a')

  await expect(locator.nth(0)).toHaveText('slot-text')
  await expect(locator.nth(1)).toHaveText('label')
  await expect(locator.nth(2)).toHaveText('beforetext3after')
  await expect(locator.nth(3)).toHaveText('before labeltext4after label')
})
