import { renderPageSfcBlocksToVue } from '../../page/index.js'
import type { App, Page } from '../../types/index.js'

/**
 * Generate page component temp file of a single page
 */
export const preparePageComponent = async (
  app: App,
  page: Page,
): Promise<void> => {
  await app.writeTemp(
    page.componentFilePathRelative,
    renderPageSfcBlocksToVue(page.sfcBlocks),
  )
}
