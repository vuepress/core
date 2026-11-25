import { resolvePostcssPlugins } from '@vuepress/bundlerutils'
import type { App } from '@vuepress/core'
import { RspackChain } from 'rspack-chain'

import type { RspackBundlerOptions } from '../types.js'
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
  options: RspackBundlerOptions
  isBuild: boolean
  isServer: boolean
}): Promise<RspackChain> => {
  // create new rspack-chain config
  const config = new RspackChain()

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
   * postcss plugins
   *
   * resolve from the site source directory, so that vite, webpack and rspack
   * share the same PostCSS config resolution semantics
   */
  const postcssPlugins = await resolvePostcssPlugins(app)

  /**
   * module
   */
  handleModule({ app, options, config, isBuild, isServer, postcssPlugins })

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
