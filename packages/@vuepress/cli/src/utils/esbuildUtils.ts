import { fs } from '@vuepress/utils'
import { transformSync } from 'esbuild'

/**
 * Transform a ts file to cjs code
 */
export const transformTsFileToCodeSync = (filename: string): string =>
  transformSync(fs.readFileSync(filename).toString(), {
    format: 'cjs',
    loader: 'ts',
    sourcefile: filename,
    sourcemap: 'inline',
    target: 'node12',
  }).code
