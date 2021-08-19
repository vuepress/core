import type { App } from '@vuepress/core'
import type { OutputAsset } from 'rollup'

/**
 * Render styles of current page
 */
export const renderPageStyles = ({
  app,
  outputCssAsset,
}: {
  app: App
  outputCssAsset: OutputAsset
}): string =>
  `<link rel="stylesheet" href="${app.options.base}${outputCssAsset.fileName}">`
