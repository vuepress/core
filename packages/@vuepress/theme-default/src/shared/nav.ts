/**
 * Base nav item, displayed as text
 */
export interface NavItem {
  text: string
  ariaLabel?: string
}

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends NavItem {
  children: T[]
}

/**
 * Props for `<NavLink>`
 */
export interface NavLink extends NavItem {
  link: string
  rel?: string
  target?: string
  activeMatch?: string
}

/**
 * Navbar types
 */
// user config
export type NavbarItem = NavLink
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[]
// resolved
export type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>

/**
 * Sidebar types
 */
// user config
export type SidebarItem = NavItem &
  Partial<NavLink> &
  Partial<Pick<NavGroup<NavLink | SidebarItem | string>, 'children'>>
export type SidebarConfigArray = (SidebarItem | string)[]
export type SidebarConfigObject = Record<string, SidebarConfigArray>
export type SidebarConfig = SidebarConfigArray | SidebarConfigObject
// resolved
export type ResolvedSidebarItem = NavItem &
  Partial<NavLink> &
  Partial<Pick<NavGroup<ResolvedSidebarItem>, 'children'>>
