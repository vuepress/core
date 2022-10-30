import { colors, debug, warn } from '@vuepress/utils'
import type { App, Plugin } from '../types/index.js'
import { resolvePluginObject } from './resolvePluginObject.js'

const log = debug('vuepress:core/app')

export const appUse = (app: App, rawPlugin: Plugin): App => {
  const pluginObject = resolvePluginObject(app, rawPlugin)

  // ignore anonymous plugins or theme
  if (!pluginObject.name) {
    warn(`an anonymous plugin or theme was detected and ignored`)
    return app
  }

  log(`use plugin ${colors.magenta(pluginObject.name)}`)

  // handle duplicated plugins
  if (pluginObject.multiple !== true) {
    const duplicateIndex = app.pluginApi.plugins.findIndex(
      ({ name }) => name === pluginObject.name
    )
    if (duplicateIndex !== -1) {
      // remove the previous duplicated plugin
      app.pluginApi.plugins.splice(duplicateIndex, 1)
      warn(
        `plugin ${colors.magenta(
          pluginObject.name
        )} has been used multiple times, only the last one will take effect`
      )
    }
  }

  // use plugin
  app.pluginApi.plugins.push(pluginObject)

  return app
}
