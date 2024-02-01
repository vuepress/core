import type { PageData } from '@vuepress/shared'
import type { ComponentOptions } from 'vue'

declare module '@internal/pagesMap' {
  export type RedirectsMap = Record<string, string>

  export interface PageChunk {
    comp: ComponentOptions
    data: PageData
  }

  export interface PageMapItem<PageMeta = Record<string, unknown>> {
    loader: () => Promise<PageChunk>
    meta: PageMeta
  }

  export type PagesMap = Record<string, PageMapItem>

  export const redirectsMap: RedirectsMap
  export const pagesMap: PagesMap
}
