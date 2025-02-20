import { debug, globby } from '@vuepress/utils'
import { createPage } from '../page/index.js'
import type { App, Page } from '../types/index.js'

const log = debug('vuepress:core/app')

/**
 * Resolve pages for vuepress app
 *
 * @internal
 */
export const resolveAppPages = async (app: App): Promise<Page[]> => {
  log('resolveAppPages start')

  // resolve page absolute file paths according to the page patterns
  const pageFilePaths = await globby(app.options.route.pagePatterns, {
    absolute: true,
    cwd: app.dir.source(),
  })

  let hasNotFoundPage = false as boolean

  // create pages from files
  const pages = await Promise.all(
    pageFilePaths.map(async (filePath) => {
      const page = await createPage(app, { filePath })
      // if there is a 404 page, set the default layout to NotFound
      if (page.path === '/404') {
        page.frontmatter.layout ??= 'NotFound'
        hasNotFoundPage = true
      }
      return page
    }),
  )

  // if there is no 404 page, add a virtual one
  if (!hasNotFoundPage) {
    pages.push(
      await createPage(app, {
        path: '/404',
        frontmatter: { layout: 'NotFound' },
        content: '404 Not Found',
      }),
    )
  }

  log('resolveAppPages finish')

  return pages
}
