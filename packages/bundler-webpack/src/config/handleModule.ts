import type { App } from '@vuepress/core'
import type Config from 'webpack-chain'
import type { WebpackBundlerOptions } from '../types.js'
import { handleModuleAssets } from './handleModuleAssets.js'
import { handleModuleJs } from './handleModuleJs.js'
import { handleModulePug } from './handleModulePug.js'
import { handleModuleStyles } from './handleModuleStyles.js'
import { handleModuleTs } from './handleModuleTs.js'
import { handleModuleVue } from './handleModuleVue.js'

/**
 * Set webpack module
 */
export const handleModule = ({
  app,
  options,
  config,
  isBuild,
  isServer,
}: {
  app: App
  options: WebpackBundlerOptions
  config: Config
  isBuild: boolean
  isServer: boolean
}): void => {
  // noParse
  config.module.noParse(
    /(^(vue|vue-router|vuex|vuex-router-sync)$)|(^@vue\/[^/]*$)/
  )

  // vue files
  handleModuleVue({ app, options, config, isServer })

  // pug files, for templates
  handleModulePug({ config })

  // images & media & fonts
  handleModuleAssets({ app, config })

  // js files
  handleModuleJs({ options, config, isBuild, isServer })

  // ts files
  handleModuleTs({ app, config })

  // styles files
  handleModuleStyles({ options, config, isBuild, isServer })
}
