import type { AppConfig, DevApp } from '../types'
import { createBaseApp } from './createBaseApp'

/**
 * Create vuepress dev app
 */
export const createDevApp = (config: AppConfig): DevApp => {
  const app = createBaseApp(config, false) as DevApp
  app.dev = () => app.options.bundler.dev(app)
  return app
}
