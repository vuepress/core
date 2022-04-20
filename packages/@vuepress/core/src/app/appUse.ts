import { chalk, debug, warn } from '@vuepress/utils'
import type { App, Plugin } from '../types'
import { resolvePluginObject } from './resolvePluginObject'

const log = debug('vuepress:core/app')

export const appUse = (app: App, rawPlugin: Plugin): App => {
  const pluginObject = resolvePluginObject(app, rawPlugin)

  log(`use plugin ${chalk.magenta(pluginObject.name)}`)

  if (pluginObject.multiple !== true) {
    // remove duplicated plugin
    const duplicateIndex = app.pluginApi.plugins.findIndex(
      ({ name }) => name === pluginObject.name
    )
    if (duplicateIndex !== -1) {
      app.pluginApi.plugins.splice(duplicateIndex, 1)

      // show warning when duplicate plugins are detected
      warn(
        `plugin ${chalk.magenta(
          pluginObject.name
        )} has been used multiple times, only the last one will take effect`
      )
    }
  }

  // use plugin
  app.pluginApi.plugins.push(pluginObject)

  return app
}
