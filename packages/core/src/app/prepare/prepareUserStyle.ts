import { fs } from '@vuepress/utils'

import type { App } from '../../types/index.js'

/**
 * Generate user style temp file
 *
 * @internal
 */
export const prepareUserStyle = async (
  app: App,
  fileExists: boolean | null = null,
): Promise<void> => {
  let content = ''

  const { userStyle } = app.options

  if (userStyle) {
    const userStylePath = app.dir.source(userStyle)

    if (fileExists ?? (await fs.pathExists(userStylePath)))
      content += `import ${JSON.stringify(userStylePath)}\n`
  }

  await app.writeTemp('internal/userStyle.js', content)
}
