import type { Page } from '@vuepress/core'
import type { VuepressSSRContext } from '@vuepress/shared'
import type { App as VueApp } from 'vue'
import { ssrContextKey } from 'vue'
import type { SSRContext } from 'vue/server-renderer'
import type { Router } from 'vue-router'

export type PageSSRContext = SSRContext & VuepressSSRContext

/**
 * Render a vuepress page to string
 */
export const renderPageToString = async <
  T extends PageSSRContext = PageSSRContext,
>({
  page,
  vueApp,
  vueRouter,
  ssrContextInit,
}: {
  page: Page
  vueApp: VueApp
  vueRouter: Router
  ssrContextInit?: Partial<T>
}): Promise<{
  ssrContext: T
  ssrString: string
}> => {
  // switch to current page route
  await vueRouter.push(page.path)
  await vueRouter.isReady()

  // create vue ssr context with default values
  delete vueApp._context.provides[ssrContextKey]
  const ssrContext = {
    lang: 'en',
    head: [],
    ...ssrContextInit,
  } satisfies PageSSRContext as T

  // lazy load renderToString function
  const { renderToString } = await import('vue/server-renderer')

  // render current page to string
  const ssrString = await renderToString(vueApp, ssrContext)

  return {
    ssrContext,
    ssrString,
  }
}
