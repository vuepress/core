import type { App, Page } from '@vuepress/core'
import type { VuepressSSRContext } from '@vuepress/shared'
import { fs, renderHead } from '@vuepress/utils'
import type { App as VueApp } from 'vue'
import { ssrContextKey } from 'vue'
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
  ssrTemplate,
  initialFilesMeta,
  asyncFilesMeta,
  moduleFilesMetaMap,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: Router
  renderToString: (input: VueApp, context: SSRContext) => Promise<string>
  ssrTemplate: string
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
  const html = await app.options.templateBuildRenderer(ssrTemplate, {
    content: pageRendered,
    head: ssrContext.head.map(renderHead).join(''),
    lang: ssrContext.lang,
    prefetch: renderPagePrefetchLinks({
      app,
      asyncFilesMeta,
      pageClientFilesMeta,
    }),
    preload: renderPagePreloadLinks({
      app,
      initialFilesMeta,
      pageClientFilesMeta,
    }),
    scripts: renderPageScripts({ app, initialFilesMeta, pageClientFilesMeta }),
    styles: renderPageStyles({ app, initialFilesMeta, pageClientFilesMeta }),
    version: app.version,
  })

  // write html file
  await fs.outputFile(page.htmlFilePath, html)
}
