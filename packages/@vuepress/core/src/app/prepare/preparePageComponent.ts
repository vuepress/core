import type { App, Page } from '../../types'

/**
 * Generate page component temp file of a single page
 */
export const preparePageComponent = async (
  app: App,
  page: Page
): Promise<void> => {
  let  contentRendered = `<template>${page.contentRendered}</template>\n`;
  if(page.contentRendered.indexOf("<template>") === 0 && page.contentRendered.indexOf("</template>") !== -1){
    contentRendered  = page.contentRendered
  }
  await app.writeTemp(
    page.componentFilePathRelative,
    [
      // take the rendered markdown content as <template>
      contentRendered,
      // hoist `<script>`, `<style>` and other custom blocks
      ...page.hoistedTags,
    ].join('\n')
  )
}
