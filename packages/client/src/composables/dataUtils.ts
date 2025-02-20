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

export const usePage = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageDataRef<T> => useData<Record<string, unknown>, T>().page
export const useFrontmatter = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageFrontmatterRef<T> => useData<T>().frontmatter
export const useHead = (): PageHeadRef => useData().head
export const useLang = (): PageLangRef => useData().lang
export const useComponent = (): PageComponentRef => useData().component
export const useLayout = (): PageLayoutRef => useData().layout

// router related
export const useRoutes = (): RoutesRef => useData().routes
export const useRedirects = (): RedirectsRef => useData().redirects

// route related
export const useRouteLocale = (): RouteLocaleRef => useData().routeLocale
export const useRoutePath = (): RoutePathRef => useData().routePath

// site related
export const useSite = (): SiteDataRef => useData().site
export const useSiteLocale = (): SiteLocaleDataRef => useData().siteLocale
export const useLayouts = (): LayoutsRef => useData().layouts

// deprecated

/** @deprecated use useComponent instead */
export const usePageComponent = (): PageComponentRef => useData().component

/** @deprecated use usePage instead */
export const usePageData = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageDataRef<T> => useData<Record<string, unknown>, T>().page
/** @deprecated use useFrontmatter instead */
export const usePageFrontmatter = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageFrontmatterRef<T> => useData<T>().frontmatter
/** @deprecated use useLayout instead */
export const usePageLayout = (): PageLayoutRef => useData().layout
/** @deprecated use useLang instead */
export const usePageLang = (): PageLangRef => useData().lang
/** @deprecated use useHead instead */
export const usePageHead = (): PageHeadRef => useData().head
/** @deprecated use useSite instead */
export const useSiteData = (): SiteDataRef => useData().site
/** @deprecated use useSiteLocale instead */
export const useSiteLocaleData = (): SiteLocaleDataRef => useData().siteLocale
