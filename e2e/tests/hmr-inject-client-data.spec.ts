import { expect, test } from '@playwright/test'

import { IS_DEV } from '../utils/env'
import { readSourceMarkdown, writeSourceMarkdown } from '../utils/source'

const updateContent = async (): Promise<void> => {
  const markdownContent = await readSourceMarkdown('hmr/inject-client-data.md')
  await writeSourceMarkdown(
    'hmr/inject-client-data.md',
    markdownContent.replace('Current Content', 'Updated Content'),
  )
}

const restoreContent = async (): Promise<void> => {
  const markdownContent = await readSourceMarkdown('hmr/inject-client-data.md')
  await writeSourceMarkdown(
    'hmr/inject-client-data.md',
    markdownContent.replace('Updated Content', 'Current Content'),
  )
}

if (IS_DEV) {
  test.beforeEach(async () => {
    await restoreContent()
  })
  test.afterAll(async () => {
    await restoreContent()
  })

  test('should update content when include component (inject client data)', async ({
    page,
  }) => {
    await page.goto('hmr/inject-client-data.html')
    const contentLocator = page.locator('.e2e-theme-content #content + p')

    await expect(contentLocator).toHaveText('Current Content')
    await updateContent()
    await expect(contentLocator).toHaveText('Updated Content')
  })
}
