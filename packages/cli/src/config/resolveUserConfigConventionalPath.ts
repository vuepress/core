import process from 'node:process'
import { fs, path } from '@vuepress/utils'

/**
 * Resolve conventional user config file path
 */
export const resolveUserConfigConventionalPath = (
  source: string,
  cwd = process.cwd()
): string | undefined =>
  [
    path.resolve(cwd, 'vuepress.config.ts'),
    path.resolve(cwd, 'vuepress.config.js'),
    path.resolve(cwd, 'vuepress.config.mjs'),
    path.resolve(source, '.vuepress/config.ts'),
    path.resolve(source, '.vuepress/config.js'),
    path.resolve(source, '.vuepress/config.mjs'),
  ].find((item) => fs.pathExistsSync(item))
