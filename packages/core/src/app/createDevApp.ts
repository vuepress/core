import type { AppConfig, DevApp } from '../types/index.js'
import { createBaseApp } from './createBaseApp.js'

/**
 * Create vuepress dev app
 */
export const createDevApp = (config: AppConfig): DevApp => {
  const app = createBaseApp(config, false) as DevApp
  app.dev = () => app.options.bundler.dev(app)
  return app
}
