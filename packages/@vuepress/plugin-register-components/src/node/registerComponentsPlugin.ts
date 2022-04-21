import type { Plugin } from '@vuepress/core'
import { hash, path } from '@vuepress/utils'
import * as chokidar from 'chokidar'
import { prepareClientAppEnhanceFile } from './prepareClientAppEnhanceFile'

export interface RegisterComponentsPluginOptions {
  components?: Record<string, string>
  componentsDir?: string | null
  componentsPatterns?: string[]
  getComponentName?: (filename: string) => string
}

export const registerComponentsPlugin = ({
  components = {},
  componentsDir = null,
  componentsPatterns = ['**/*.vue'],
  getComponentName = (filename) =>
    path.trimExt(filename.replace(/\/|\\/g, '-')),
}: RegisterComponentsPluginOptions = {}): Plugin => {
  const options = {
    components,
    componentsDir,
    componentsPatterns,
    getComponentName,
  }

  // use options hash as the identifier of client app enhance file
  // to avoid conflicts when using this plugin multiple times
  const optionsHash = hash(options)

  return {
    name: '@vuepress/plugin-register-components',

    multiple: true,

    clientAppEnhanceFiles: (app) =>
      prepareClientAppEnhanceFile(app, options, optionsHash),

    onWatched: (app, watchers) => {
      if (componentsDir) {
        const componentsWatcher = chokidar.watch(componentsPatterns, {
          cwd: componentsDir,
          ignoreInitial: true,
        })
        componentsWatcher.on('add', () => {
          prepareClientAppEnhanceFile(app, options, optionsHash)
        })
        componentsWatcher.on('unlink', () => {
          prepareClientAppEnhanceFile(app, options, optionsHash)
        })
        watchers.push(componentsWatcher)
      }
    },
  }
}
