import { resolve } from '@vuepress/client'
import type { NavLink } from '../../shared/index.js'

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useNavLink = (path: string): NavLink => {
  const { path: link, meta } = resolve<{ title: string }>(path)

  return {
    text: meta?.title || link,
    link,
  }
}
