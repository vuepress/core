import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { App } from '@vuepress/core'
import { isString } from '@vuepress/shared'
import { detectPackageManager } from '../../utils/index.js'
import { getBundlerName } from '../getBundler.js'
import { mergeViteConfig } from './mergeViteConfig.js'

/**
 * Add modules to Vite `optimizeDeps.include` list
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 */
export const addViteOptimizeDepsInclude = (
  bundlerOptions: unknown,
  app: App,
  module: string | string[]
): void => {
  if (
    getBundlerName(app) === 'vite' &&
    ('OPTIMIZE_DEPS' in process.env
      ? Boolean(process.env.OPTIMIZE_DEPS)
      : detectPackageManager() !== 'pnpm')
  ) {
    const viteBundlerOptions = <ViteBundlerOptions>bundlerOptions

    viteBundlerOptions.viteOptions = mergeViteConfig(
      viteBundlerOptions.viteOptions || {},
      {
        optimizeDeps: {
          include: isString(module) ? [module] : module,
        },
      }
    )

    viteBundlerOptions.viteOptions.optimizeDeps!.include = Array.from(
      new Set(viteBundlerOptions.viteOptions.optimizeDeps!.include)
    )
  }
}

/**
 * Add modules to Vite `optimizeDeps.exclude` list
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 */
export const addViteOptimizeDepsExclude = (
  bundlerOptions: unknown,
  app: App,
  module: string | string[]
): void => {
  if (getBundlerName(app) === 'vite') {
    const viteBundlerOptions = <ViteBundlerOptions>bundlerOptions

    viteBundlerOptions.viteOptions = mergeViteConfig(
      viteBundlerOptions.viteOptions || {},
      {
        optimizeDeps: {
          exclude: isString(module) ? [module] : module,
        },
      }
    )

    viteBundlerOptions.viteOptions.optimizeDeps!.exclude = Array.from(
      new Set(viteBundlerOptions.viteOptions.optimizeDeps!.exclude)
    )
  }
}

/**
 * Add modules to Vite `ssr.external` list
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 */
export const addViteSsrExternal = (
  bundlerOptions: unknown,
  app: App,
  module: string | string[]
): void => {
  if (getBundlerName(app) === 'vite') {
    const viteBundlerOptions = <ViteBundlerOptions>bundlerOptions

    viteBundlerOptions.viteOptions = mergeViteConfig(
      viteBundlerOptions.viteOptions || {},
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
  bundlerOptions: unknown,
  app: App,
  module: string | string[]
): void => {
  if (getBundlerName(app) === 'vite') {
    const viteBundlerOptions = <ViteBundlerOptions>bundlerOptions

    viteBundlerOptions.viteOptions = mergeViteConfig(
      viteBundlerOptions.viteOptions || {},
      {
        ssr: {
          noExternal: isString(module) ? [module] : module,
        },
      }
    )
  }
}

export const addViteConfig = (
  bundlerOptions: unknown,
  app: App,
  config: Record<string, any>
): void => {
  if (getBundlerName(app) === 'vite') {
    const viteBundlerOptions = <ViteBundlerOptions>bundlerOptions

    viteBundlerOptions.viteOptions = mergeViteConfig(
      viteBundlerOptions.viteOptions || {},
      config
    )
  }
}
