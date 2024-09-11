import { isString } from '@vuepress/shared'
import type { App, Page } from '../types/index.js'

const TEMPLATE_WRAPPER_TAG_OPEN = '<div>'
const TEMPLATE_WRAPPER_TAG_CLOSE = '</div>'

const SCRIPT_TAG_OPEN = '<script>'
const SCRIPT_TAG_CLOSE = '</script>'

const SCRIPT_TAG_OPEN_LANG_TS_REGEX = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const SCRIPT_TAG_OPEN_LANG_TS = '<script lang="ts">'

const PAGE_DATA_CODE_VAR_NAME = '_pageData'
const PAGE_DATA_CODE_TEMPLATE_OUTLET = '__PAGE_DATA__'
const PAGE_DATA_CODE_TEMPLATE = `export const ${PAGE_DATA_CODE_VAR_NAME} = JSON.parse(${PAGE_DATA_CODE_TEMPLATE_OUTLET})`

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updatePageData?.(${PAGE_DATA_CODE_VAR_NAME})
}

if (import.meta.hot) {
  import.meta.hot.accept((m) => {
    __VUE_HMR_RUNTIME__.updatePageData?.(m.${PAGE_DATA_CODE_VAR_NAME})
  })
}
`

/**
 * Util to resolve the page data code
 */
const resolvePageDataCode = (data: Page['data']): string =>
  PAGE_DATA_CODE_TEMPLATE.replace(
    PAGE_DATA_CODE_TEMPLATE_OUTLET,
    JSON.stringify(JSON.stringify(data)),
  )

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
export const renderPageToVue = (
  app: App,
  { data, sfcBlocks }: Page,
): string => {
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
  const scriptTagOpen = resolveScriptTagOpen(sfcBlocks)
  const pageDataCode = resolvePageDataCode(data)
  const scriptContent = [
    scriptTagOpen,
    sfcBlocks.script?.contentStripped,
    pageDataCode,
    app.env.isDev && HMR_CODE,
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
