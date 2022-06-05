import type { App, Page, PageOptions } from '../types'
import { inferPagePath } from './inferPagePath'
import { renderPageContent } from './renderPageContent'
import { renderPageExcerpt } from './renderPageExcerpt'
import { resolvePageComponentInfo } from './resolvePageComponentInfo'
import { resolvePageContent } from './resolvePageContent'
import { resolvePageDataInfo } from './resolvePageDataInfo'
import { resolvePageDate } from './resolvePageDate'
import { resolvePageFileContent } from './resolvePageFileContent'
import { resolvePageFilePath } from './resolvePageFilePath'
import { resolvePageFrontmatter } from './resolvePageFrontmatter'
import { resolvePageHtmlInfo } from './resolvePageHtmlInfo'
import { resolvePageKey } from './resolvePageKey'
import { resolvePageLang } from './resolvePageLang'
import { resolvePagePath } from './resolvePagePath'
import { resolvePagePermalink } from './resolvePagePermalink'
import { resolvePageRouteMeta } from './resolvePageRouteMeta'
import { resolvePageSlug } from './resolvePageSlug'

export const createPage = async (
  app: App,
  options: PageOptions
): Promise<Page> => {
  // plugin hook: extendsPageOptions
  await app.pluginApi.hooks.extendsPageOptions.process(options, app)

  // resolve page file absolute path and relative path
  const { filePath, filePathRelative } = resolvePageFilePath({
    app,
    options,
  })

  // read the raw file content according to the absolute file path
  const contentRaw = await resolvePageFileContent({ filePath, options })

  // resolve content & frontmatter & raw excerpt from raw content
  const { content, frontmatterRaw, excerptRaw } = resolvePageContent({
    contentRaw,
  })

  // resolve frontmatter from raw frontmatter and page options
  const frontmatter = resolvePageFrontmatter({ frontmatterRaw, options })

  // render excerpt
  const excerpt = renderPageExcerpt({
    app,
    excerptRaw,
    filePath,
    filePathRelative,
    frontmatter,
  })

  // render page content and extract information
  const { contentRendered, deps, headers, hoistedTags, links, title } =
    await renderPageContent({
      app,
      content,
      filePath,
      filePathRelative,
      frontmatter,
    })

  // resolve route meta from frontmatter
  const routeMeta = resolvePageRouteMeta({ frontmatter })

  // resolve slug from file path
  const slug = resolvePageSlug({ filePathRelative })

  // resolve date from file path
  const date = resolvePageDate({ frontmatter, filePathRelative })

  // infer page path according to file path
  const { pathInferred, pathLocale } = inferPagePath({ app, filePathRelative })

  // resolve language from frontmatter and site options
  const lang = resolvePageLang({ app, frontmatter, pathLocale })

  // resolve page permalink
  const permalink = resolvePagePermalink({
    app,
    frontmatter,
    slug,
    date,
    pathInferred,
    pathLocale,
  })

  // resolve page path
  const path = resolvePagePath({ permalink, pathInferred, options })

  // resolve page key
  const key = resolvePageKey({ path })

  // resolve page rendered html file path
  const { htmlFilePath, htmlFilePathRelative } = resolvePageHtmlInfo({
    app,
    path,
  })

  // resolve page component and extract headers & links
  const {
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName,
  } = await resolvePageComponentInfo({
    app,
    htmlFilePathRelative,
    key,
  })

  const { dataFilePath, dataFilePathRelative, dataFileChunkName } =
    resolvePageDataInfo({ app, htmlFilePathRelative, key })

  const page: Page = {
    // page data
    data: {
      key,
      path,
      title,
      lang,
      frontmatter,
      excerpt,
      headers,
    },

    // base fields
    key,
    path,
    title,
    lang,
    frontmatter,
    excerpt,
    headers,

    // extra fields
    content,
    contentRendered,
    date,
    deps,
    hoistedTags,
    links,
    pathInferred,
    pathLocale,
    permalink,
    routeMeta,
    slug,

    // file info
    filePath,
    filePathRelative,
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName,
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName,
    htmlFilePath,
    htmlFilePathRelative,
  }

  // plugin hook: extendsPage
  await app.pluginApi.hooks.extendsPage.process(page, app)

  return page
}
