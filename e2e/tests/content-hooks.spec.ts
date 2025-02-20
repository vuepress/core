import { expect, test } from '@playwright/test'
import { IS_DEV } from '../utils/env'
import { readSourceMarkdown, writeSourceMarkdown } from '../utils/source'

const updateMarkdownContent = async (): Promise<void> => {
  const content = await readSourceMarkdown('content-hooks/content.md')
  await writeSourceMarkdown(
    'content-hooks/content.md',
    `${content}\n\nUpdated content`,
  )
}

const restoreMarkdownContent = async (): Promise<void> => {
  await writeSourceMarkdown('content-hooks/content.md', '## title\n\ncontent\n')
}

test.afterAll(async () => {
  await restoreMarkdownContent()
})

test('should call content hook on mounted', async ({ page }) => {
  await page.goto('content-hooks/content.html')
  const mountedLocator = page.locator(
    '.markdown-content-hooks .markdown-content-mounted',
  )
  await expect(mountedLocator).toHaveText(
    'mounted: /content-hooks/content.html 1',
  )

  // update content but mounted hook should not be called twice
  await updateMarkdownContent()
  await expect(mountedLocator).toHaveText(
    'mounted: /content-hooks/content.html 1',
  )
})

/**
 * onContentChange hook should only called in development
 */
test('should call content hook on updated', async ({ page }) => {
  await page.goto('content-hooks/content.html')
  const updatedLocator = page.locator(
    '.markdown-content-hooks .markdown-content-updated',
  )

  await updateMarkdownContent()
  await expect(updatedLocator).toHaveText(`updatedCount: ${IS_DEV ? 1 : 0}`) // 1

  await updateMarkdownContent()
  await expect(updatedLocator).toHaveText(`updatedCount: ${IS_DEV ? 2 : 0}`) // 2
})

test('should call content hook on beforeUnmount', async ({ page }) => {
  await page.goto('content-hooks/content.html')

  const beforeUnmountLocator = page.locator(
    '.markdown-content-hooks .markdown-content-beforeUnmount',
  )

  await page.locator('.e2e-theme-nav ul > li > a').nth(0).click()

  await expect(beforeUnmountLocator).toHaveText('beforeUnmount: /')
})
