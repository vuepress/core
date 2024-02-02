import type { PageData } from '@vuepress/shared'
import type { ComponentOptions } from 'vue'

declare module '@internal/pagesMap' {
  export interface PageChunk {
    comp: ComponentOptions
    data: PageData
  }

  export type PageMetaDefault = Record<string, unknown>

  export interface PageMapItem<
    PageMeta extends PageMetaDefault = PageMetaDefault,
  > {
    loader: () => Promise<PageChunk>
    meta: PageMeta
  }

  export type PagesMap = Record<string, PageMapItem>
  export type RedirectsMap = Record<string, string>

  export const pagesMap: PagesMap
  export const redirectsMap: RedirectsMap
}
