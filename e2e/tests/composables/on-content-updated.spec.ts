import { expect, test } from '@playwright/test'
import { BUNDLER, IS_DEV } from '../../utils/env'
import { readSourceMarkdown, writeSourceMarkdown } from '../../utils/source'

const updateMarkdownContent = async (): Promise<void> => {
  const content = await readSourceMarkdown('composables/on-content-updated.md')
  await writeSourceMarkdown(
    'composables/on-content-updated.md',
    `${content}\n\nUpdated content`,
  )
}

const restoreMarkdownContent = async (): Promise<void> => {
  await writeSourceMarkdown(
    'composables/on-content-updated.md',
    '## title\n\ncontent\n',
  )
}

test.afterAll(async () => {
  await restoreMarkdownContent()
})

test('should call content hook on mounted', async ({ page }) => {
  await page.goto('composables/on-content-updated.html')
  const mountedLocator = page.locator(
    '.markdown-content-hooks .markdown-content-mounted',
  )
  await expect(mountedLocator).toHaveText(
    'mounted: /composables/on-content-updated.html 1',
  )

  // update content but mounted hook should not be called twice
  await updateMarkdownContent()
  await expect(mountedLocator).toHaveText(
    'mounted: /composables/on-content-updated.html 1',
  )
})

test('should call content hook on beforeUnmount', async ({ page }) => {
  await page.goto('composables/on-content-updated.html')

  const beforeUnmountLocator = page.locator(
    '.markdown-content-hooks .markdown-content-beforeUnmount',
  )

  await page.locator('.e2e-theme-nav ul > li > a').nth(0).click()

  await expect(beforeUnmountLocator).toHaveText('beforeUnmount: /')
})

/**
 * Updated hooks are only supported for use in development environments.
 * In CI environments, under both Linux and Windows, using Vite fails to correctly trigger hooks.
 */
if (IS_DEV && BUNDLER !== 'vite') {
  test('should call content hook on updated', async ({ page }) => {
    await page.goto('composables/on-content-updated.html')
    const updatedLocator = page.locator(
      '.markdown-content-hooks .markdown-content-updated',
    )

    await updateMarkdownContent()
    await expect(updatedLocator).toHaveText(`updatedCount: 1`)

    await updateMarkdownContent()
    await expect(updatedLocator).toHaveText(`updatedCount: 2`)
  })
}
