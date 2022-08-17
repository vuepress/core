import type { AppConfig, BuildApp } from '../types/index.js'
import { createBaseApp } from './createBaseApp.js'

/**
 * Create vuepress build app
 */
export const createBuildApp = (config: AppConfig): BuildApp => {
  const app = createBaseApp(config, true) as BuildApp
  app.build = () => app.options.bundler.build(app)
  return app
}
