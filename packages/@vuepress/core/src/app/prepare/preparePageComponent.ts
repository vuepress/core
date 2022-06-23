import type { App, Page } from '../../types'

/**
 * Generate page component temp file of a single page
 */
export const preparePageComponent = async (
  app: App,
  page: Page
): Promise<void> => {
  await app.writeTemp(
    page.componentFilePathRelative,
    [
      // take the rendered markdown content as <template>
      // #688: wrap the content with a <div> to avoid some potential issues of fragment component
      `<template><div>${page.contentRendered}</div></template>\n`,
      // hoist `<script>`, `<style>` and other custom blocks
      ...page.sfcBlocks,
    ].join('\n')
  )
}
