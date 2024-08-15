import type { App, Page } from '@vuepress/core'
import type { VuepressSSRContext } from '@vuepress/shared'
import { fs, renderHead } from '@vuepress/utils'
import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import type { App as VueApp } from 'vue'
import { ssrContextKey } from 'vue'
import type { SSRContext } from 'vue/server-renderer'
import type { Router } from 'vue-router'
import { renderPagePrefetchLinks } from './renderPagePrefetchLinks.js'
import { renderPagePreloadLinks } from './renderPagePreloadLinks.js'
import { renderPageScripts } from './renderPageScripts.js'
import { renderPageStyles } from './renderPageStyles.js'
import { resolvePageChunkFiles } from './resolvePageChunkFiles.js'

export const renderPage = async ({
  app,
  page,
  vueApp,
  vueRouter,
  renderToString,
  ssrTemplate,
  output,
  outputEntryChunk,
  outputCssAsset,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: Router
  renderToString: (input: VueApp, context: SSRContext) => Promise<string>
  ssrTemplate: string
  output: RollupOutput['output']
  outputEntryChunk: OutputChunk
  outputCssAsset: OutputAsset | undefined
}): Promise<void> => {
  // switch to current page route
  await vueRouter.push(page.path)
  await vueRouter.isReady()

  // create vue ssr context with default values
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete, no-underscore-dangle
  delete vueApp._context.provides[ssrContextKey]
  const ssrContext: VuepressSSRContext = {
    lang: 'en',
    head: [],
  }

  // render current page to string
  const pageRendered = await renderToString(vueApp, ssrContext)

  // resolve page chunks
  const pageChunkFiles = resolvePageChunkFiles({ page, output })

  // generate html string
  const html = await app.options.templateBuildRenderer(ssrTemplate, {
    content: pageRendered,
    head: ssrContext.head.map(renderHead).join(''),
    lang: ssrContext.lang,
    prefetch: renderPagePrefetchLinks({
      app,
      outputEntryChunk,
      pageChunkFiles,
    }),
    preload: renderPagePreloadLinks({
      app,
      outputEntryChunk,
      pageChunkFiles,
    }),
    scripts: renderPageScripts({ app, outputEntryChunk }),
    styles: renderPageStyles({ app, outputCssAsset }),
    version: app.version,
  })

  // write html file
  await fs.outputFile(page.htmlFilePath, html)
}
