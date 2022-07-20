import type { App, Page } from '../../types/index.js'

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
      // #688: wrap the content of `<template>` with a `<div>` to avoid some potential issues of fragment component
      `${page.sfcBlocks.template?.tagOpen}<div>${page.sfcBlocks.template?.contentStripped}</div>${page.sfcBlocks.template?.tagClose}\n`,
      // hoist `<script>`, `<style>` and other custom blocks
      page.sfcBlocks.script?.content,
      page.sfcBlocks.scriptSetup?.content,
      ...page.sfcBlocks.styles.map((item) => item.content),
      ...page.sfcBlocks.customBlocks.map((item) => item.content),
    ].join('\n')
  )
}
