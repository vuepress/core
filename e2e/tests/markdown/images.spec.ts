import { expect, test } from '@playwright/test'

const IMAGES = [
  'logo-public',
  'logo-relative',
  'logo-alias',
  'img-logo-public',
  'img-logo-relative',
  'img-logo-alias',
  'img-logo-import-relative',
  'img-logo-import-alias',
]

test('should render images correctly', async ({ page }) => {
  const imagesLocator = page.locator('.e2e-theme-content img')

  await page.goto('markdown/images/images.html')

  await expect(imagesLocator).toHaveCount(IMAGES.length)
  for (let i = 0; i < IMAGES.length; i++) {
    await expect(imagesLocator.nth(i)).toHaveAttribute('alt', IMAGES[i])
  }

  for (const img of await imagesLocator.all()) {
    const [status, naturalWidth] = await img.evaluate(
      async (el: HTMLImageElement) => [
        await fetch(el.src).then((res) => res.status),
        el.naturalWidth,
      ],
    )
    expect(status).toEqual(200)
    expect(naturalWidth).toBeGreaterThan(0)
  }
})
