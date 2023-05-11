import { pagesRoutes } from '@internal/pagesRoutes'
import type { RouteRecordRaw } from 'vue-router'
import { Vuepress } from './components/Vuepress.js'

/**
 * Create routes for vue-router
 */
export const createRoutes = (): RouteRecordRaw[] =>
  pagesRoutes.reduce(
    (result, [name, path, meta, redirects]) => {
      const { length } = path

      result.push(
        {
          name,
          path,
          component: Vuepress,
          meta,
        },
        {
          path: path.endsWith('/')
            ? path + 'index.html'
            : path.substring(0, length - 5),
          redirect: path,
        },
        ...redirects.map((item) => ({
          path: item === ':ext' ? path.substring(0, length - 5) + '.md' : item,
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
