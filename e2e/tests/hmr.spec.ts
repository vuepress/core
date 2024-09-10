import { expect, test } from '@playwright/test'
import { IS_DEV } from '../utils/env'
import { readSourceMarkdown, writeSourceMarkdown } from '../utils/source'

const hmrUpdateContent = async (): Promise<void> => {
  const markdownContent = await readSourceMarkdown('hmr/content.md')
  await writeSourceMarkdown(
    'hmr/content.md',
    markdownContent.replace('HMR content', 'Updated content'),
  )
}

const hmrUpdateFrontmatter = async (): Promise<void> => {
  const markdownContent = await readSourceMarkdown('hmr/frontmatter.md')
  await writeSourceMarkdown(
    'hmr/frontmatter.md',
    markdownContent.replace('foo: HMR foo', 'foo: Updated foo'),
  )
}

const hmrUpdateTitle = async (): Promise<void> => {
  const markdownContent = await readSourceMarkdown('hmr/title.md')
  await writeSourceMarkdown(
    'hmr/title.md',
    markdownContent.replace('# HMR Title', '# Updated Title'),
  )
}

const hmrRestore = async (): Promise<void> => {
  const contentMarkdownContent = await readSourceMarkdown('hmr/content.md')
  const frontmatterMarkdownContent =
    await readSourceMarkdown('hmr/frontmatter.md')
  const titleMarkdownContent = await readSourceMarkdown('hmr/title.md')

  await writeSourceMarkdown(
    'hmr/content.md',
    contentMarkdownContent.replace('Updated content', 'HMR content'),
  )
  await writeSourceMarkdown(
    'hmr/frontmatter.md',
    frontmatterMarkdownContent.replace('foo: Updated foo', 'foo: HMR foo'),
  )
  await writeSourceMarkdown(
    'hmr/title.md',
    titleMarkdownContent.replace('# Updated Title', '# HMR Title'),
  )
}

if (IS_DEV) {
  test.beforeEach(async () => {
    await hmrRestore()
  })
  test.afterAll(async () => {
    await hmrRestore()
  })

  test('should update content correctly', async ({ page }) => {
    const contentLocator = page.locator('.e2e-theme-content #content + p')

    await page.goto('hmr/content.html')

    await expect(contentLocator).toHaveText('HMR content')
    await hmrUpdateContent()
    await expect(contentLocator).toHaveText('Updated content')
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
    const titleLocator = page.locator('.e2e-theme-content h1')
    const renderedTitleLocator = page.locator(
      '.e2e-theme-content #rendered-title + p',
    )

    await page.goto('hmr/title.html')

    await expect(page).toHaveTitle(/HMR Title/)
    await expect(titleLocator).toHaveText('HMR Title')
    await expect(renderedTitleLocator).toHaveText('HMR Title')
    await hmrUpdateTitle()
    await expect(page).toHaveTitle(/Updated Title/)
    await expect(titleLocator).toHaveText('Updated Title')
    await expect(renderedTitleLocator).toHaveText('Updated Title')
  })

  test('should update content and frontmatter and title correctly after navigation', async ({
    page,
  }) => {
    // text locators
    const contentLocator = page.locator('.e2e-theme-content #content + p')
    const frontmatterLocator = page.locator(
      '.e2e-theme-content #rendered-foo + p',
    )
    const titleLocator = page.locator('.e2e-theme-content #rendered-title + p')
    const renderedTitleLocator = page.locator(
      '.e2e-theme-content #rendered-title + p',
    )

    // link locators
    const contentPageLinkLocator = page.locator(
      '.e2e-theme-content #link-to-content + p > a',
    )
    const frontmatterPageLinkLocator = page.locator(
      '.e2e-theme-content #link-to-frontmatter + p > a',
    )
    const titlePageLinkLocator = page.locator(
      '.e2e-theme-content #link-to-title + p > a',
    )

    // start from title page
    await page.goto('hmr/title.html')
    await expect(page).toHaveTitle(/HMR Title/)
    await expect(titleLocator).toHaveText('HMR Title')
    await expect(renderedTitleLocator).toHaveText('HMR Title')

    // update title page
    await hmrUpdateTitle()
    await expect(page).toHaveTitle(/Updated Title/)
    await expect(titleLocator).toHaveText('Updated Title')
    await expect(renderedTitleLocator).toHaveText('Updated Title')

    // navigate to frontmatter page
    await frontmatterPageLinkLocator.click()
    await expect(frontmatterLocator).toHaveText('HMR foo')

    // update frontmatter page
    await hmrUpdateFrontmatter()
    await expect(frontmatterLocator).toHaveText('Updated foo')

    // navigate to content page
    await contentPageLinkLocator.click()
    await expect(contentLocator).toHaveText('HMR content')

    // update content page
    await hmrUpdateContent()
    await expect(contentLocator).toHaveText('Updated content')

    // navigate to back title page
    await titlePageLinkLocator.click()
    await expect(page).toHaveTitle(/Updated Title/)
    await expect(titleLocator).toHaveText('Updated Title')

    // navigate to back frontmatter page
    await frontmatterPageLinkLocator.click()
    await expect(frontmatterLocator).toHaveText('Updated foo')

    // navigate to back content page
    await contentPageLinkLocator.click()
    await expect(contentLocator).toHaveText('Updated content')
  })
}
