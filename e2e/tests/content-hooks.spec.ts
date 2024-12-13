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

test('should call content mounted hook', async ({ page }) => {
  const mountedLocator = page.locator(
    '.markdown-content-hooks .markdown-content-mounted',
  )
  await page.goto('content-hooks/content.html')

  await expect(mountedLocator).toHaveText(
    'mounted: /content-hooks/content.html 1',
  )
})

/**
 * onContentChange hook should only called in development
 */
test('should call content change hook', async ({ page }) => {
  const mountedLocator = page.locator(
    '.markdown-content-hooks .markdown-content-mounted',
  )
  const changeLocator = page.locator(
    '.markdown-content-hooks .markdown-content-change',
  )
  await page.goto('content-hooks/content.html')

  await updateMarkdownContent()
  await expect(changeLocator).toHaveText(`changedCount: ${IS_DEV ? 1 : 0}`) // 1

  await updateMarkdownContent()
  await expect(changeLocator).toHaveText(`changedCount: ${IS_DEV ? 2 : 0}`) // 2

  // update content but mounted hook should not be called twice
  await expect(mountedLocator).toHaveText(
    'mounted: /content-hooks/content.html 1',
  )
})

test('should call content before unmount hook', async ({ page }) => {
  const beforeUnmountLocator = page.locator(
    '.markdown-content-hooks .markdown-content-before-unmount',
  )
  await page.goto('content-hooks/content.html')
  await page.locator('.e2e-theme-nav ul > li > a').nth(0).click()

  await expect(beforeUnmountLocator).toHaveText(
    'beforeUnmount: /content-hooks/content.html',
  )
})
