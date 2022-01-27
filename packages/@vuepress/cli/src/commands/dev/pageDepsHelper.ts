import type { Page } from '@vuepress/core'

/**
 * Page deps helper
 */
export interface PageDepsHelper {
  /**
   * Handle deps when adding a page
   */
  add: (page: Page) => string[]

  /**
   * Handle deps when removing a page
   */
  remove: (page: Page) => string[]

  /**
   * Get all pages that depend on the `dep`
   */
  get: (dep: string) => string[]
}

/**
 * Create page deps helper
 */
export const createPageDepsHelper = (): PageDepsHelper => {
  const store = new Map<string, Set<string>>()
  return {
    add: ({ deps, filePathRelative }) => {
      const depsAdded: string[] = []
      if (filePathRelative) {
        deps.forEach((item) => {
          if (!store.has(item)) {
            store.set(item, new Set())
            depsAdded.push(item)
          }
          store.get(item)?.add(filePathRelative)
        })
      }
      return depsAdded
    },
    remove: ({ deps, filePathRelative }) => {
      const depsRemoved: string[] = []
      if (filePathRelative) {
        deps.forEach((item) => {
          const pagePathsSet = store.get(item)
          pagePathsSet?.delete(filePathRelative)
          if (pagePathsSet?.size === 0) {
            store.delete(item)
            depsRemoved.push(item)
          }
        })
      }
      return depsRemoved
    },
    get: (dep) => {
      const pagePathsSet = store.get(dep)
      return pagePathsSet ? [...pagePathsSet] : []
    },
  }
}
