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
      `<template>${page.contentRendered}</template>\n`,
      // hoist `<script>`, `<style>` and other custom blocks
      ...page.hoistedTags,
    ].join('\n')
  )
}
