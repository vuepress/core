import { debug } from '@vuepress/utils'
import type { App } from '../types/index.js'
import { resolveAppMarkdown } from './resolveAppMarkdown.js'
import { resolveAppPages } from './resolveAppPages.js'

const log = debug('vuepress:core/app')

/**
 * Initialize a vuepress app
 *
 * Plugins should be used before initialization.
 *
 * @internal
 */
export const appInit = async (app: App): Promise<void> => {
  log('init start')

  // register all hooks of plugins that have been used
  // plugins should be used before `registerHooks()`
  // hooks in plugins will take effect after `registerHooks()`
  app.pluginApi.registerHooks()

  // create markdown
  app.markdown = await resolveAppMarkdown(app)

  // create pages
  const { pages, pagesMap } = await resolveAppPages(app)
  app.pages = pages
  app.pagesMap = pagesMap

  // plugin hook: onInitialized
  await app.pluginApi.hooks.onInitialized.process(app)

  log('init finish')
}
