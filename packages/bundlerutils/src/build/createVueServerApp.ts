import type { CreateVueAppFunction } from '@vuepress/client'
import { importFile, importFileDefault } from '@vuepress/utils'
import type { App } from 'vue'
import type { Router } from 'vue-router'

/**
 * Create vue app and router for server side rendering
 */
export const createVueServerApp = async (
  serverAppPath: string,
): Promise<{
  vueApp: App
  vueRouter: Router
}> => {
  // use different import function for cjs and esm
  const importer = serverAppPath.endsWith('.cjs')
    ? importFileDefault
    : importFile

  // import the server app entry file
  const { createVueApp } = await importer<{
    createVueApp: CreateVueAppFunction
  }>(serverAppPath)

  // create vue app
  const { app, router } = await createVueApp()

  return { vueApp: app, vueRouter: router }
}
