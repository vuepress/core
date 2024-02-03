import type { PageData } from '@vuepress/shared'
import type { ComponentOptions } from 'vue'

declare module '@internal/routes' {
  export interface PageChunk {
    comp: ComponentOptions
    data: PageData
  }

  export type PageMetaDefault = Record<string, unknown>

  export interface Route<PageMeta extends PageMetaDefault = PageMetaDefault> {
    loader: () => Promise<PageChunk>
    meta: PageMeta
  }

  export type Redirects = Record<string, string>
  export type Routes = Record<string, Route>

  export const redirects: Redirects
  export const routes: Routes
}
