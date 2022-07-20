import {
  createPage,
  preparePageComponent,
  preparePageData,
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from '@vuepress/core'
import type { App, Page } from '@vuepress/core'

/**
 * Event handler for page add event
 *
 * Returns the added page
 */
export const handlePageAdd = async (
  app: App,
  filePath: string
): Promise<Page | null> => {
  // check if the added page is duplicated
  const pageIndex = app.pages.findIndex((page) => page.filePath === filePath)
  if (pageIndex !== -1) {
    return null
  }

  // create page
  const page = await createPage(app, {
    filePath,
  })

  // add the new page
  app.pages.push(page)

  // prepare page files
  await preparePageComponent(app, page)
  await preparePageData(app, page)

  // prepare pages entry
  await preparePagesComponents(app)
  await preparePagesData(app)
  await preparePagesRoutes(app)

  return page
}
