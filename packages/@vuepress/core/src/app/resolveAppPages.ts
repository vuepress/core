import { debug, globby } from '@vuepress/utils'
import { createPage } from '../page'
import type { App, Page } from '../types'

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
    pageFilePaths.map((filePath) => createPage(app, { filePath }))
  )

  // if there is no 404 page, add one
  if (!pages.some((page) => page.path === '/404.html')) {
    pages.push(
      await createPage(app, {
        path: '/404.html',
        frontmatter: {
          layout: '404',
        },
      })
    )
  }

  log('resolveAppPages finish')

  return pages
}
