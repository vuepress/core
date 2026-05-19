import type { App } from '@vuepress/core'

/**
 * Get short bundler name
 *
 * @example
 *   // With @vuepress/bundler-vite
 *   getBundlerName(app) // 'vite'
 *   // With @vuepress/bundler-webpack
 *   getBundlerName(app) // 'webpack'
 *
 * @param app - VuePress Node App
 * @returns Short bundler name
 */
export const getBundlerName = (app: App): string => {
  const { name } = app.options.bundler

  return /^@vuepress\/bundler-(.*)$/u.exec(name)?.[1] ?? name
}
