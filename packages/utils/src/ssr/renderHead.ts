import type { HeadConfig } from '@vuepress/shared'
import { renderHeadAttrs } from './renderHeadAttrs.js'

/**
 * Render head config to string
 */
export const renderHead = ([
  tag,
  attrs,
  innerHTML = '',
]: HeadConfig): string => {
  const openTag = `<${tag}${renderHeadAttrs(attrs)}>`;
  const tagsWithNoInnerHtml = ['link', 'meta', 'base'];

  if (tagsWithNoInnerHtml.includes(tag)) {
    return openTag;
  }
  return `${openTag}${innerHTML}</${tag}>`;
}
