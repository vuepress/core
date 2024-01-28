import type { App, Page, PageOptions } from '../types/index.js'
import { inferPagePath } from './inferPagePath.js'
import { renderPageContent } from './renderPageContent.js'
import { resolvePageChunkInfo } from './resolvePageChunkInfo.js'
import { resolvePageComponentInfo } from './resolvePageComponentInfo.js'
import { resolvePageDate } from './resolvePageDate.js'
import { resolvePageFileContent } from './resolvePageFileContent.js'
import { resolvePageFilePath } from './resolvePageFilePath.js'
import { resolvePageHtmlInfo } from './resolvePageHtmlInfo.js'
import { resolvePageKey } from './resolvePageKey.js'
import { resolvePageLang } from './resolvePageLang.js'
import { resolvePageMeta } from './resolvePageMeta.js'
import { resolvePagePath } from './resolvePagePath.js'
import { resolvePagePermalink } from './resolvePagePermalink.js'
import { resolvePageSlug } from './resolvePageSlug.js'

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
  const meta = resolvePageMeta({ frontmatter })

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
  const { componentFilePath, componentFilePathRelative } =
    await resolvePageComponentInfo({
      app,
      htmlFilePathRelative,
      key,
    })

  const { chunkFilePath, chunkFilePathRelative, chunkName } =
    resolvePageChunkInfo({ app, htmlFilePathRelative, key })

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
    meta,
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

    // TODO: Added for backwards compatibility, remove in next major version
    // @ts-expect-error use meta instead
    routeMeta: new Proxy(meta, {
      set: (obj, prop, value) => {
        console.warn('routeMeta is deprecated, please use meta instead')

        obj[prop as string] = value
        return true
      },
    }),
  }

  // plugin hook: extendsPage
  await app.pluginApi.hooks.extendsPage.process(page, app)

  return page
}
