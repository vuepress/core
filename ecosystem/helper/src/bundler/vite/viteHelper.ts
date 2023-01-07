import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { App } from '@vuepress/core'
import { isString } from '@vuepress/shared'
import { detectPackageManager } from '../../utils/index.js'
import { getBundlerName } from '../getBundler.js'
import { mergeViteConfig } from './mergeViteConfig.js'

export interface ViteCommonOptions {
  /**
   * VuePress Node App
   */
  app: App
  /**
   * VuePress Bundler config
   */
  config: unknown
}

/**
 * Add modules to Vite `optimizeDeps.include` list
 */
export const addViteOptimizeDepsInclude = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  if (
    getBundlerName(app) === 'vite' &&
    ('OPTIMIZE_DEPS' in process.env
      ? Boolean(process.env.OPTIMIZE_DEPS)
      : detectPackageManager() !== 'pnpm')
  ) {
    const bundlerConfig = <ViteBundlerOptions>config

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        optimizeDeps: {
          include: isString(module) ? [module] : module,
        },
      }
    )

    bundlerConfig.viteOptions.optimizeDeps!.include = Array.from(
      new Set(bundlerConfig.viteOptions.optimizeDeps!.include)
    )
  }
}

/**
 * Add modules to Vite `optimizeDeps.exclude` list
 */
export const addViteOptimizeDepsExclude = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  if (getBundlerName(app) === 'vite') {
    const bundlerConfig = <ViteBundlerOptions>config

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        optimizeDeps: {
          exclude: isString(module) ? [module] : module,
        },
      }
    )

    bundlerConfig.viteOptions.optimizeDeps!.exclude = Array.from(
      new Set(bundlerConfig.viteOptions.optimizeDeps!.exclude)
    )
  }
}

/**
 * Add modules to Vite `ssr.external` list
 */
export const addViteSsrExternal = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  if (getBundlerName(app) === 'vite') {
    const bundlerConfig = <ViteBundlerOptions>config

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        ssr: {
          external: isString(module) ? [module] : module,
        },
      }
    )
  }
}

/**
 * Add modules to Vite `ssr.noExternal` list
 */
export const addViteSsrNoExternal = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  if (getBundlerName(app) === 'vite') {
    const bundlerConfig = <ViteBundlerOptions>config

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        ssr: {
          noExternal: isString(module) ? [module] : module,
        },
      }
    )
  }
}
