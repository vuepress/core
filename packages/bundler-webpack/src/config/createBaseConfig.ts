import type { App } from '@vuepress/core'
import Config from 'webpack-chain'
import type { WebpackBundlerOptions } from '../types.js'
import { handleDevtool } from './handleDevtool.js'
import { handleEntry } from './handleEntry.js'
import { handleMode } from './handleMode.js'
import { handleModule } from './handleModule.js'
import { handleNode } from './handleNode.js'
import { handleOtherOptions } from './handleOtherOptions.js'
import { handlePluginDefine } from './handlePluginDefine.js'
import { handleResolve } from './handleResolve.js'

export const createBaseConfig = async ({
  app,
  options,
  isBuild,
  isServer,
}: {
  app: App
  options: WebpackBundlerOptions
  isBuild: boolean
  isServer: boolean
}): Promise<Config> => {
  // create new webpack-chain config
  const config = new Config()

  /**
   * entry
   */
  handleEntry({ app, config })

  /**
   * mode
   */
  handleMode({ app, config, isBuild })

  /**
   * node
   */
  handleNode({ config })

  /**
   * devtool
   */
  handleDevtool({ app, config, isBuild })

  /**
   * resolve
   */
  await handleResolve({ app, config, isServer })

  /**
   * module
   */
  handleModule({ app, options, config, isBuild, isServer })

  /**
   * plugins
   */
  await handlePluginDefine({ app, config, isBuild, isServer })

  /**
   * other options
   */
  handleOtherOptions({ app, config, isBuild, isServer })

  return config
}
