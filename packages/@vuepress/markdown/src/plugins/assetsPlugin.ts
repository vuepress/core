import type { PluginWithOptions } from 'markdown-it'
import { decode } from 'mdurl'
import { path } from '@vuepress/utils'
import type { MarkdownEnv } from '../types'

export interface AssetsPluginOptions {
  /**
   * Prefix to add to relative assets links
   */
  relativePathPrefix?: string
}

/**
 * Plugin to handle assets links
 */
export const assetsPlugin: PluginWithOptions<AssetsPluginOptions> = (
  md,
  { relativePathPrefix = '@source' }: AssetsPluginOptions = {}
) => {
  const rawRule = md.renderer.rules.image!

  md.renderer.rules.image = (tokens, idx, options, env: MarkdownEnv, self) => {
    const token = tokens[idx]

    // get the image link and decode link to the origin one
    // so that bundler can find the file correctly
    const link = token.attrGet('src')

    if (link) {
      if (/^\.{1,2}\//.test(link) && env.filePathRelative) {
        // if the link is relative path, and the `env.filePathRelative` exists
        // add `@source` alias to the link
        const resolvedLink = `${relativePathPrefix}/${path.join(
          path.dirname(env.filePathRelative),
          decode(link)
        )}`

        // replace the original link with absolute path
        token.attrSet('src', resolvedLink)
      } else {
        token.attrSet('src', decode(link))
      }
    }

    return rawRule(tokens, idx, options, env, self)
  }
}
