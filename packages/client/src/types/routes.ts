import type { Component } from 'vue'
import type { PageData } from '../types/index.js'

export interface PageChunk {
  comp: Component
  data: PageData
}

export type RouteMeta = Record<string, unknown>

export interface Route<T extends RouteMeta = RouteMeta> {
  loader: () => Promise<PageChunk>
  meta: T
}

export type Redirects = Record<string, string>

export type Routes = Record<string, Route>
