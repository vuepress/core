import type { App, Page, SSRTemplateRenderer } from '@vuepress/core'
import { fs, renderHead } from '@vuepress/utils'
import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import { ssrContextKey } from 'vue'
import type { App as VueApp } from 'vue'
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
  ssrTemplateRenderer,
  output,
  outputEntryChunk,
  outputCssAsset,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: Router
  renderToString: (input: VueApp, context: SSRContext) => Promise<string>
  ssrTemplateRenderer: SSRTemplateRenderer
  output: RollupOutput['output']
  outputEntryChunk: OutputChunk
  outputCssAsset: OutputAsset | undefined
}): Promise<void> => {
  // switch to current page route
  await vueRouter.push(page.path)
  await vueRouter.isReady()

  // create vue ssr context with default values
  delete vueApp._context.provides[ssrContextKey]
  const ssrContext: SSRContext = {
    lang: 'en',
    head: [],
  }

  // render current page to string
  const pageRendered = await renderToString(vueApp, ssrContext)

  // resolve page chunks
  const pageChunkFiles = resolvePageChunkFiles({ page, output })

  // generate html string
  const html = ssrTemplateRenderer({
    app,
    lang: ssrContext.lang,
    head: ssrContext.head.map(renderHead).join(''),
    preload: renderPagePreloadLinks({
      app,
      outputEntryChunk,
      pageChunkFiles,
    }),
    prefetch: renderPagePrefetchLinks({
      app,
      outputEntryChunk,
      pageChunkFiles,
    }),
    styles: renderPageStyles({ app, outputCssAsset }),
    pageContent: pageRendered,
    scripts: renderPageScripts({ app, outputEntryChunk }),
  })

  // write html file
  await fs.outputFile(page.htmlFilePath, html)
}
