import { mergeConfig } from 'vite'

import { viteBundler } from './viteBundler.js'

export type * from './types.js'
export * from './viteBundler.js'

export { mergeConfig as viteMergeConfig, viteBundler }
export default viteBundler
