import type * as Config from 'webpack-chain'
import { path } from '@vuepress/utils'

/**
 * Set webpack context
 */
export const handleContext = ({ config }: { config: Config }): void => {
  // set package root as context
  config.context(path.join(__dirname, '../../'))
}
