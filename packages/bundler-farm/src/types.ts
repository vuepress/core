import type { Server, start } from '@farmfe/core'
import type { VuePluginOptions } from '@vuepress/vite-kit'

export type FarmOptions = Exclude<Parameters<typeof start>[0], undefined>
export type FarmDevServerOptions = Parameters<
  InstanceType<typeof Server>['createDevServer']
>[0]

/**
 * Options for bundler-vite
 */
export interface FarmBundlerOptions {
  farmOptions?: FarmOptions
  vuePluginOptions?: VuePluginOptions
}
