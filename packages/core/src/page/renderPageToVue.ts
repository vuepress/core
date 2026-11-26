import { isString } from '@vuepress/shared'
import { path, stringifyScriptString } from '@vuepress/utils'

import type { App, Page } from '../types/index.js'

const TEMPLATE_WRAPPER_TAG_OPEN = '<div>'
const TEMPLATE_WRAPPER_TAG_CLOSE = '</div>'

const SCRIPT_TAG_OPEN = '<script>'
const SCRIPT_TAG_CLOSE = '</script>'

const SCRIPT_TAG_OPEN_LANG_TS_REGEX = /\blang=["']ts["']/
const SCRIPT_TAG_OPEN_LANG_TS = '<script lang="ts">'

const EXPORT_KEYWORD = 'export'
const DEFAULT_KEYWORD = 'default'
const AS_KEYWORD = 'as'

const WHITESPACE_REGEX = /\s/

const PAGE_DATA_CODE_VAR_NAME = '_pageData'

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
  const isUsingTs = SCRIPT_TAG_OPEN_LANG_TS_REGEX.test(
    page.sfcBlocks.scriptSetup?.tagOpen ?? '',
  )
  return isUsingTs ? SCRIPT_TAG_OPEN_LANG_TS : SCRIPT_TAG_OPEN
}

/**
 * Util to resolve the default export code
 */
const resolveDefaultExportCode = (page: Page): string =>
  `export default { name: ${stringifyScriptString(path.basename(page.chunkFilePath))} }`

/**
 * Util to resolve the page data code
 */
const resolvePageDataCode = (page: Page): string =>
  `export const ${PAGE_DATA_CODE_VAR_NAME} = JSON.parse(${stringifyScriptString(JSON.stringify(page.data))})`

/**
 * Check whether the character is a whitespace
 */
const isWhitespace = (char: string | undefined): boolean =>
  char !== undefined && WHITESPACE_REGEX.test(char)

/**
 * Skip whitespaces from the given index
 */
const skipWhitespaces = (content: string, index: number): number => {
  let cursor = index
  while (isWhitespace(content[cursor])) cursor += 1
  return cursor
}

/**
 * Check whether the `export` keyword at the given index starts a statement
 */
const isExportStatementStart = (content: string, index: number): boolean => {
  let cursor = index - 1

  while (cursor >= 0) {
    const char = content[cursor]
    if (!isWhitespace(char)) return char === ';'
    // a newline is a statement boundary as well
    if (char === '\n') return true
    cursor -= 1
  }

  // the content before the keyword is all whitespaces, so it starts from the beginning
  return true
}

/**
 * Check whether the exported names after `export` contain a default alias,
 * which looks like `export { foo as default }`
 */
const isNamedDefaultExport = (content: string, index: number): boolean => {
  // the exported names are not allowed to be splitted into multiple lines
  const lineEnd = content.indexOf('\n', index)
  const end = lineEnd === -1 ? content.length : lineEnd
  let cursor = content.indexOf(AS_KEYWORD, index)

  while (cursor !== -1 && cursor < end) {
    if (
      // the exported name is required before `as`
      cursor > index &&
      content.startsWith(
        DEFAULT_KEYWORD,
        skipWhitespaces(content, cursor + AS_KEYWORD.length),
      )
    ) {
      return true
    }
    cursor = content.indexOf(AS_KEYWORD, cursor + 1)
  }

  return false
}

/**
 * Check whether the script content has a default export statement
 */
const hasDefaultExportStatement = (content: string): boolean => {
  let index = content.indexOf(EXPORT_KEYWORD)

  while (index !== -1) {
    if (isExportStatementStart(content, index)) {
      const cursor = skipWhitespaces(content, index + EXPORT_KEYWORD.length)
      if (
        content.startsWith(DEFAULT_KEYWORD, cursor) ||
        isNamedDefaultExport(content, index + EXPORT_KEYWORD.length)
      ) {
        return true
      }
    }
    index = content.indexOf(EXPORT_KEYWORD, index + 1)
  }

  return false
}

/**
 * Resolve the stripped content of script block
 */
const resolveScriptContentStripped = (app: App, page: Page): string => {
  const rawContentStripped = page.sfcBlocks.script?.contentStripped
  const hasDefaultExport = rawContentStripped
    ? hasDefaultExportStatement(rawContentStripped)
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
