import type { App } from '@vuepress/core'
import type { LoaderDefinitionFunction } from 'webpack'

export interface VuepressMarkdownLoaderOptions {
  app: App
}

/**
 * A webpack loader to transform markdown content to vue component
 */
export const vuepressMarkdownLoader: LoaderDefinitionFunction<VuepressMarkdownLoaderOptions> =
  async function vuepressMarkdownLoader(source) {
    // import esm dependencies
    const [{ parsePageContent, renderPageSfcBlocksToVue }, { path }] =
      await Promise.all([import('@vuepress/core'), import('@vuepress/utils')])

    // get app instance from loader options
    const { app } = this.getOptions()

    // get the matched page by file path
    const page = app.pagesMap[this.resourcePath]

    // if the page content is not changed, render it to vue component directly
    if (page?.content === source) {
      return renderPageSfcBlocksToVue(page.sfcBlocks)
    }

    // parse the markdown content to sfc blocks and render it to vue component
    const { sfcBlocks } = parsePageContent({
      app,
      content: source,
      filePath: this.resourcePath,
      filePathRelative: path.relative(app.dir.source(), this.resourcePath),
      options: {},
    })
    return renderPageSfcBlocksToVue(sfcBlocks)
  }
