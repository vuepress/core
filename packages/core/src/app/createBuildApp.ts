import type { AppConfig, BuildApp } from '../types/index.js'
import { createBaseApp } from './createBaseApp.js'
import { setupAppThemeAndPlugins } from './setupAppThemeAndPlugins.js'

/**
 * Create vuepress build app.
 */
export const createBuildApp = (config: AppConfig): BuildApp => {
  const app = createBaseApp(config) as BuildApp

  // set env flag and add build method
  app.env.isBuild = true
  app.build = async () => app.options.bundler.build(app)

  // setup theme and plugins
  setupAppThemeAndPlugins(app, config)

  return app
}
