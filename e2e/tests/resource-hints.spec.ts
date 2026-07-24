import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { IS_PROD } from '../utils/env'

interface PageResourceInfo {
  prefetch: string[]
  preload: string[]
  resources: string[]
}

const collectPageResourceInfo = async (
  page: Page,
  path: string,
): Promise<PageResourceInfo> => {
  await page.goto(path)
  await page.waitForLoadState('networkidle')

  const links = await page
    .locator('head link[rel][href]')
    .evaluateAll((elements) =>
      elements.map((element) => ({
        href: element.getAttribute('href') ?? '',
        rel: element.getAttribute('rel') ?? '',
      })),
    )
  const resources = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map(({ name }) => new URL(name).pathname),
  )

  return {
    prefetch: links
      .filter(({ rel }) => rel === 'prefetch')
      .map(({ href }) => href),
    preload: links
      .filter(({ rel }) => rel === 'preload' || rel === 'modulepreload')
      .map(({ href }) => href),
    resources: resources.filter((file) => /\.(?:css|js)$/.test(file)),
  }
}

const difference = (values: string[], otherValues: string[]): string[] =>
  values.filter((value) => !otherValues.includes(value))

if (IS_PROD) {
  test.describe('as-needed resource hints', () => {
    let sourceInfo: PageResourceInfo
    let linkedPageFiles: string[]
    let sourcePageFiles: string[]
    let unlinkedPageFiles: string[]

    test.beforeAll(async ({ browser }) => {
      const page = await browser.newPage()

      const linkedInfo = await collectPageResourceInfo(
        page,
        'resource-hints/linked.html',
      )
      const unlinkedInfo = await collectPageResourceInfo(
        page,
        'resource-hints/unlinked.html',
      )
      sourceInfo = await collectPageResourceInfo(
        page,
        'resource-hints/source.html',
      )

      linkedPageFiles = difference(linkedInfo.resources, unlinkedInfo.resources)
      unlinkedPageFiles = difference(
        unlinkedInfo.resources,
        linkedInfo.resources,
      )
      sourcePageFiles = sourceInfo.resources.filter(
        (file) =>
          !linkedInfo.resources.includes(file) &&
          !unlinkedInfo.resources.includes(file),
      )

      await page.close()
    })

    test('should only preload linked page files', () => {
      expect(linkedPageFiles.length).toBeGreaterThan(0)
      expect(unlinkedPageFiles.length).toBeGreaterThan(0)

      linkedPageFiles.forEach((file) => {
        expect(sourceInfo.preload).toContain(file)
      })
      unlinkedPageFiles.forEach((file) => {
        expect(sourceInfo.preload).not.toContain(file)
      })
    })

    test('should only prefetch linked page files', () => {
      expect(sourcePageFiles.length).toBeGreaterThan(0)
      expect(sourceInfo.prefetch.length).toBeGreaterThan(0)

      linkedPageFiles.forEach((file) => {
        expect(sourceInfo.prefetch).toContain(file)
      })
      sourcePageFiles.forEach((file) => {
        expect(sourceInfo.prefetch).not.toContain(file)
      })
      unlinkedPageFiles.forEach((file) => {
        expect(sourceInfo.prefetch).not.toContain(file)
      })
      sourceInfo.prefetch.forEach((file) => {
        expect(linkedPageFiles).toContain(file)
      })
    })
  })
}
