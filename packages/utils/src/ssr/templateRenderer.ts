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
 * Escape special chars of a string to be used in a regular expression
 */
const escapeRegExp = (value: string): string =>
  value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * The default template renderer implementation
 *
 * Notice that all the outlets are replaced in a single pass:
 *
 * - The replacements are only applied to the original template, so the outlet
 *   markers contained in the rendered values (e.g. the scripts marker in the
 *   page content) won't be replaced again.
 * - An outlet that appears multiple times in the template will be replaced
 *   every time.
 * - The replacement function is used to keep special chars like `$&` and `$1`
 *   in the rendered values as-is, otherwise they would be recognized by
 *   `String.prototype.replace()` as replacement patterns.
 * - Outlets without a corresponding value are kept as-is, so that custom
 *   templates with only a part of the outlets can still be rendered.
 */
export const templateRenderer: TemplateRenderer = (
  template: string,
  { content, head, lang, prefetch, preload, scripts, styles, version },
): string => {
  const outletEntries: [TemplateRendererOutlet, string | undefined][] = [
    [TemplateRendererOutlet.Content, content],
    [TemplateRendererOutlet.Head, head],
    [TemplateRendererOutlet.Lang, lang],
    [TemplateRendererOutlet.Prefetch, prefetch],
    [TemplateRendererOutlet.Preload, preload],
    [TemplateRendererOutlet.Scripts, scripts],
    [TemplateRendererOutlet.Styles, styles],
    [TemplateRendererOutlet.Version, version],
  ]

  const outletMap = new Map<string, string>(
    outletEntries.filter(
      (entry): entry is [TemplateRendererOutlet, string] =>
        typeof entry[1] === 'string',
    ),
  )

  if (outletMap.size === 0) {
    return template
  }

  const outletPattern = new RegExp(
    [...outletMap.keys()].map(escapeRegExp).join('|'),
    'g',
  )

  return template.replace(
    outletPattern,
    (outlet) => outletMap.get(outlet) ?? outlet,
  )
}
