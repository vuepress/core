import { expect, test } from '@playwright/test'

test('should render images correctly', async ({ page }) => {
  const imagesLocator = page.locator('.e2e-theme-content img')

  await page.goto('markdown/images/images.html')

  await expect(imagesLocator).toHaveCount(2)
  await expect(imagesLocator.first()).toHaveAttribute('alt', 'logo-public')
  await expect(imagesLocator.last()).toHaveAttribute('alt', 'logo-relative')

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
