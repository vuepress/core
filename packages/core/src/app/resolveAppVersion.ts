import { createRequire } from 'node:module'
import { fs } from '@vuepress/utils'

const require = createRequire(import.meta.url)

/**
 * Resolve version of vuepress app
 *
 * @internal
 */
export const resolveAppVersion = (): string => {
  const pkgJson = fs.readJsonSync(
    require.resolve('@vuepress/core/package.json'),
  ) as { version: string }
  return pkgJson.version
}
