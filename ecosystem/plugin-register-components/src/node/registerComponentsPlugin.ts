import type { Plugin } from '@vuepress/core'
import { hash, path } from '@vuepress/utils'
import chokidar from 'chokidar'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'

/**
 * Options for @vuepress/plugin-register-components
 */
export interface RegisterComponentsPluginOptions {
  /**
   * An object that defines name of components and their corresponding file path
   */
  components?: Record<string, string>

  /**
   * Absolute path to the components directory
   */
  componentsDir?: string | null

  /**
   * Patterns to match component files using [globby](https://github.com/sindresorhus/globby)
   *
   * The patterns are relative to componentsDir`
   */
  componentsPatterns?: string[]

  /**
   * A function to get component name from the filename
   */
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

    clientConfigFile: (app) =>
      prepareClientConfigFile(app, options, optionsHash),

    onWatched: (app, watchers) => {
      if (componentsDir) {
        const componentsWatcher = chokidar.watch(componentsPatterns, {
          cwd: componentsDir,
          ignoreInitial: true,
        })
        componentsWatcher.on('add', () => {
          prepareClientConfigFile(app, options, optionsHash)
        })
        componentsWatcher.on('unlink', () => {
          prepareClientConfigFile(app, options, optionsHash)
        })
        watchers.push(componentsWatcher)
      }
    },
  }
}
