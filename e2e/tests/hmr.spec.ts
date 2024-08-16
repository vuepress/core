import { expect, test } from '@playwright/test'
import { IS_DEV } from '../utils/env'
import { readSourceMarkdown, writeSourceMarkdown } from '../utils/source'

const hmrUpdateTitle = async (): Promise<void> => {
  const markdownContent = await readSourceMarkdown('hmr/title.md')
  await writeSourceMarkdown(
    'hmr/title.md',
    markdownContent.replace('# HMR Title', '# Updated Title'),
  )
}

const hmrUpdateFrontmatter = async (): Promise<void> => {
  const markdownContent = await readSourceMarkdown('hmr/frontmatter.md')
  await writeSourceMarkdown(
    'hmr/frontmatter.md',
    markdownContent.replace('foo: HMR foo', 'foo: Updated foo'),
  )
}

const hmrRestore = async (): Promise<void> => {
  const titleMarkdownContent = await readSourceMarkdown('hmr/title.md')
  const frontmatterMarkdownContent =
    await readSourceMarkdown('hmr/frontmatter.md')

  await writeSourceMarkdown(
    'hmr/title.md',
    titleMarkdownContent.replace('# Updated Title', '# HMR Title'),
  )
  await writeSourceMarkdown(
    'hmr/frontmatter.md',
    frontmatterMarkdownContent.replace('foo: Updated foo', 'foo: HMR foo'),
  )
}

if (IS_DEV) {
  test.beforeEach(async () => {
    await hmrRestore()
  })
  test.afterAll(async () => {
    await hmrRestore()
  })

  test('should update frontmatter correctly', async ({ page }) => {
    const frontmatterLocator = page.locator(
      '.e2e-theme-content #rendered-foo + p',
    )

    await page.goto('hmr/frontmatter.html')

    await expect(frontmatterLocator).toHaveText('HMR foo')
    await hmrUpdateFrontmatter()
    await expect(frontmatterLocator).toHaveText('Updated foo')
  })

  test('should update title correctly', async ({ page }) => {
    const titleLocator = page.locator('.e2e-theme-content #rendered-title + p')

    await page.goto('hmr/title.html')

    await expect(page).toHaveTitle(/HMR Title/)
    await expect(titleLocator).toHaveText('HMR Title')
    await hmrUpdateTitle()
    await expect(page).toHaveTitle(/Updated Title/)
    await expect(titleLocator).toHaveText('Updated Title')
  })

  test('should update title and frontmatter correctly after navigation', async ({
    page,
  }) => {
    const titleLocator = page.locator('.e2e-theme-content #rendered-title + p')
    const frontmatterLocator = page.locator(
      '.e2e-theme-content #rendered-foo + p',
    )

    await page.goto('hmr/title.html')
    await expect(page).toHaveTitle(/HMR Title/)
    await expect(titleLocator).toHaveText('HMR Title')

    // update title page
    await hmrUpdateTitle()
    await expect(page).toHaveTitle(/Updated Title/)
    await expect(titleLocator).toHaveText('Updated Title')

    // navigate to frontmatter page
    await page
      .locator('.e2e-theme-content #link-to-frontmatter + p > a')
      .click()
    await expect(frontmatterLocator).toHaveText('HMR foo')

    // update frontmatter page
    await hmrUpdateFrontmatter()
    await expect(frontmatterLocator).toHaveText('Updated foo')

    // navigate to back title page
    await page.locator('.e2e-theme-content #link-to-title + p > a').click()
    await expect(page).toHaveTitle(/Updated Title/)
    await expect(titleLocator).toHaveText('Updated Title')

    // navigate to back frontmatter page
    await page
      .locator('.e2e-theme-content #link-to-frontmatter + p > a')
      .click()
    await expect(frontmatterLocator).toHaveText('Updated foo')
  })
}
