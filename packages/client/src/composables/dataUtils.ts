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
export const useSite = (): SiteDataRef => useData().site
/**
 * Get site locale data
 */
export const useSiteLocale = (): SiteLocaleDataRef => useData().siteLocale

// internal composables before `useData` was introduced, which are never expected to be called outside of vuePress/client
// these are marked deprecated and kept for backward compatibility for now
// FIXME: remove these in stable

/** @deprecated use useData().pageComponent instead */
export const usePageComponent = (): PageComponentRef => useData().pageComponent
/** @deprecated use useData().pageLayout instead */
export const usePageLayout = (): PageLayoutRef => useData().pageLayout
/** @deprecated use useData().layouts instead */
export const useLayouts = (): LayoutsRef => useData().layouts

// original long composable names
// these are kept for backward compatibility, and might not need to implicitly marked as deprecated

/** Note: suggest using `usePage` instead */
export const usePageData = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageDataRef<T> => useData<Record<string, unknown>, T>().page
/** Note: suggest using `useFrontmatter` instead */
export const usePageFrontmatter = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageFrontmatterRef<T> => useData<T>().frontmatter
/** Note: suggest using `useHead` instead */
export const usePageHead = (): PageHeadRef => useData().head
/** Note: suggest using `useLang` instead */
export const usePageLang = (): PageLangRef => useData().lang
/** Note: suggest using `useSite` instead */
export const useSiteData = (): SiteDataRef => useData().site
/** Note: suggest using `useSiteLocale` instead */
export const useSiteLocaleData = (): SiteLocaleDataRef => useData().siteLocale
