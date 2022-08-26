import type { Markdown } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { Bundler } from '../bundler.js'
import type { Page } from '../page.js'
import type { Plugin } from '../plugin.js'
import type { PluginApi } from '../pluginApi/index.js'
import type { AppOptions } from './options.js'
import type { AppDir, AppEnv, AppWriteTemp } from './utils.js'

/**
 * Vuepress app
 */
export interface App {
  /**
   * Directory utils
   */
  dir: AppDir

  /**
   * Environment flags
   */
  env: AppEnv

  /**
   * Options that filled all optional fields with a default value
   */
  options: AppOptions

  /**
   * Plugin system
   */
  pluginApi: PluginApi

  /**
   * Site data, which will be used in client side
   */
  siteData: SiteData

  /**
   * Version of vuepress core
   */
  version: string

  /**
   * Write temp file
   */
  writeTemp: AppWriteTemp

  /**
   * Use a plugin
   */
  use: (plugin: Plugin) => this

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
