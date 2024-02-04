import type { Redirects, Routes } from '../routes.js'

declare module '@internal/routes' {
  export const redirects: Redirects
  export const routes: Routes
}
