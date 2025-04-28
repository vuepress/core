import type {
  HeadConfig,
  PageData,
  PageFrontmatter,
  PageHeader,
  SiteData,
  SiteLocaleData,
} from '@vuepress/shared'
import type { Component, ComputedRef, Ref } from 'vue'
import type {
  LAYOUT_NAME_DEFAULT,
  LAYOUT_NAME_NOT_FOUND,
} from '../constants.js'
import type { Redirects, Routes } from './routes.js'

export type {
  HeadConfig,
  PageData,
  PageFrontmatter,
  PageHeader,
  SiteData,
  SiteLocaleData,
}

export interface Layouts {
  [LAYOUT_NAME_DEFAULT]: Component
  [LAYOUT_NAME_NOT_FOUND]: Component
  [key: string]: Component
}
export type PageComponent = Component
export type PageHead = HeadConfig[]
export type PageHeadTitle = string
export type PageLang = string
export type PageLayout = Component
export type RoutePath = string
export type RouteLocale = string

export type LayoutsRef = ComputedRef<Layouts>
export type PageComponentRef = ComputedRef<PageComponent>
export type PageDataRef<
  T extends Record<string, unknown> = Record<string, unknown>,
> = ComputedRef<PageData<T>>
export type PageFrontmatterRef<
  T extends Record<string, unknown> = Record<string, unknown>,
> = ComputedRef<PageFrontmatter<T>>
export type PageHeadRef = ComputedRef<PageHead>
export type PageHeadTitleRef = ComputedRef<PageHeadTitle>
export type PageLangRef = ComputedRef<PageLang>
export type PageLayoutRef = ComputedRef<PageLayout>
export type RedirectsRef = Ref<Redirects>
export type RoutePathRef = ComputedRef<RoutePath>
export type RouteLocaleRef = ComputedRef<RouteLocale>
export type RoutesRef = Ref<Routes>
export type SiteDataRef = Ref<SiteData>
export type SiteLocaleDataRef = ComputedRef<SiteLocaleData>

export interface ClientData<
  Frontmatter extends Record<string, unknown> = Record<string, unknown>,
  Data extends Record<string, unknown> = Record<string, unknown>,
> {
  layouts: LayoutsRef
  pageComponent: PageComponentRef
  pageData: PageDataRef<Data>
  pageFrontmatter: PageFrontmatterRef<Frontmatter>
  pageHead: PageHeadRef
  pageHeadTitle: PageHeadTitleRef
  pageLang: PageLangRef
  pageLayout: PageLayoutRef
  redirects: RedirectsRef
  routePath: RoutePathRef
  routeLocale: RouteLocaleRef
  routes: RoutesRef
  siteData: SiteDataRef
  siteLocaleData: SiteLocaleDataRef

  /* Aliases */
  frontmatter: PageFrontmatterRef<Frontmatter>
  head: PageHeadRef
  headTitle: PageHeadTitleRef
  lang: PageLangRef
  page: PageDataRef<Data>
  site: SiteDataRef
  siteLocale: SiteLocaleDataRef
}
