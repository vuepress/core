import type { Markdown } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { Bundler } from '../bundler.js'
import type { Page } from '../page.js'
import type { Plugin } from '../plugin.js'
import type { PluginApi } from '../pluginApi/index.js'
import type { AppOptions } from './options.js'
import type { AppDir, AppEnv, AppWriteTemp } from './utils.js'

/**
 * App base properties, will be available after creation, even before initialization
 */
export interface AppPropertiesBase {
  /**
   * Directory utils.
   */
  dir: AppDir

  /**
   * Environment flags.
   */
  env: AppEnv

  /**
   * Options that filled all optional fields with a default value.
   */
  options: AppOptions

  /**
   * Plugin system.
   */
  pluginApi: PluginApi

  /**
   * Site data, which will be used in client side.
   */
  siteData: SiteData

  /**
   * Version of vuepress core.
   */
  version: string

  /**
   * Initialize app.
   *
   * - Theme and plugin will be loaded.
   * - Layouts and pages will be resolved.
   */
  init: () => Promise<void>

  /**
   * Prepare data for client and write temp files.
   *
   * Should be called after `app.init()`.
   */
  prepare: () => Promise<void>

  /**
   * Use a plugin.
   *
   * Should be called before `app.init()`.
   */
  use: (plugin: Plugin) => this

  /**
   * Util to write temp file
   */
  writeTemp: AppWriteTemp
}

/**
 * App initialized properties, will only be available after initialization
 */
export interface AppPropertiesInitialized {
  /**
   * Markdown-it instance.
   *
   * Only available after initialization
   */
  markdown: Markdown

  /**
   * Page objects.
   *
   * Only available after initialization
   */
  pages: Page[]
}

/**
 * Vuepress app instance
 */
export type App = AppPropertiesBase & AppPropertiesInitialized

/**
 * Vuepress dev app
 */
export interface DevApp extends App {
  /**
   * Start dev server
   *
   * Should be called after `app.prepare()`.
   */
  dev: () => ReturnType<Bundler['dev']>
}

/**
 * Vuepress build app
 */
export interface BuildApp extends App {
  /**
   * Build static files
   *
   * Should be called after `app.prepare()`.
   */
  build: () => ReturnType<Bundler['build']>
}
