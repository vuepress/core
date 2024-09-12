import type { PageSSRContext } from '@vuepress/bundlerutils'
import { renderPageToString } from '@vuepress/bundlerutils'
import type { App, Page } from '@vuepress/core'
import { fs, renderHead } from '@vuepress/utils'
import type { App as VueApp } from 'vue'
import type { Router } from 'vue-router'
import { renderPagePrefetchLinks } from './renderPagePrefetchLinks.js'
import { renderPagePreloadLinks } from './renderPagePreloadLinks.js'
import { renderPageScripts } from './renderPageScripts.js'
import { renderPageStyles } from './renderPageStyles.js'
import { resolvePageClientFilesMeta } from './resolvePageClientFilesMeta.js'
import type { FileMeta, ModuleFilesMetaMap } from './types.js'

interface WebpackPageSSRContext extends PageSSRContext {
  /**
   * Injected by vuepress-ssr-loader
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
  ssrTemplate,
  initialFilesMeta,
  asyncFilesMeta,
  moduleFilesMetaMap,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: Router
  ssrTemplate: string
  initialFilesMeta: FileMeta[]
  asyncFilesMeta: FileMeta[]
  moduleFilesMetaMap: ModuleFilesMetaMap
}): Promise<void> => {
  // render current page to string
  const { ssrContext, ssrString } =
    await renderPageToString<WebpackPageSSRContext>({
      page,
      vueApp,
      vueRouter,
      ssrContextInit: { _registeredComponents: new Set() },
    })

  // resolve client files that used by this page
  const pageClientFilesMeta = resolvePageClientFilesMeta({
    moduleRequests: Array.from(ssrContext._registeredComponents),
    moduleFilesMetaMap,
  })

  // generate html string
  const html = await app.options.templateBuildRenderer(ssrTemplate, {
    content: ssrString,
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
