import { expect, test } from '@playwright/test'

test('should render anchors and navigate correctly', async ({ page }) => {
  const headingLocator = page.locator('.e2e-theme-content h1')
  const anchorLocator = page.locator('.e2e-theme-content h1 > a')
  const anchorOneDashOneLocator = page.locator('#anchor-1-1 > a')

  await page.goto('markdown/anchors.html')

  await expect(headingLocator).toHaveAttribute('id', 'title')
  await expect(headingLocator).toHaveAttribute('tabindex', '-1')

  await expect(anchorLocator).toHaveAttribute('class', 'header-anchor')
  await expect(anchorLocator).toHaveAttribute('href', '#title')

  await anchorLocator.click()
  expect(await page.evaluate(() => window.location.hash)).toEqual('#title')

  await expect(anchorOneDashOneLocator).toHaveAttribute(
    'class',
    'header-anchor',
  )

  await anchorOneDashOneLocator.click()
  expect(await page.evaluate(() => window.location.hash)).toEqual('#anchor-1-1')
})
