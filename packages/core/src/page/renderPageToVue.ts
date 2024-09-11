import { isString } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import type { App, Page } from '../types/index.js'

const TEMPLATE_WRAPPER_TAG_OPEN = '<div>'
const TEMPLATE_WRAPPER_TAG_CLOSE = '</div>'

const SCRIPT_TAG_OPEN = '<script>'
const SCRIPT_TAG_CLOSE = '</script>'

const SCRIPT_TAG_OPEN_LANG_TS_REGEX = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const SCRIPT_TAG_OPEN_LANG_TS = '<script lang="ts">'

const SCRIPT_DEFAULT_EXPORT_REGEX = /((?:^|\n|;)\s*)export(\s*)default/
const SCRIPT_DEFAULT_NAMED_EXPORT_REGEX =
  /((?:^|\n|;)\s*)export(.+)as(\s*)default/

const SCRIPT_DEFAULT_EXPORT_CODE_TEMPLATE_OUTLET = '__SCRIPT_DEFAULT_EXPORT__'
const SCRIPT_DEFAULT_EXPORT_CODE_TEMPLATE = `export default { name: ${SCRIPT_DEFAULT_EXPORT_CODE_TEMPLATE_OUTLET} }`

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
 * Util to resolve the open tag of script block
 */
const resolveScriptTagOpen = (page: Page): string => {
  // use existing script open tag
  if (page.sfcBlocks.script?.tagOpen) {
    return page.sfcBlocks.script.tagOpen
  }
  // if the setup script block is using typescript, we should use the same language for script block
  const isUsingTs = page.sfcBlocks.scriptSetup?.tagOpen.match(
    SCRIPT_TAG_OPEN_LANG_TS_REGEX,
  )
  return isUsingTs ? SCRIPT_TAG_OPEN_LANG_TS : SCRIPT_TAG_OPEN
}

/**
 * Util to resolve the default export code
 */
const resolveDefaultExportCode = (page: Page): string =>
  SCRIPT_DEFAULT_EXPORT_CODE_TEMPLATE.replace(
    SCRIPT_DEFAULT_EXPORT_CODE_TEMPLATE_OUTLET,
    JSON.stringify(path.basename(page.chunkFilePath)),
  )

/**
 * Util to resolve the page data code
 */
const resolvePageDataCode = (page: Page): string =>
  PAGE_DATA_CODE_TEMPLATE.replace(
    PAGE_DATA_CODE_TEMPLATE_OUTLET,
    JSON.stringify(JSON.stringify(page.data)),
  )

/**
 * Resolve the stripped content of script block
 */
const resolveScriptContentStripped = (app: App, page: Page): string => {
  const rawContentStripped = page.sfcBlocks.script?.contentStripped
  const hasDefaultExport = rawContentStripped
    ? SCRIPT_DEFAULT_EXPORT_REGEX.test(rawContentStripped) ||
      SCRIPT_DEFAULT_NAMED_EXPORT_REGEX.test(rawContentStripped)
    : false
  return [
    rawContentStripped,
    resolvePageDataCode(page), // inject page data code
    !hasDefaultExport && resolveDefaultExportCode(page), // inject default export with component name
    app.env.isDev && HMR_CODE, // inject HMR code in dev mode
  ]
    .filter(isString)
    .join('\n')
}

/**
 * Render page to vue component
 */
export const renderPageToVue = (app: App, page: Page): string => {
  const { sfcBlocks } = page

  // get the content of template block
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

  // get the content of script block
  const scriptContent = [
    resolveScriptTagOpen(page),
    resolveScriptContentStripped(app, page),
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
