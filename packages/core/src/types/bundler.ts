import type { App } from './app/index.js'
import type { DeepPartial } from './helpers.js'

/**
 * Vuepress bundler
 *
 * It provides abilities to:
 * - dev: run dev server for development
 * - build: bundle assets for deployment
 */
export interface Bundler {
  /**
   * Name of the bundler
   */
  name: string

  /**
   * Type of the bundler, e.g. 'vite' or 'webpack'
   */
  type: string

  /**
   * Method to run vuepress app in dev mode, starting dev server
   */
  dev: (app: App) => Promise<() => Promise<void>>

  /**
   * Method to run vuepress app in build mode, generating static pages and assets
   */
  build: (app: App) => Promise<void>

  /**
   * Merge helper for current bundler.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergeConfig: <Config extends Record<string, any> = Record<string, any>>(
    currentConfig: Config,
    newConfig: DeepPartial<Config>,
  ) => Config
}

export type BundlerOptions = Record<string, unknown>
