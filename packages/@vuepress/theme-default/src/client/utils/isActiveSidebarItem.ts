import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ResolvedSidebarItem } from '../../shared'

const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '')

const isActiveLink = (
  link: string,
  route: RouteLocationNormalizedLoaded
): boolean => {
  if (route.hash === link) {
    return true
  }
  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)
  return currentPath === targetPath
}

export const isActiveSidebarItem = (
  item: ResolvedSidebarItem,
  route: RouteLocationNormalizedLoaded
): boolean => {
  if (item.link && isActiveLink(item.link, route)) {
    return true
  }

  if (item.children) {
    return item.children.some((child) => isActiveSidebarItem(child, route))
  }

  return false
}
