import { isFunction } from '@vuepress/shared'
import { fs, logger } from '@vuepress/utils'
import type { ClientConfigFileHook } from '../types/index.js'

/**
 * Normalize hook for client config file
 */
export const normalizeClientConfigFileHook =
  (hook: ClientConfigFileHook['exposed']): ClientConfigFileHook['normalized'] =>
  async (app) => {
    // resolve clientConfigFile result
    const clientConfigFileResult = isFunction(hook) ? await hook(app) : hook

    // filter files that do not exist
    const isExisted = await fs.pathExists(clientConfigFileResult)
    if (!isExisted) {
      throw logger.createError(
        `client config file does not exist: ${clientConfigFileResult}`
      )
    }

    return clientConfigFileResult
  }
