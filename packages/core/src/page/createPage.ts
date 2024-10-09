import type { App, Page, PageOptions } from '../types/index.js'
import { inferPagePath } from './inferPagePath.js'
import { parsePageContent } from './parsePageContent.js'
import { resolvePageChunkInfo } from './resolvePageChunkInfo.js'
import { resolvePageComponentInfo } from './resolvePageComponentInfo.js'
import { resolvePageContent } from './resolvePageContent.js'
import { resolvePageDate } from './resolvePageDate.js'
import { resolvePageFilePath } from './resolvePageFilePath.js'
import { resolvePageHtmlInfo } from './resolvePageHtmlInfo.js'
import { resolvePageLang } from './resolvePageLang.js'
import { resolvePagePath } from './resolvePagePath.js'
import { resolvePagePermalink } from './resolvePagePermalink.js'
import { resolvePageRouteMeta } from './resolvePageRouteMeta.js'
import { resolvePageSlug } from './resolvePageSlug.js'

/**
 * Create vuepress page object
 */
export const createPage = async (
  app: App,
  options: PageOptions,
): Promise<Page> => {
  // plugin hook: extendsPageOptions
  await app.pluginApi.hooks.extendsPageOptions.process(options, app)

  // resolve page file absolute path and relative path
  const { filePath, filePathRelative } = resolvePageFilePath({
    app,
    options,
  })

  // read the raw file content according to the absolute file path
  const content = await resolvePageContent({ filePath, options })

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
  } = parsePageContent({
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

  // resolve page rendered html file path
  const { htmlFilePath, htmlFilePathRelative } = resolvePageHtmlInfo({
    app,
    path,
  })

  // resolve page component and extract headers & links
  const { componentFilePath, componentFilePathRelative } =
    resolvePageComponentInfo({
      app,
      htmlFilePathRelative,
    })

  const { chunkFilePath, chunkFilePathRelative, chunkName } =
    resolvePageChunkInfo({ app, htmlFilePathRelative })

  const page: Page = {
    // page data
    data: {
      path,
      title,
      lang,
      frontmatter,
    },

    // base fields
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
    chunkFilePath,
    chunkFilePathRelative,
    chunkName,
    htmlFilePath,
    htmlFilePathRelative,
  }

  // plugin hook: extendsPage
  await app.pluginApi.hooks.extendsPage.process(page, app)

  return page
}
