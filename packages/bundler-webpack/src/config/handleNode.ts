import type Config from 'webpack-5-chain'

/**
 * Set webpack node config
 */
export const handleNode = ({ config }: { config: Config }): void => {
  // do not polyfill or mock node globals and modules
  config.node.merge({
    __filename: false,
    __dirname: false,
    global: false,
  })
}
