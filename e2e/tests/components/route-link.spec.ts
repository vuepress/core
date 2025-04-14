import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env'

test.beforeEach(async ({ page }) => {
  await page.goto('components/route-link.html')
})

test('should render paths correctly', async ({ page }) => {
  const CONFIGS = [
    {
      locator: page.locator('.e2e-theme-content #home-page + ul > li a'),
      href: BASE,
      text: 'text',
    },
    {
      locator: page.locator('.e2e-theme-content #non-existent + ul > li a'),
      href: `${BASE}non-existent.html`,
      text: 'text',
    },
    {
      locator: page.locator('.e2e-theme-content #non-ascii + ul > li a'),
      href: encodeURI(
        `${BASE}routes/non-ascii-paths/中文目录名/中文文件名.html`,
      ),
      text: 'text',
    },
  ]

  for (const { locator, href, text } of CONFIGS) {
    for (const el of await locator.all()) {
      await expect(el).toHaveAttribute('href', href)
      await expect(el).toHaveText(text)
    }
  }
})

test('should render active status correctly', async ({ page }) => {
  const CONFIGS = [
    'route-link route-link-active',
    'route-link route-link-active',
    'route-link route-link-active',
    'route-link route-link-active',
    'route-link',
    'route-link',
    'route-link',
    'route-link',
  ]

  for (const [index, className] of CONFIGS.entries()) {
    await expect(
      page.locator('.e2e-theme-content #active + ul > li a').nth(index),
    ).toHaveAttribute('class', className)
  }
})

test('should render class correctly', async ({ page }) => {
  const CONFIGS = [
    'route-link custom-class',
    'route-link route-link-active custom-class',
    'route-link custom-class',
    'route-link route-link-active custom-class',
  ]

  for (const [index, className] of CONFIGS.entries()) {
    await expect(
      page.locator('.e2e-theme-content #class + ul > li a').nth(index),
    ).toHaveAttribute('class', className)
  }
})

test('should render attributes correctly', async ({ page }) => {
  const CONFIGS = [
    {
      attrName: 'title',
      attrValue: 'Title',
    },
    {
      attrName: 'target',
      attrValue: '_blank',
    },
    {
      attrName: 'rel',
      attrValue: 'noopener',
    },
    {
      attrName: 'aria-label',
      attrValue: 'test',
    },
    {
      attrName: 'title',
      attrValue: 'Title',
    },
    {
      attrName: 'target',
      attrValue: '_blank',
    },
    {
      attrName: 'rel',
      attrValue: 'noopener',
    },
    {
      attrName: 'aria-label',
      attrValue: 'test',
    },
  ]

  for (const [index, { attrName, attrValue }] of CONFIGS.entries()) {
    await expect(
      page.locator('.e2e-theme-content #attrs + ul > li a').nth(index),
    ).toHaveAttribute(attrName, attrValue)
  }
})

test('should render slots correctly', async ({ page }) => {
  const CONFIGS = [
    {
      spansCount: 1,
      spansText: ['text'],
    },
    {
      spansCount: 2,
      spansText: ['text', 'text2'],
    },
    {
      spansCount: 1,
      spansText: ['text'],
    },
    {
      spansCount: 2,
      spansText: ['text', 'text2'],
    },
  ]
  for (const [index, { spansCount, spansText }] of CONFIGS.entries()) {
    const children = await page
      .locator('.e2e-theme-content #slots + ul > li a')
      .nth(index)
      .evaluate((el) =>
        Array.from(el.children).map((child) => child.textContent),
      )
    expect(children).toHaveLength(spansCount)
    expect(children).toStrictEqual(spansText)
  }
})

test('should render query and hash correctly', async ({ page }) => {
  const CONFIGS = [
    `${BASE}#hash`,
    `${BASE}?query`,
    `${BASE}?query#hash`,
    `${BASE}?query=1#hash`,
    `${BASE}?query=1&query=2#hash`,
    `${BASE}#hash`,
    `${BASE}?query`,
    `${BASE}?query#hash`,
    `${BASE}?query=1#hash`,
    `${BASE}?query=1&query=2#hash`,
    `#hash`,
    `?query`,
    `?query#hash`,
    `?query=1#hash`,
    `?query=1&query=2#hash`,
  ]

  for (const [index, href] of CONFIGS.entries()) {
    await expect(
      page.locator('.e2e-theme-content #query-and-hash + ul > li a').nth(index),
    ).toHaveAttribute('href', href)
  }
})

test('should render relative links correctly', async ({ page }) => {
  const CONFIGS = [
    BASE,
    `${BASE}404.html`,
    `${BASE}components/not-exist.html`,
    BASE,
    `${BASE}404.html`,
    `${BASE}components/not-exist.html`,
  ]

  for (const [index, href] of CONFIGS.entries()) {
    await expect(
      page.locator('.e2e-theme-content #relative + ul > li a').nth(index),
    ).toHaveAttribute('href', href)
  }
})
