/**
 * Config for `<head>` tags
 */
export type HeadConfig =
  | [HeadTagEmpty, HeadAttrsConfig]
  | [HeadTagNonEmpty, HeadAttrsConfig, string]

/**
 * Allowed tags in `<head>`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
 */
export type HeadTag = HeadTagEmpty | HeadTagNonEmpty

/**
 * Non-empty tags in `<head>`
 */
export type HeadTagNonEmpty =
  | 'noscript'
  | 'script'
  | 'style'
  | 'template'
  | 'title'

/**
 * Empty tags in `<head>`
 */
export type HeadTagEmpty = 'base' | 'link' | 'meta' | 'script'

/**
 * Attributes to be set for tags in `<head>`
 */
export type HeadAttrsConfig = Record<string, boolean | string>
