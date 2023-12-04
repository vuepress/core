import type { PageData } from '@vuepress/shared'
import type { ComponentOptions } from 'vue'

declare module '@internal/pagesMap' {
  export type PageRedirectsMap = Map<string, string>

  export interface PageInfo<PageMeta = Record<string, unknown>> {
    comp: ComponentOptions
    data: () => Promise<PageData>
    meta: PageMeta
  }

  export type PagesMap<PageMeta = Record<string, unknown>> = Map<
    string,
    PageInfo<PageMeta>
  >

  export const redirectsMap: PageRedirectsMap
  export const pagesMap: PagesMap
}
