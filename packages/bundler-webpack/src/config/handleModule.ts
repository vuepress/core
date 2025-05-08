import type { Config } from 'webpack-v5-chain'
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
  options,
  config,
  isBuild,
  isServer,
}: {
  options: WebpackBundlerOptions
  config: Config
  isBuild: boolean
  isServer: boolean
}): void => {
  // noParse
  config.module.noParse(
    /(^(vue|vue-router|vuex|vuex-router-sync)$)|(^@vue\/[^/]*$)/,
  )

  // vue files
  handleModuleVue({ options, config, isServer })

  // pug files, for templates
  handleModulePug({ config })

  // images & media & fonts
  handleModuleAssets({ config })

  // js files
  handleModuleJs({ options, config, isBuild, isServer })

  // ts files
  handleModuleTs({ config })

  // styles files
  handleModuleStyles({ options, config, isBuild, isServer })
}
