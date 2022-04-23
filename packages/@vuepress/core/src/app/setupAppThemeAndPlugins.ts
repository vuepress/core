import type { App, AppConfig } from '../types'
import { resolveThemeInfo } from './resolveThemeInfo'

/**
 * Setup theme and plugins for vuepress app
 */
export const setupAppThemeAndPlugins = (app: App, config: AppConfig): void => {
  // recursively resolve theme info
  const themeInfo = resolveThemeInfo(app, app.options.theme)
  // set up app layouts and templates
  app.layouts = themeInfo.layouts
  app.options.templateDev =
    config.templateDev ?? themeInfo.templateDev ?? app.options.templateDev
  app.options.templateBuild =
    config.templateBuild ?? themeInfo.templateBuild ?? app.options.templateBuild
  // use options plugins after theme plugins, allowing user to override theme plugins
  ;[...themeInfo.plugins, ...app.options.plugins]
    .flat()
    .forEach((plugin) => app.use(plugin))
}
