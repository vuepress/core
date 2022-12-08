import { pagesRoutes } from '@internal/pagesRoutes'
import type { RouteRecordRaw } from 'vue-router'
import { createVuepressComponent } from './components/Vuepress.js'

/**
 * Create routes for vue-router
 */
export const createRoutes = async (): Promise<RouteRecordRaw[]> => {
  const Vuepress = await createVuepressComponent()
  return pagesRoutes.reduce(
    (result, [name, path, meta, redirects]) => {
      result.push(
        {
          name,
          path,
          component: Vuepress,
          meta,
        },
        ...redirects.map((item) => ({
          path: item,
          redirect: path,
        }))
      )
      return result
    },
    [
      {
        name: '404',
        path: '/:catchAll(.*)',
        component: Vuepress,
      },
    ] as RouteRecordRaw[]
  )
}
