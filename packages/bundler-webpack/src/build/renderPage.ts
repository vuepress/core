import type { App, Page, SSRTemplateRenderer } from '@vuepress/core'
import type { VuepressSSRContext } from '@vuepress/shared'
import { fs, renderHead } from '@vuepress/utils'
import { ssrContextKey } from 'vue'
import type { App as VueApp } from 'vue'
import type { SSRContext } from 'vue/server-renderer'
import type { Router } from 'vue-router'
import { renderPagePrefetchLinks } from './renderPagePrefetchLinks.js'
import { renderPagePreloadLinks } from './renderPagePreloadLinks.js'
import { renderPageScripts } from './renderPageScripts.js'
import { renderPageStyles } from './renderPageStyles.js'
import { resolvePageClientFilesMeta } from './resolvePageClientFilesMeta.js'
import type { FileMeta, ModuleFilesMetaMap } from './types.js'

interface PageRenderContext extends SSRContext, VuepressSSRContext {
  /**
   * Injected by vuepress-loader
   *
   * Store the module request of components that used by current page
   */
  _registeredComponents: Set<string>
}

/**
 * Render page to html file, return the html file path
 */
export const renderPage = async ({
  app,
  page,
  vueApp,
  vueRouter,
  renderToString,
  ssrTemplateRenderer,
  allFilesMeta,
  initialFilesMeta,
  asyncFilesMeta,
  moduleFilesMetaMap,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: Router
  renderToString: (input: VueApp, context: SSRContext) => Promise<string>
  ssrTemplateRenderer: SSRTemplateRenderer
  allFilesMeta: FileMeta[]
  initialFilesMeta: FileMeta[]
  asyncFilesMeta: FileMeta[]
  moduleFilesMetaMap: ModuleFilesMetaMap
}): Promise<void> => {
  // switch to current page route
  await vueRouter.push(page.path)
  await vueRouter.isReady()

  // create vue ssr context with default values
  delete vueApp._context.provides[ssrContextKey]
  const ssrContext: PageRenderContext = {
    _registeredComponents: new Set(),
    lang: 'en',
    head: [],
  }

  // render current page to string
  const pageRendered = await renderToString(vueApp, ssrContext)

  // resolve client files that used by this page
  const pageClientFilesMeta = resolvePageClientFilesMeta({
    moduleRequests: Array.from(ssrContext._registeredComponents),
    moduleFilesMetaMap,
  })

  // generate html string
  const html = ssrTemplateRenderer({
    app,
    lang: ssrContext.lang,
    head: ssrContext.head.map(renderHead).join(''),
    preload: renderPagePreloadLinks({
      app,
      initialFilesMeta,
      pageClientFilesMeta,
    }),
    prefetch: renderPagePrefetchLinks({
      app,
      asyncFilesMeta,
      pageClientFilesMeta,
    }),
    styles: renderPageStyles({ app, initialFilesMeta, pageClientFilesMeta }),
    pageContent: pageRendered,
    scripts: renderPageScripts({ app, initialFilesMeta, pageClientFilesMeta }),
  })

  // write html file
  await fs.outputFile(page.htmlFilePath, html)
}
