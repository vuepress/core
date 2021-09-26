import type { App, Page, PageData } from '../types'

/**
 * Resolve page data
 */
export const resolvePageData = async ({
  app,
  page,
}: {
  app: App
  page: Page
}): Promise<PageData> => {
  const { key, path, title, lang, frontmatter, excerpt, headers } = page
  const data = {
    key,
    path,
    title,
    lang,
    frontmatter,
    excerpt,
    headers,
  }

  // plugin hook: extendsPageData
  const extendsPageData = await app.pluginApi.hooks.extendsPageData.process(
    page,
    app
  )
  extendsPageData.forEach((item) => Object.assign(data, item))

  return data
}
