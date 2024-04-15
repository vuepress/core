import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

const PERMALINK_PREFIX = BASE.replace(/\/$/, '')

const CONFIGS = [
  {
    id: 'ascii-ascii',
    filename: 'ascii-ascii.md',
    permalink: '/permalink-ascii-ascii/',
  },
  {
    id: 'ascii-non-ascii',
    filename: 'ascii-non-ascii.md',
    permalink: '/永久链接-ascii-中文/',
  },
  {
    id: '中文-ascii',
    filename: '中文-ascii.md',
    permalink: '/permalink-non-ascii-ascii/',
  },
  {
    id: '中文-中文',
    filename: '中文-中文.md',
    permalink: '/永久链接-中文-中文/',
  },
]

test('should support visiting permalinks directly', async ({ page }) => {
  for (const { permalink } of CONFIGS) {
    await page.goto(encodeURI(permalink))
    await expect(page.locator('.e2e-theme-content p')).toHaveText(permalink)
  }
})

test('should support rendering link by permalink and navigate to it correctly', async ({
  page,
}) => {
  for (const { id, permalink } of CONFIGS) {
    const linksLocator = page.locator(`.e2e-theme-content #${id} + ul > li a`)
    const contentLocator = page.locator('.e2e-theme-content p')

    await page.goto('/routes/permalinks/')

    await expect(linksLocator).toHaveCount(3)

    // `withBase` won't encode the url
    await expect(linksLocator.nth(0)).toHaveAttribute(
      'href',
      `${PERMALINK_PREFIX}${permalink}`,
    )

    // absolute link that does not end with '.md' will not be prepended with `base`
    await expect(linksLocator.nth(1)).toHaveAttribute(
      'href',
      encodeURI(permalink),
    )

    await linksLocator.nth(0).click()

    await expect(page).toHaveURL(`${PERMALINK_PREFIX}${permalink}`)
    await expect(contentLocator).toHaveText(permalink)
  }
})

test('should support rendering link by filename and navigate to it correctly', async ({
  page,
}) => {
  for (const { id, permalink } of CONFIGS) {
    const linksLocator = page.locator(`.e2e-theme-content #${id} + ul > li a`)
    const contentLocator = page.locator('.e2e-theme-content p')

    await page.goto('/routes/permalinks/')

    await expect(linksLocator).toHaveCount(3)

    await expect(linksLocator.nth(2)).toHaveAttribute(
      'href',
      encodeURI(`${PERMALINK_PREFIX}${permalink}`),
    )

    await linksLocator.nth(2).click()

    await expect(page).toHaveURL(encodeURI(`${PERMALINK_PREFIX}${permalink}`))

    await expect(contentLocator).toHaveText(permalink)
  }
})
