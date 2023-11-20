import type { PageData } from '@vuepress/shared'
import type { ComponentOptions } from 'vue'

declare module '@internal/pagesMap' {
  export interface PageInfo<PageMeta = Record<string, unknown>> {
    comp: ComponentOptions
    data: () => Promise<PageData>
    meta: PageMeta
  }

  export type PagesMap<PageMeta = Record<string, unknown>> = Map<
    string,
    PageInfo<PageMeta>
  >

  export const pagesMap: PagesMap
}
