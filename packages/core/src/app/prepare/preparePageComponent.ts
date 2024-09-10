import { renderPageSfcBlocksToVue } from '../../page/index.js'
import type { App, Page } from '../../types/index.js'

/**
 * Generate page component temp file if the page does not have a source file
 */
export const preparePageComponent = async (
  app: App,
  page: Page,
): Promise<void> => {
  if (page.filePath === null) {
    await app.writeTemp(
      page.componentFilePathRelative,
      renderPageSfcBlocksToVue(page.sfcBlocks),
    )
  }
}
