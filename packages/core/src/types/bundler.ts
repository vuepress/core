import type { App } from './app/index.js'

/**
 * Vuepress bundler
 *
 * It provides abilities to:
 * - dev: run dev server for development
 * - build: bundle assets for deployment
 */
export interface Bundler {
  name: string
  dev: (app: App) => Promise<() => Promise<void>>
  build: (app: App) => Promise<void>
}
