/**
 * HTML outlets of the template renderer
 */
export enum TemplateRendererOutlet {
  Content = '<!--vuepress-ssr-content-->',
  Head = '<!--vuepress-ssr-head-->',
  Lang = '{{ lang }}',
  Prefetch = '<!--vuepress-ssr-prefetch-->',
  Preload = '<!--vuepress-ssr-preload-->',
  Scripts = '<!--vuepress-ssr-scripts-->',
  Styles = '<!--vuepress-ssr-styles-->',
  Version = '{{ version }}',
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
) => Promise<string> | string

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
    .replace(TemplateRendererOutlet.Content, () => content)
    .replace(TemplateRendererOutlet.Head, head)
    .replace(TemplateRendererOutlet.Lang, lang)
    .replace(TemplateRendererOutlet.Prefetch, prefetch)
    .replace(TemplateRendererOutlet.Preload, preload)
    .replace(TemplateRendererOutlet.Scripts, scripts)
    .replace(TemplateRendererOutlet.Styles, styles)
    .replace(TemplateRendererOutlet.Version, version)
