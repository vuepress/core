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
    const { createPage, renderPageToVue } = await import('@vuepress/core')

    // get app instance from loader options
    const { app } = this.getOptions()

    // get the matched page by file path
    const page = app.pagesMap[this.resourcePath]

    // if the page content is not changed, render it to vue component directly
    if (page?.content === source) {
      return renderPageToVue(page)
    }

    // create a new page with the new content
    const newPage = await createPage(app, {
      content: source,
      filePath: this.resourcePath,
    })
    return renderPageToVue(newPage)
  }
