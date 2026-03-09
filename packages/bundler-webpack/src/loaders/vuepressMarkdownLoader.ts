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
    const [{ createPage, renderPageToVue }, { path }] = await Promise.all([
      import('@vuepress/core'),
      import('@vuepress/utils'),
    ])

    // get app instance from loader options
    const { app } = this.getOptions()

    // normalize the resource path to use forward slashes on Windows
    const filePath = path.normalize(this.resourcePath)

    // get the matched page by file path
    const page = app.pagesMap[filePath]

    // if the page content is not changed, render it to vue component directly
    if (page?.content === source) {
      return renderPageToVue(app, page)
    }

    // create a new page with the new content
    const newPage = await createPage(app, {
      content: source,
      filePath,
    })
    return renderPageToVue(app, newPage)
  }
