import type { App, AppConfig } from '../types'
import { resolveThemeInfo } from './resolveThemeInfo'

/**
 * Setup theme for vuepress app
 */
export const setupAppTheme = (app: App, config: AppConfig): void => {
  // recursively resolve theme info
  const themeInfo = resolveThemeInfo(
    app,
    app.options.theme,
    app.options.themeConfig
  )
  // set up app layouts and templates
  app.layouts = themeInfo.layouts
  app.options.templateDev =
    config.templateDev ?? themeInfo.templateDev ?? app.options.templateDev
  app.options.templateBuild =
    config.templateBuild ?? themeInfo.templateBuild ?? app.options.templateBuild
  // use theme plugins
  themeInfo.plugins.forEach((plugin) => app.use(plugin))
}
