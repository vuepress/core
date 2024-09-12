import type { App, Theme, ThemeInfo } from '../types/index.js'
import { resolvePluginObject } from './resolvePluginObject.js'

/**
 * Resolve theme info and its parent theme info
 *
 * @internal
 */
export const resolveThemeInfo = (app: App, theme: Theme): ThemeInfo => {
  // resolve current theme info
  const themeObject = resolvePluginObject(app, theme)
  const themeInfo: ThemeInfo = {
    plugins: [...(themeObject.plugins ?? []), themeObject],
    templateBuild: themeObject.templateBuild,
    templateBuildRenderer: themeObject.templateBuildRenderer,
    templateDev: themeObject.templateDev,
  }

  // return if current theme does not have a parent theme
  if (!themeObject.extends) {
    return themeInfo
  }

  // resolve parent theme info recursively
  const parentThemeInfo = resolveThemeInfo(app, themeObject.extends)
  return {
    plugins: [...parentThemeInfo.plugins, ...themeInfo.plugins],
    templateBuild: themeObject.templateBuild ?? parentThemeInfo.templateBuild,
    templateBuildRenderer:
      themeObject.templateBuildRenderer ??
      parentThemeInfo.templateBuildRenderer,
    templateDev: themeObject.templateDev ?? parentThemeInfo.templateDev,
  }
}
