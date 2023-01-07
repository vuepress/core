import { isActiveLink } from '@vuepress/helper/client'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../../shared/index.js'

export const isActiveSidebarItem = (
  item: ResolvedSidebarItem,
  route: RouteLocationNormalizedLoaded
): boolean => {
  if (item.link && isActiveLink(route, item.link)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveSidebarItem(child, route))
  }

  return false
}
