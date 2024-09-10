import type { MarkdownSfcBlocks } from '@vuepress/markdown'

/**
 * Render page sfc blocks to vue component
 */
export const renderPageSfcBlocksToVue = (
  sfcBlocks: MarkdownSfcBlocks,
): string =>
  [
    // #688: wrap the content of `<template>` with a `<div>` to avoid some potential issues of fragment component
    `${sfcBlocks.template?.tagOpen}<div>${sfcBlocks.template?.contentStripped}</div>${sfcBlocks.template?.tagClose}\n`,
    // hoist `<script>`, `<style>` and other custom blocks
    sfcBlocks.script?.content,
    sfcBlocks.scriptSetup?.content,
    ...sfcBlocks.styles.map((item) => item.content),
    ...sfcBlocks.customBlocks.map((item) => item.content),
  ].join('\n')
