import { expect, test } from '@playwright/test'

import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('components/auto-link.html')
})

test('should render route-link correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #route-link a')

  for (const el of await locator.all()) {
    await expect(el).toHaveAttribute('class', /route-link/)
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

test('should open a resolved page in a new tab', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Open in new tab' })
  const href = `${BASE}components/route-link.html?source=auto-link#query-and-hash`

  await expect(link).toHaveAttribute('href', href)
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', 'nofollow')
  await expect(link).toHaveClass(/\bexternal-link\b/)
  await expect(link).not.toHaveClass(/\broute-link-active\b/)
  await expect(page.locator('iframe[name=auto-link-preview]')).toBeVisible()
  const originalUrl = page.url()

  const popupPromise = page.waitForEvent('popup')
  await link.click()
  const popup = await popupPromise

  const destination = new URL(href, originalUrl)
  await expect(popup).toHaveURL(
    (url) =>
      url.pathname === destination.pathname && url.hash === destination.hash,
  )
  await expect(popup.locator('#query-and-hash')).toBeVisible()
  await expect(page).toHaveURL(originalUrl)
})

test('should use the target attribute to open a resolved page in a named frame', async ({
  page,
}) => {
  const link = page.getByRole('link', { name: 'Open in preview' })
  const frame = page.locator('iframe[name=auto-link-preview]')

  await expect(frame).toBeVisible()
  const originalUrl = page.url()
  await expect(link).toHaveAttribute(
    'href',
    `${BASE}components/route-link.html`,
  )
  await expect(link).toHaveAttribute('target', 'auto-link-preview')
  await expect(link).not.toHaveAttribute('rel')
  await link.click()

  await expect(frame.contentFrame().locator('#home-page')).toBeVisible()
  await expect(page).toHaveURL(originalUrl)
})

test('should preserve native links to static files and already based URLs', async ({
  page,
}) => {
  await expect(page.getByRole('link', { name: 'Static file' })).toHaveAttribute(
    'href',
    '/assets/manual.pdf',
  )
  await expect(page.getByRole('link', { name: 'Based page' })).toHaveAttribute(
    'href',
    `${BASE}components/route-link.html`,
  )
})

test('should render slots correctly', async ({ page }) => {
  const locator = page.locator('.e2e-theme-content #slots a')

  await expect(locator.nth(0)).toHaveText('slot-text')
  await expect(locator.nth(1)).toHaveText('label')
  await expect(locator.nth(2)).toHaveText('beforetext3after')
  await expect(locator.nth(3)).toHaveText('before labeltext4after label')
})
