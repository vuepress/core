import type { App, Theme, ThemeInfo } from '../types/index.js'
import { resolvePluginObject } from './resolvePluginObject.js'
import { resolveThemeLayouts } from './resolveThemeLayouts.js'

/**
 * Resolve theme info and its parent theme info
 */
export const resolveThemeInfo = (app: App, theme: Theme): ThemeInfo => {
  // resolve current theme info
  const themeObject = resolvePluginObject(app, theme)
  const themeInfo: ThemeInfo = {
    layouts: resolveThemeLayouts(themeObject.layouts),
    plugins: [...(themeObject.plugins ?? []), themeObject],
    templateBuild: themeObject.templateBuild,
    templateDev: themeObject.templateDev,
  }

  // return if current theme does not have a parent theme
  if (!themeObject.extends) {
    return themeInfo
  }

  // resolve parent theme info recursively
  const parentThemeInfo = resolveThemeInfo(app, themeObject.extends)
  return {
    layouts: { ...parentThemeInfo.layouts, ...themeInfo.layouts },
    plugins: [...parentThemeInfo.plugins, ...themeInfo.plugins],
    templateBuild: themeObject.templateBuild ?? parentThemeInfo.templateBuild,
    templateDev: themeObject.templateDev ?? parentThemeInfo.templateDev,
  }
}
