import type { ClientConfig } from '@vuepress/client'

/**
 * A helper function to help you define vuepress client config file
 */
export const defineClientConfig = (
  clientConfig: ClientConfig = {},
): ClientConfig => clientConfig

export * from '@vuepress/client'
