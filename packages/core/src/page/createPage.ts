import type { App, Page, PageOptions } from '../types/index.js'
import { inferPagePath } from './inferPagePath.js'
import { renderPageContent } from './renderPageContent.js'
import { resolvePageComponentInfo } from './resolvePageComponentInfo.js'
import { resolvePageDataInfo } from './resolvePageDataInfo.js'
import { resolvePageDate } from './resolvePageDate.js'
import { resolvePageFileContent } from './resolvePageFileContent.js'
import { resolvePageFilePath } from './resolvePageFilePath.js'
import { resolvePageHtmlInfo } from './resolvePageHtmlInfo.js'
import { resolvePageKey } from './resolvePageKey.js'
import { resolvePageLang } from './resolvePageLang.js'
import { resolvePagePath } from './resolvePagePath.js'
import { resolvePagePermalink } from './resolvePagePermalink.js'
import { resolvePageRouteMeta } from './resolvePageRouteMeta.js'
import { resolvePageSlug } from './resolvePageSlug.js'

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
  const content = await resolvePageFileContent({ filePath, options })

  // render page content and extract information
  const {
    contentRendered,
    deps,
    frontmatter,
    headers,
    links,
    markdownEnv,
    sfcBlocks,
    title,
  } = renderPageContent({
    app,
    content,
    filePath,
    filePathRelative,
    options,
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
      headers,
    },

    // base fields
    key,
    path,
    title,
    lang,
    frontmatter,
    headers,

    // extra fields
    content,
    contentRendered,
    date,
    deps,
    links,
    markdownEnv,
    pathInferred,
    pathLocale,
    permalink,
    routeMeta,
    sfcBlocks,
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
