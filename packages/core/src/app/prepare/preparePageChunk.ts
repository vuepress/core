import { renderPageToVue } from '../../page/index.js'
import type { App, Page } from '../../types/index.js'

/**
 * Generate temp file the page does not have a source file
 */
export const preparePageChunk = async (app: App, page: Page): Promise<void> => {
  if (page.filePath === null) {
    await app.writeTemp(page.chunkFilePathRelative, renderPageToVue(app, page))
  }
}
