import type { PageData } from '@vuepress/shared'
import type { ComponentOptions } from 'vue'

export interface PageChunk {
  comp: ComponentOptions
  data: PageData
}

export type RouteMeta = Record<string, unknown>

export interface Route<T extends RouteMeta = RouteMeta> {
  loader: () => Promise<PageChunk>
  meta: T
}

export type Redirects = Record<string, string>

export type Routes = Record<string, Route>
