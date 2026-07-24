import { merge } from 'webpack-merge'

import { webpackBundler } from './webpackBundler.js'

export type * from './types.js'

export { merge as webpackMergeConfig, webpackBundler }
export default webpackBundler
