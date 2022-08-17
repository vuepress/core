import type { App } from '@vuepress/core'
import type { OutputChunk } from 'rollup'

/**
 * Render scripts of current page
 */
export const renderPageScripts = ({
  app,
  outputEntryChunk,
}: {
  app: App
  outputEntryChunk: OutputChunk
}): string =>
  `<script type="module" src="${app.options.base}${outputEntryChunk.fileName}" defer></script>`
