import type { App, Page } from '@vuepress/core'
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
  const html = ssrTemplate
    // vuepress version
    .replace('{{ version }}', app.version)
    // page lang
    .replace('{{ lang }}', ssrContext.lang)
    // page head
    .replace(
      '<!--vuepress-ssr-head-->',
      ssrContext.head.map(renderHead).join('')
    )
    // page preload & prefetch links
    .replace(
      '<!--vuepress-ssr-resources-->',
      `${renderPagePreloadLinks({
        app,
        outputEntryChunk,
        pageChunkFiles,
      })}${renderPagePrefetchLinks({
        app,
        outputEntryChunk,
        pageChunkFiles,
      })}`
    )
    // page styles
    .replace(
      '<!--vuepress-ssr-styles-->',
      renderPageStyles({ app, outputCssAsset })
    )
    // page content
    // notice that some special chars in string like `$&` would be recognized by `replace()`,
    // and they won't be html-escaped and will be kept as is when they are inside a code block,
    // so we use a replace function as the second param to avoid those potential issues
    .replace('<!--vuepress-ssr-app-->', () => pageRendered)
    // page scripts
    .replace(
      '<!--vuepress-ssr-scripts-->',
      renderPageScripts({ app, outputEntryChunk })
    )

  // write html file
  await fs.outputFile(page.htmlFilePath, html)
}
