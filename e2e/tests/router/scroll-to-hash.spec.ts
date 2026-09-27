import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { BASE } from '../../utils/env'

/**
 * The target elements of these pages have a `scroll-margin-top` of `100px`, so
 * scrolling to them should leave them `100px` below the top of the viewport.
 */
const SCROLL_MARGIN_TOP = 100

const getTargetTop = (page: Page, id: string): Promise<number> =>
  page.evaluate(
    (targetId) =>
      document.getElementById(targetId)!.getBoundingClientRect().top,
    id,
  )

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

  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash.html#target`)
  await expectTargetTop(page, 'target')
})

test('should honor scroll-margin-top when the hash contains special characters', async ({
  page,
}) => {
  await page.locator('#same-page-complex-target').click()

  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash.html#target:1`)
  await expectTargetTop(page, 'target:1')
})

test('should honor scroll-margin-top when navigating to a hash on another page', async ({
  page,
}) => {
  await page.locator('#another-page-target').click()

  await expect(page).toHaveURL(
    `${BASE}router/scroll-to-hash-target.html#target`,
  )
  await expectTargetTop(page, 'target')
})

test('should honor scroll-margin-top when navigating by a markdown link', async ({
  page,
}) => {
  await page.locator('#links + ul > li > a').click()

  await expect(page).toHaveURL(
    `${BASE}router/scroll-to-hash-target.html#target`,
  )
  await expectTargetTop(page, 'target')
})

test('should scroll to the top when navigating to another page without a hash', async ({
  page,
}) => {
  await page.locator('#same-page-target').click()
  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash.html#target`)

  await page.locator('#another-page').click()
  await expect(page).toHaveURL(`${BASE}router/scroll-to-hash-target.html`)
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBe(0)
})
