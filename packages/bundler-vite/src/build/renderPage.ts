import { renderPageToString } from '@vuepress/bundlerutils'
import type { App, Page } from '@vuepress/core'
import { fs, renderHead } from '@vuepress/utils'
import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import type { App as VueApp } from 'vue'
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
  ssrTemplate,
  output,
  outputEntryChunk,
  outputCssAsset,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: Router
  ssrTemplate: string
  output: RollupOutput['output']
  outputEntryChunk: OutputChunk
  outputCssAsset: OutputAsset | undefined
}): Promise<void> => {
  // render current page to string
  const { ssrContext, ssrString } = await renderPageToString({
    page,
    vueApp,
    vueRouter,
  })

  // resolve page chunks
  const pageChunkFiles = resolvePageChunkFiles({ page, output })

  // generate html string
  const html = await app.options.templateBuildRenderer(ssrTemplate, {
    content: ssrString,
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
