import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import type { ViteBundlerOptions } from '../types'

/**
 * avoid defined variables being replaced by vite
 */
export async function handleDefinedVariables(
  app: App,
  options: ViteBundlerOptions
): Promise<void> {
  const defines = [
    // client constants
    '__VERSION__',
    '__DEV__',
    '__SSR__',
  ]

  for (const plugin of app.pluginApi.plugins) {
    if (plugin.define) {
      const define =
        typeof plugin.define === 'function'
          ? await plugin.define(app)
          : plugin.define

      defines.push(...(Reflect.ownKeys(define) as string[]))
    }
  }

  if (options?.viteOptions?.define) {
    const define = options?.viteOptions?.define
    defines.push(...(Reflect.ownKeys(define) as string[]))
  }

  const regex = new RegExp(
    `\\b(${defines
      .map((key) => key.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'))
      .join('|')})`,
    'g'
  )

  await Promise.all(
    app.pages.map(async (page) => {
      const buffer = await fs.readFile(page.componentFilePath)
      const html = buffer
        .toString()

        // env variables
        .replace(/\bimport\.meta/g, 'import.<wbr/>meta')
        .replace(/\bprocess\.env/g, 'process.<wbr/>env')

        // user defines
        .replace(regex, (_) => `${_[0]}<wbr/>${_.slice(1)}`)

      await fs.writeFile(page.componentFilePath, html)
    })
  )
}
