import { createRequire } from 'node:module'
import { fs } from '@vuepress/utils'

const require = createRequire(import.meta.url)

export const version = fs.readJSONSync(
  require.resolve('@vuepress/core/package.json')
).version
