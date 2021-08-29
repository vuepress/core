import type { App, ThemeInfo } from '../types'
import { resolvePluginsFromConfig } from './resolvePluginsFromConfig'
import { resolveTheme } from './resolveTheme'
import { resolveThemeLayouts } from './resolveThemeLayouts'

/**
 * Resolve theme info and its parent theme info
 */
export const resolveThemeInfo = (app: App, themeName: string): ThemeInfo => {
  // resolve current theme info
  const theme = resolveTheme(app, themeName)
  const themeInfo = {
    layouts: resolveThemeLayouts(theme.layouts),
    plugins: [theme, ...resolvePluginsFromConfig(app, theme.plugins)],
  }

  // return if current theme does not have a parent theme
  if (!theme.extends) {
    return themeInfo
  }

  // resolve parent theme info recursively
  const parentThemeInfo = resolveThemeInfo(app, theme.extends)
  return {
    layouts: { ...parentThemeInfo.layouts, ...themeInfo.layouts },
    plugins: [...parentThemeInfo.plugins, ...themeInfo.plugins],
  }
}
