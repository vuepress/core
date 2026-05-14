import type { RspackChain } from 'rspack-chain'

/**
 * Set rspack node config
 */
export const handleNode = ({ config }: { config: RspackChain }): void => {
  // do not polyfill or mock node globals and modules
  config.node
    .set('__filename', false)
    .set('__dirname', false)
    .set('global', false)
}
