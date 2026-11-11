import { merge } from 'rspack-merge'

import { rspackBundler } from './rspackBundler.js'

export type * from './types.js'

export { merge as rspackMergeConfig, rspackBundler }
export default rspackBundler
