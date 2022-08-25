import type { App, AppConfig } from '../types/index.js'
import { resolveThemeInfo } from './resolveThemeInfo.js'

/**
 * Setup theme and plugins for vuepress app
 */
export const setupAppThemeAndPlugins = (app: App, config: AppConfig): void => {
  // recursively resolve theme info
  const themeInfo = resolveThemeInfo(app, app.options.theme)
  // set up app templates
  app.options.templateDev =
    config.templateDev ?? themeInfo.templateDev ?? app.options.templateDev
  app.options.templateBuild =
    config.templateBuild ?? themeInfo.templateBuild ?? app.options.templateBuild
  // use options plugins after theme plugins, allowing user to override theme plugins
  ;[...themeInfo.plugins, ...app.options.plugins]
    .flat()
    .forEach((plugin) => app.use(plugin))
}
