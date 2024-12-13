import { expect, test } from '@playwright/test'
import { IS_DEV } from '../utils/env'
import { readSourceMarkdown, writeSourceMarkdown } from '../utils/source'

let changeCount = 0

const updateMarkdownContent = async (): Promise<void> => {
  changeCount++
  const content = await readSourceMarkdown('content-hooks/content.md')
  await writeSourceMarkdown(
    'content-hooks/content.md',
    `${content}\n\nUpdated content`,
  )
}

const restoreMarkdownContent = async (): Promise<void> => {
  changeCount = 0
  await writeSourceMarkdown('content-hooks/content.md', '## title\n\ncontent\n')
}

test.beforeEach(async () => {
  await restoreMarkdownContent()
})
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

  // update content but mounted hook should not be called twice
  await updateMarkdownContent()
  await expect(mountedLocator).toHaveText(
    'mounted: /content-hooks/content.html 1',
  )
})

/**
 * onContentChange hook should only called in development
 */
test('should call content change hook', async ({ page }) => {
  const changeLocator = page.locator(
    '.markdown-content-hooks .markdown-content-change',
  )
  await page.goto('content-hooks/content.html')

  await updateMarkdownContent()
  await expect(changeLocator).toHaveText(
    `changedCount: ${IS_DEV ? changeCount : 0}`,
  ) // 1

  await updateMarkdownContent()
  await expect(changeLocator).toHaveText(
    `changedCount: ${IS_DEV ? changeCount : 0}`,
  ) // 2
})

test('should call content before unmount hook', async ({ page }) => {
  const beforeUnmountLocator = page.locator(
    '.markdown-content-hooks .markdown-content-before-unmount',
  )
  await page.goto('content-hooks/content.html')
  await page.locator('.e2e-theme-nav a[href="/"]').click()

  await expect(beforeUnmountLocator).toHaveText(
    'beforeUnmount: /content-hooks/content.html',
  )
})
