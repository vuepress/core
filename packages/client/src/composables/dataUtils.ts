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
export const usePage = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageDataRef<T> => useData<Record<string, unknown>, T>().page
/**
 * Get page frontmatter
 */
export const useFrontmatter = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageFrontmatterRef<T> => useData<T>().frontmatter
/**
 * Get page head
 */
export const useHead = (): PageHeadRef => useData().head
/**
 * Get page lang
 */
export const useLang = (): PageLangRef => useData().lang

// router related
/**
 * Get routes map
 */
export const useRoutes = (): RoutesRef => useData().routes
/**
 * Get redirect records
 */
export const useRedirects = (): RedirectsRef => useData().redirects

// route related
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
export const useSite = (): SiteDataRef => useData().site
/**
 * Get site locale data
 */
export const useSiteLocale = (): SiteLocaleDataRef => useData().siteLocale

// internal
/** @deprecated use useData().pageComponent instead */
export const usePageComponent = (): PageComponentRef => useData().pageComponent
/** @deprecated use useData().pageLayout instead */
export const usePageLayout = (): PageLayoutRef => useData().pageLayout
/** @deprecated use useData().layouts instead */
export const useLayouts = (): LayoutsRef => useData().layouts

// deprecated
/** @deprecated use usePage instead */
export const usePageData = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageDataRef<T> => useData<Record<string, unknown>, T>().page
/** @deprecated use useFrontmatter instead */
export const usePageFrontmatter = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageFrontmatterRef<T> => useData<T>().frontmatter
/** @deprecated use useHead instead */
export const usePageHead = (): PageHeadRef => useData().head
/** @deprecated use useLang instead */
export const usePageLang = (): PageLangRef => useData().lang
/** @deprecated use useSite instead */
export const useSiteData = (): SiteDataRef => useData().site
/** @deprecated use useSiteLocale instead */
export const useSiteLocaleData = (): SiteLocaleDataRef => useData().siteLocale
