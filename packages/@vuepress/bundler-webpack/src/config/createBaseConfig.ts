import type { App } from '@vuepress/core'
import * as Config from 'webpack-chain'
import type { WebpackBundlerOptions } from '../types'
import { handleDevtool } from './handleDevtool'
import { handleEntry } from './handleEntry'
import { handleMode } from './handleMode'
import { handleModule } from './handleModule'
import { handleNode } from './handleNode'
import { handleOtherOptions } from './handleOtherOptions'
import { handlePluginDefine } from './handlePluginDefine'
import { handleResolve } from './handleResolve'

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
  handleMode({ app, config })

  /**
   * node
   */
  handleNode({ config })

  /**
   * devtool
   */
  handleDevtool({ app, config })

  /**
   * resolve
   */
  await handleResolve({ app, config })

  /**
   * module
   */
  handleModule({ app, options, config, isBuild, isServer })

  /**
   * plugins
   */
  await handlePluginDefine({ app, config, isServer })

  /**
   * other options
   */
  handleOtherOptions({ app, config, isBuild, isServer })

  return config
}
