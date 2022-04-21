import type { App, Page } from '@vuepress/core'
import type { VuepressSSRContext } from '@vuepress/shared'
import { fs, renderHead } from '@vuepress/utils'
import type { App as VueApp } from 'vue'
import type { Router as VueRouter } from 'vue-router'
import type { SSRContext } from 'vue/server-renderer'
import { renderPagePrefetchLinks } from './renderPagePrefetchLinks'
import { renderPagePreloadLinks } from './renderPagePreloadLinks'
import { renderPageScripts } from './renderPageScripts'
import { renderPageStyles } from './renderPageStyles'
import { resolvePageClientFilesMeta } from './resolvePageClientFilesMeta'
import type { FileMeta, ModuleFilesMetaMap } from './types'

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
  ssrTemplate,
  allFilesMeta,
  initialFilesMeta,
  asyncFilesMeta,
  moduleFilesMetaMap,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: VueRouter
  ssrTemplate: string
  allFilesMeta: FileMeta[]
  initialFilesMeta: FileMeta[]
  asyncFilesMeta: FileMeta[]
  moduleFilesMetaMap: ModuleFilesMetaMap
}): Promise<void> => {
  // switch to current page route
  await vueRouter.push(page.path)
  await vueRouter.isReady()

  // create vue ssr context with default values
  const ssrContext: PageRenderContext = {
    _registeredComponents: new Set(),
    lang: 'en',
    head: [],
  }

  // render current page to string
  const pageRendered = await require('vue/server-renderer').renderToString(
    vueApp,
    ssrContext
  )

  // resolve client files that used by this page
  const pageClientFilesMeta = resolvePageClientFilesMeta({
    moduleRequests: Array.from(ssrContext._registeredComponents),
    moduleFilesMetaMap,
  })

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
        initialFilesMeta,
        pageClientFilesMeta,
      })}${renderPagePrefetchLinks({
        app,
        asyncFilesMeta,
        pageClientFilesMeta,
      })}`
    )
    // page styles
    .replace(
      '<!--vuepress-ssr-styles-->',
      renderPageStyles({ app, initialFilesMeta, pageClientFilesMeta })
    )
    // page content
    // notice that some special chars in string like `$&` would be recognized by `replace()`,
    // and they won't be html-escaped and will be kept as is when they are inside a code block,
    // so we use a replace function as the second param to avoid those potential issues
    .replace('<!--vuepress-ssr-app-->', () => pageRendered)
    // page scripts
    .replace(
      '<!--vuepress-ssr-scripts-->',
      renderPageScripts({ app, initialFilesMeta, pageClientFilesMeta })
    )

  // write html file
  await fs.outputFile(page.htmlFilePath, html)
}
