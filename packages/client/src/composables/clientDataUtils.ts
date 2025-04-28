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
import { useClientData } from './clientData.js'

export const useLayouts = (): LayoutsRef => useClientData().layouts

export const usePageComponent = (): PageComponentRef =>
  useClientData().pageComponent

export const usePageData = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageDataRef<T> => useClientData<Record<string, unknown>, T>().pageData

export const usePageFrontmatter = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(): PageFrontmatterRef<T> => useClientData<T>().pageFrontmatter

export const usePageHead = (): PageHeadRef => useClientData().pageHead

export const usePageLang = (): PageLangRef => useClientData().pageLang

export const usePageLayout = (): PageLayoutRef => useClientData().pageLayout

export const useRedirects = (): RedirectsRef => useClientData().redirects

export const useRouteLocale = (): RouteLocaleRef => useClientData().routeLocale

export const useRoutePath = (): RoutePathRef => useClientData().routePath

export const useRoutes = (): RoutesRef => useClientData().routes

export const useSiteData = (): SiteDataRef => useClientData().siteData

export const useSiteLocaleData = (): SiteLocaleDataRef =>
  useClientData().siteLocaleData

/* Aliases */
export const useData = useClientData
export const useFrontmatter = usePageFrontmatter
export const useHead = usePageHead
export const useLang = usePageLang
export const usePage = usePageData
export const useSite = useSiteData
export const useSiteLocale = useSiteLocaleData
