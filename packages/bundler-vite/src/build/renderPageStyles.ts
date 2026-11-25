import type { App } from '@vuepress/core'
import type { OutputAsset } from 'rolldown'

/**
 * Render styles of current page
 */
export const renderPageStyles = ({
  app,
  outputCssAssets,
}: {
  app: App
  outputCssAssets: OutputAsset[]
}): string =>
  // dedupe by file name to avoid duplicated links, keeping the output order
  [...new Set(outputCssAssets.map(({ fileName }) => fileName))]
    .flatMap((fileName) => [
      `<link rel="preload" href="${app.options.base}${fileName}" as="style">`,
      `<link rel="stylesheet" href="${app.options.base}${fileName}">`,
    ])
    .join('')
