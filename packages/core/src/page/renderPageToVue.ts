import { isString } from '@vuepress/shared'
import type { Page } from '../types/index.js'

const TEMPLATE_WRAPPER_TAG_OPEN = '<div>'
const TEMPLATE_WRAPPER_TAG_CLOSE = '</div>'

const SCRIPT_TAG_OPEN = '<script>'
const SCRIPT_TAG_CLOSE = '</script>'

const SCRIPT_TAG_OPEN_LANG_TS_REGEX = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const SCRIPT_TAG_OPEN_LANG_TS = '<script lang="ts">'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(_pageData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ _pageData }) => {
    __VUE_HMR_RUNTIME__.updatePageData(_pageData)
  })
}
`

/**
 * Util to resolve the open tag of script block
 */
const resolveScriptTagOpen = (sfcBlocks: Page['sfcBlocks']): string => {
  // use existing script open tag
  if (sfcBlocks.script?.tagOpen) {
    return sfcBlocks.script.tagOpen
  }
  // if the setup script block is using typescript, we should use the same language for script block
  const isUsingTs = sfcBlocks.scriptSetup?.tagOpen.match(
    SCRIPT_TAG_OPEN_LANG_TS_REGEX,
  )
  return isUsingTs ? SCRIPT_TAG_OPEN_LANG_TS : SCRIPT_TAG_OPEN
}

/**
 * Render page to vue component
 */
export const renderPageToVue = ({ data, sfcBlocks }: Page): string => {
  // #688: wrap the content of `<template>` with a `<div>` to avoid some potential issues of fragment component
  const templateContent =
    sfcBlocks.template &&
    [
      sfcBlocks.template.tagOpen,
      TEMPLATE_WRAPPER_TAG_OPEN,
      sfcBlocks.template.contentStripped,
      TEMPLATE_WRAPPER_TAG_CLOSE,
      sfcBlocks.template.tagClose,
    ].join('')

  // inject page data code and HMR code into the script content
  const pageDataCode = `export const _pageData = JSON.parse(${JSON.stringify(JSON.stringify(data))})`
  const scriptContent = [
    resolveScriptTagOpen(sfcBlocks),
    sfcBlocks.script?.contentStripped,
    pageDataCode,
    HMR_CODE,
    sfcBlocks.script?.tagClose ?? SCRIPT_TAG_CLOSE,
  ]
    .filter(isString)
    .join('\n')

  return [
    templateContent,
    scriptContent,
    sfcBlocks.scriptSetup?.content,
    ...sfcBlocks.styles.map((item) => item.content),
    ...sfcBlocks.customBlocks.map((item) => item.content),
  ]
    .filter(isString)
    .join('\n')
}
