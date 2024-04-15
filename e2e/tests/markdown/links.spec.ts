import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test('should render links and navigate between pages correctly', async ({
  page,
}) => {
  const linksLocator = page.locator('.e2e-theme-content ul li a')

  await page.goto('/markdown/links/foo.html')

  await expect(linksLocator).toHaveCount(2)
  await expect(linksLocator.first()).toHaveText('bar')

  await linksLocator.first().click()
  await expect(page).toHaveURL(`${BASE}markdown/links/bar.html`)

  await expect(linksLocator).toHaveCount(2)
  await expect(linksLocator.last()).toHaveText('baz')

  await linksLocator.last().click()
  await expect(page).toHaveURL(`${BASE}markdown/links/baz.html`)

  await expect(linksLocator).toHaveCount(2)
  await expect(linksLocator.first()).toHaveText('foo')

  await linksLocator.first().click()
  await expect(page).toHaveURL(`${BASE}markdown/links/foo.html`)
})
