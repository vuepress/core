import { expect, test } from '@playwright/test'

test('should render images correctly', async ({ page }) => {
  const imagesLocator = page.locator('.e2e-theme-content img')

  await page.goto('markdown/images/images.html')

  await expect(imagesLocator).toHaveCount(6)
  await expect(imagesLocator.nth(0)).toHaveAttribute('alt', 'logo-public')
  await expect(imagesLocator.nth(1)).toHaveAttribute('alt', 'logo-relative')
  await expect(imagesLocator.nth(2)).toHaveAttribute('alt', 'logo-alias')
  await expect(imagesLocator.nth(3)).toHaveAttribute('alt', 'img-logo-public')
  await expect(imagesLocator.nth(4)).toHaveAttribute('alt', 'img-logo-relative')
  await expect(imagesLocator.nth(5)).toHaveAttribute('alt', 'img-logo-alias')

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
