import type { Redirects, Routes } from '../../router/index.js'

declare module '@internal/routes' {
  export const redirects: Redirects
  export const routes: Routes
}
