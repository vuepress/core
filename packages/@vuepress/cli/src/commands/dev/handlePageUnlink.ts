import {
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from '@vuepress/core'
import type { App, Page } from '@vuepress/core'

/**
 * Event handler for page unlink event
 *
 * Returns the removed page
 */
export const handlePageUnlink = async (
  app: App,
  filePath: string
): Promise<Page | null> => {
  // check if the unlinked page is existed
  const pageIndex = app.pages.findIndex((page) => page.filePath === filePath)
  if (pageIndex === -1) {
    return null
  }

  const page = app.pages[pageIndex]

  // remove the old page
  app.pages.splice(pageIndex, 1)

  // re-prepare page files
  await preparePagesComponents(app)
  await preparePagesData(app)
  await preparePagesRoutes(app)

  return page
}
