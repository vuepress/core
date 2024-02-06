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
import { useClientData } from './clientData'

export const useLayouts = (): LayoutsRef => useClientData().layouts

export const usePageComponent = (): PageComponentRef =>
  useClientData().pageComponent

export const usePageData = <
  T extends Record<any, any> = Record<never, never>,
>(): PageDataRef<T> => useClientData().pageData as PageDataRef<T>

export const usePageFrontmatter = <
  T extends Record<any, any> = Record<string, unknown>,
>(): PageFrontmatterRef<T> =>
  useClientData().pageFrontmatter as PageFrontmatterRef<T>

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
