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

const LINKED_PAGE_CASES = [
  {
    name: 'without a permalink',
    path: 'resource-hints/linked.html',
  },
  {
    name: 'with a permalink',
    path: 'resource-hints/linked-permalink/',
  },
  {
    name: 'with an exact path that collides with a redirect',
    path: 'resource-hints/redirect-collision.html',
  },
] as const

if (IS_PROD) {
  test.describe('default resource hints', () => {
    let allLinkedPageFiles: string[]
    let linkedPageFiles: Map<string, string[]>
    let sourceInfo: PageResourceInfo
    let sourcePageFiles: string[]
    let unlinkedPageFiles: string[]
    let virtualSourceInfo: PageResourceInfo
    let virtualSourcePageFiles: string[]

    test.beforeAll(async ({ browser }) => {
      const page = await browser.newPage()

      const linkedInfos = new Map<string, PageResourceInfo>()
      for (const linkedPageCase of LINKED_PAGE_CASES) {
        linkedInfos.set(
          linkedPageCase.path,
          await collectPageResourceInfo(page, linkedPageCase.path),
        )
      }
      const unlinkedInfo = await collectPageResourceInfo(
        page,
        'resource-hints/unlinked.html',
      )
      sourceInfo = await collectPageResourceInfo(
        page,
        'resource-hints/source.html',
      )
      virtualSourceInfo = await collectPageResourceInfo(
        page,
        'resource-hints/virtual-source.html',
      )

      const allLinkedPageResources = [
        ...new Set(
          [...linkedInfos.values()].flatMap(({ resources }) => resources),
        ),
      ]
      linkedPageFiles = new Map(
        [...linkedInfos].map(([path, { resources }]) => [
          path,
          difference(resources, unlinkedInfo.resources),
        ]),
      )
      allLinkedPageFiles = difference(
        allLinkedPageResources,
        unlinkedInfo.resources,
      )
      unlinkedPageFiles = difference(
        unlinkedInfo.resources,
        allLinkedPageResources,
      )
      sourcePageFiles = sourceInfo.resources.filter(
        (file) =>
          !allLinkedPageResources.includes(file) &&
          !unlinkedInfo.resources.includes(file),
      )
      virtualSourcePageFiles = virtualSourceInfo.resources.filter(
        (file) =>
          !allLinkedPageResources.includes(file) &&
          !unlinkedInfo.resources.includes(file),
      )

      await page.close()
    })

    LINKED_PAGE_CASES.forEach((linkedPageCase) => {
      test(`should not preload linked page files ${linkedPageCase.name}`, () => {
        const pageFiles = linkedPageFiles.get(linkedPageCase.path) ?? []

        expect(pageFiles.length).toBeGreaterThan(0)
        pageFiles.forEach((file) => {
          expect(sourceInfo.preload).not.toContain(file)
        })
      })

      test(`should prefetch linked page files ${linkedPageCase.name}`, () => {
        const pageFiles = linkedPageFiles.get(linkedPageCase.path) ?? []

        expect(pageFiles.length).toBeGreaterThan(0)
        pageFiles.forEach((file) => {
          expect(sourceInfo.prefetch).toContain(file)
        })
      })
    })

    test('should not preload unlinked page files', () => {
      expect(unlinkedPageFiles.length).toBeGreaterThan(0)

      unlinkedPageFiles.forEach((file) => {
        expect(sourceInfo.preload).not.toContain(file)
      })
    })

    test('should only prefetch linked page files', () => {
      expect(sourcePageFiles.length).toBeGreaterThan(0)
      expect(sourceInfo.prefetch.length).toBeGreaterThan(0)

      sourcePageFiles.forEach((file) => {
        expect(sourceInfo.prefetch).not.toContain(file)
      })
      unlinkedPageFiles.forEach((file) => {
        expect(sourceInfo.prefetch).not.toContain(file)
      })
      sourceInfo.prefetch.forEach((file) => {
        expect(allLinkedPageFiles).toContain(file)
      })
    })

    test('should not preload linked page files from a virtual page', () => {
      expect(allLinkedPageFiles.length).toBeGreaterThan(0)

      allLinkedPageFiles.forEach((file) => {
        expect(virtualSourceInfo.preload).not.toContain(file)
      })
    })

    test('should only prefetch linked page files from a virtual page', () => {
      expect(virtualSourcePageFiles.length).toBeGreaterThan(0)
      expect(virtualSourceInfo.prefetch.length).toBeGreaterThan(0)

      allLinkedPageFiles.forEach((file) => {
        expect(virtualSourceInfo.prefetch).toContain(file)
      })
      virtualSourcePageFiles.forEach((file) => {
        expect(virtualSourceInfo.prefetch).not.toContain(file)
      })
      unlinkedPageFiles.forEach((file) => {
        expect(virtualSourceInfo.prefetch).not.toContain(file)
      })
      virtualSourceInfo.prefetch.forEach((file) => {
        expect(allLinkedPageFiles).toContain(file)
      })
    })
  })
}
