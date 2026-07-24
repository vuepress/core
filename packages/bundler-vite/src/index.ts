import { mergeConfig } from 'vite'

import { viteBundler } from './viteBundler.js'

export type * from './types.js'

export { mergeConfig as viteMergeConfig, viteBundler }
export default viteBundler
