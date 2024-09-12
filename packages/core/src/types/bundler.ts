import type { App } from './app/index.js'

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
   * Method to run vuepress app in dev mode, starting dev server
   */
  dev: (app: App) => Promise<() => Promise<void>>

  /**
   * Method to run vuepress app in build mode, generating static pages and assets
   */
  build: (app: App) => Promise<void>
}

export type BundlerOptions = Record<string, unknown>
