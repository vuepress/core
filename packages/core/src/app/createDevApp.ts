import type { AppConfig, DevApp } from '../types/index.js'
import { createBaseApp } from './createBaseApp.js'

/**
 * Create vuepress dev app
 */
export const createDevApp = (config: AppConfig): DevApp => {
  const app = createBaseApp(config) as DevApp

  // set env flag and add dev method
  app.env.isDev = true
  app.dev = async () => app.options.bundler.dev(app)

  return app
}
