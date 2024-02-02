import { debug, globby } from '@vuepress/utils'
import { createPage } from '../page/index.js'
import type { App, Page } from '../types/index.js'

const log = debug('vuepress:core/app')

/**
 * Resolve pages for vuepress app
 */
export const resolveAppPages = async (app: App): Promise<Page[]> => {
  log('resolveAppPages start')

  // resolve page absolute file paths according to the page patterns
  const pageFilePaths = await globby(app.options.pagePatterns, {
    absolute: true,
    cwd: app.dir.source(),
  })

  // create pages from files
  const pages = await Promise.all(
    pageFilePaths.map((filePath) => createPage(app, { filePath })),
  )

  // find the 404 page
  const notFoundPage = pages.find((page) => page.path === '/404.html')

  // if there is a 404 page, set the default layout to NotFound
  if (notFoundPage) {
    notFoundPage.frontmatter.layout ??= 'NotFound'
  }
  // if there is no 404 page, add one
  else {
    pages.push(
      await createPage(app, {
        path: '/404.html',
        frontmatter: { layout: 'NotFound' },
        content: '404 Not Found',
      }),
    )
  }

  log('resolveAppPages finish')

  return pages
}
