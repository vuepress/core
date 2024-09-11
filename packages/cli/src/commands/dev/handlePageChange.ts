import type { App, Page } from '@vuepress/core'
import { createPage, preparePageChunk, prepareRoutes } from '@vuepress/core'

/**
 * Event handler for page change event
 *
 * Returns the old page and the new page tuple
 */
export const handlePageChange = async (
  app: App,
  filePath: string,
): Promise<[Page, Page] | null> => {
  // get page index of the changed file
  const pageIndex = app.pages.findIndex((page) => page.filePath === filePath)
  if (pageIndex === -1) {
    return null
  }

  // get the old page of the changed file
  const pageOld = app.pages[pageIndex]

  // create a new page from the changed file
  const pageNew = await createPage(app, {
    filePath,
  })

  // replace the old page with the new page
  app.pages.splice(pageIndex, 1, pageNew)
  app.pagesMap[filePath] = pageNew

  // prepare page files
  await preparePageChunk(app, pageNew)

  const isPathChanged = pageOld.path !== pageNew.path
  const isRouteMetaChanged =
    JSON.stringify(pageOld.routeMeta) !== JSON.stringify(pageNew.routeMeta)

  // prepare routes file if the path or route meta is changed
  if (isPathChanged || isRouteMetaChanged) {
    await prepareRoutes(app)
  }

  return [pageOld, pageNew]
}
