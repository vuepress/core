import { normalizePackageName } from '@vuepress/shared'
import { chalk, logger, path, requireResolve } from '@vuepress/utils'
import type { App, ThemeConfig, ThemeObject } from '../types'
import { resolvePluginObject } from './resolvePluginObject'

/**
 * Resolve a theme object according to the theme name
 */
export const resolveThemeObject = (
  app: App,
  theme: string,
  themeConfig: ThemeConfig
): ThemeObject => {
  // resolve theme entry according to theme name
  const themeEntry = requireResolve(
    path.isAbsolute(theme)
      ? theme
      : normalizePackageName(theme, 'vuepress', 'theme')
  )

  if (themeEntry === null) {
    throw logger.createError(`theme is not found: ${chalk.magenta(theme)}`)
  }

  // resolve theme object from theme entry
  const themeObject = resolvePluginObject<ThemeConfig, ThemeObject>(
    app,
    themeEntry,
    themeConfig
  )

  return themeObject
}
