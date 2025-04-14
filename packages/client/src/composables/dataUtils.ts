import type {
  LayoutsRef,
  PageComponentRef,
  PageDataRef,
  PageFrontmatterRef,
  PageHeadRef,
  PageLangRef,
  PageLayoutRef,
  RedirectsRef,
  RouteLocaleRef,
  RoutePathRef,
  RoutesRef,
  SiteDataRef,
  SiteLocaleDataRef,
} from '../types/index.js'
import { useData } from './data.js'

// page related

/**
 * Get page data
 */
export const usePageData = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageDataRef<T> => useData<Record<string, unknown>, T>().page
/**
 * Shorthand for `usePageData()`
 */
export const usePage = usePageData
/**
 * Get page frontmatter
 */
export const usePageFrontmatter = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageFrontmatterRef<T> => useData<T>().frontmatter
/**
 * Shorthand for `usePageFrontmatter()`
 */
export const useFrontmatter = usePageFrontmatter
/**
 * Get page head
 */
export const usePageHead = (): PageHeadRef => useData().head
/**
 * Shorthand for `usePageHead()`
 */
export const useHead = usePageHead
/**
 * Get page lang
 */
export const usePageLang = (): PageLangRef => useData().lang
/**
 * Shorthand for `usePageLang()`
 */
export const useLang = usePageLang

// route related

/**
 * Get routes map
 */
export const useRoutes = (): RoutesRef => useData().routes
/**
 * Get redirect records
 */
export const useRedirects = (): RedirectsRef => useData().redirects

/**
 * Get route locale
 */
export const useRouteLocale = (): RouteLocaleRef => useData().routeLocale
/**
 * Get route path
 */
export const useRoutePath = (): RoutePathRef => useData().routePath

// site related
/**
 * Get site data
 */
export const useSiteData = (): SiteDataRef => useData().site
/**
 * Shorthand for `useSiteData()`
 */
export const useSite = useSiteData
/**
 * Get site locale data
 */
export const useSiteLocaleData = (): SiteLocaleDataRef => useData().siteLocale
/**
 * Shorthand for `useSiteLocaleData()`
 */
export const useSiteLocale = useSiteLocaleData

// FIXME: remove these in stable
// Internal composables before `useData` was introduced, which are never expected to be called outside of vuePress/client
// These are marked deprecated and kept for backward compatibility for now

/** @deprecated use useData().pageComponent instead */
export const usePageComponent = (): PageComponentRef => useData().pageComponent
/** @deprecated use useData().pageLayout instead */
export const usePageLayout = (): PageLayoutRef => useData().pageLayout
/** @deprecated use useData().layouts instead */
export const useLayouts = (): LayoutsRef => useData().layouts
