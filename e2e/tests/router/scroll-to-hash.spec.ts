import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { BASE } from '../../utils/env'

/**
 * The scroll margin targets of these pages have a `scroll-margin-top` of
 * `100px`, so scrolling to them should leave them `100px` below the top of the
 * viewport.
 */
const SCROLL_MARGIN_TOP = 100

/**
 * The hash target page renders a fixed header whose height equals the
 * `scroll-margin-top` of its targets, mimicking a theme with a fixed navbar.
 * With the scroll margin honored, the header ends exactly where the target
 * starts, otherwise the target would be covered by the header.
 */
const FIXED_HEADER_HEIGHT = SCROLL_MARGIN_TOP

interface FixedHeaderRect {
  position: string
  top: number
  bottom: number
  height: number
}

const getTargetTop = (page: Page, id: string): Promise<number> =>
  page.evaluate(
    (targetId) =>
      document.getElementById(targetId)!.getBoundingClientRect().top,
    id,
  )

const getFixedHeaderRect = (page: Page): Promise<FixedHeaderRect | null> =>
  page.evaluate(() => {
    const header = document.querySelector<HTMLElement>('.e2e-fixed-header')

    if (!header) return null

    const rect = header.getBoundingClientRect()

    return {
      position: getComputedStyle(header).position,
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
    }
  })

/**
 * The scroll is deferred to the next frame, so the assertion has to wait for it
 * instead of reading the position right after the URL has changed.
 */
const expectTargetTop = (page: Page, id: string): Promise<void> =>
  expect
    .poll(async () => Math.round(await getTargetTop(page, id)))
    .toBe(SCROLL_MARGIN_TOP)

test.beforeEach(async ({ page }) => {
  await page.goto('router/scroll-to-hash.html')
})

test('should honor scroll-margin-top when navigating to a hash on the same page', async ({
  page,
}) => {
  await page.locator('#same-page-target').click()

  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash.html#hash-target`)
  await expectTargetTop(page, 'hash-target')
})

test('should honor scroll-margin-top when the hash contains special characters', async ({
  page,
}) => {
  await page.locator('#same-page-complex-target').click()

  await expect(page).toHaveURL(
    `${BASE}router/scroll-to-hash.html#hash-target:1`,
  )
  await expectTargetTop(page, 'hash-target:1')
})

test('should honor scroll-margin-top when navigating to a hash on another page', async ({
  page,
}) => {
  await page.locator('#another-page-target').click()

  await expect(page).toHaveURL(
    `${BASE}router/scroll-to-hash-target.html#hash-target`,
  )
  await expectTargetTop(page, 'hash-target')
})

test('should keep the hash target clear of a fixed header', async ({
  page,
}) => {
  await page.locator('#another-page-target').click()

  await expect(page).toHaveURL(
    `${BASE}router/scroll-to-hash-target.html#hash-target`,
  )

  const header = await getFixedHeaderRect(page)

  expect(header).not.toBeNull()
  expect(header!.position).toBe('fixed')
  expect(header!.top).toBe(0)
  expect(header!.height).toBe(FIXED_HEADER_HEIGHT)

  // the target starts right below the fixed header instead of being covered by
  // it, `1px` is the tolerance for sub-pixel scroll offsets
  await expect
    .poll(async () => Math.round(await getTargetTop(page, 'hash-target')))
    .toBeGreaterThanOrEqual(Math.floor(header!.bottom) - 1)
})

test('should honor scroll-margin-top when navigating by a markdown link', async ({
  page,
}) => {
  await page.locator('#links + ul > li > a').click()

  await expect(page).toHaveURL(
    `${BASE}router/scroll-to-hash-target.html#hash-target`,
  )
  await expectTargetTop(page, 'hash-target')
})

test('should align a hash target without a scroll margin with the viewport top', async ({
  page,
}) => {
  await page.locator('#same-page-plain-target').click()

  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash.html#plain-target`)
  await expect
    .poll(async () => Math.round(await getTargetTop(page, 'plain-target')))
    .toBe(0)
})

test('should scroll to the top when navigating to another page without a hash', async ({
  page,
}) => {
  await page.locator('#same-page-target').click()
  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash.html#hash-target`)

  await page.locator('#another-page').click()
  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash-target.html`)
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBe(0)
})
