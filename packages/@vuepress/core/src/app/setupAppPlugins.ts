import type { App } from '../types'
import { resolvePluginsFromConfig } from './resolvePluginsFromConfig'

/**
 * Setup plugins for vuepress app
 */
export const setupAppPlugins = (app: App): void => {
  // resolve plugins from options
  const plugins = resolvePluginsFromConfig(app, app.options.plugins)
  // use plugins
  plugins.forEach((plugin) => app.use(plugin))
}
