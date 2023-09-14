/**
 * HTML outlets of the template renderer
 */
export const TEMPLATE_RENDERER_OUTLETS = {
  CONTENT: '<!--vuepress-ssr-content-->',
  HEAD: '<!--vuepress-ssr-head-->',
  LANG: '{{ lang }}',
  PREFETCH: '<!--vuepress-ssr-prefetch-->',
  PRELOAD: '<!--vuepress-ssr-preload-->',
  SCRIPTS: '<!--vuepress-ssr-scripts-->',
  STYLES: '<!--vuepress-ssr-styles-->',
  VERSION: '{{ version }}',
}

/**
 * Context type of the template renderer
 */
export interface TemplateRendererContext {
  /**
   * The rendered page content. Typically to be put inside `<div id="app"></div>`
   */
  content: string

  /**
   * The rendered page head. Typically to be put inside `<head></head>`
   */
  head: string

  /**
   * The language of the page. Typically to be put inside `<html lang="{{ lang }}">`
   */
  lang: string

  /**
   * The rendered prefetch links. Typically to be put inside `<head></head>`
   */
  prefetch: string

  /**
   * The rendered preload links. Typically to be put inside `<head></head>`
   */
  preload: string

  /**
   * The rendered scripts. Typically to be put before `</body>`
   */
  scripts: string

  /**
   * The rendered styles. Typically to be put inside `<head></head>`
   */
  styles: string

  /**
   * The version of VuePress
   */
  version: string
}

/**
 * Type of the template renderer function
 */
export type TemplateRenderer = (
  template: string,
  context: TemplateRendererContext,
) => string | Promise<string>

/**
 * The default template renderer implementation
 */
export const templateRenderer: TemplateRenderer = (
  template: string,
  { content, head, lang, prefetch, preload, scripts, styles, version },
): string =>
  template
    // notice that some special chars in string like `$&` would be recognized by `replace()`,
    // and they won't be html-escaped and will be kept as is when they are inside a code block,
    // so we use a replace function as the second param to avoid those potential issues
    .replace(TEMPLATE_RENDERER_OUTLETS.CONTENT, () => content)
    .replace(TEMPLATE_RENDERER_OUTLETS.HEAD, head)
    .replace(TEMPLATE_RENDERER_OUTLETS.LANG, lang)
    .replace(TEMPLATE_RENDERER_OUTLETS.PREFETCH, prefetch)
    .replace(TEMPLATE_RENDERER_OUTLETS.PRELOAD, preload)
    .replace(TEMPLATE_RENDERER_OUTLETS.SCRIPTS, scripts)
    .replace(TEMPLATE_RENDERER_OUTLETS.STYLES, styles)
    .replace(TEMPLATE_RENDERER_OUTLETS.VERSION, version)
