import { fs } from '@vuepress/utils'
import { transformSync } from 'esbuild'

/**
 * Transform a ts file to cjs code
 */
export const transformTsFileToCodeSync = (filename: string): string =>
  transformSync(fs.readFileSync(filename).toString(), {
    loader: 'ts',
    format: 'cjs',
    target: 'node12',
  }).code
