import type { PluginWithOptions } from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

import type { MarkdownEnv } from '../../types.js'
import { resolveLink } from './resolveLink.js'

export interface AssetsPluginOptions {
  /**
   * Whether to prepend base to absolute path
   */
  absolutePathPrependBase?: boolean

  /**
   * Use aliases for non-strict relative paths.
   *
   * This is a path that does not start
   * with `./` or `../` or `/` or `<protocol header>`:
   * `<img src="path1/path2.png" />`
   *
   * - If the option is `true`. `path1` is regarded as an alias.
   * - If the option is `false`. It is regarded as a relative path.
   * - If the option is `"@-prefix"`.
   *   If the path starts with `@`, `path1` is regarded as an alias;
   *   Otherwise, it is regarded as a relative path.
   */
  aliasSupport?: boolean | '@-prefix'
}

/**
 * Plugin to handle assets links
 */
export const assetsPlugin: PluginWithOptions<AssetsPluginOptions> = (
  md,
  {
    absolutePathPrependBase = false,
    aliasSupport = true,
  }: AssetsPluginOptions = {},
) => {
  // wrap raw image renderer rule
  const rawImageRule = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env: MarkdownEnv, self) => {
    const token = tokens[idx]

    // get the image link
    const link = token.attrGet('src')

    if (link) {
      // replace the original link with resolved link
      token.attrSet('src', resolveLink(link, { env, absolutePathPrependBase }))
    }

    return rawImageRule(tokens, idx, options, env, self)
  }

  // wrap raw html renderer rule
  const createHtmlRule =
    (rawHtmlRule: RenderRule): RenderRule =>
    (tokens, idx, options, env: MarkdownEnv, self) => {
      // replace the original link with resolved link
      tokens[idx].content = tokens[idx].content
        // handle src
        .replace(
          /(<(?:img|source|video|audio)\b.*?src=)(['"])(.*?)\2/gs,
          (_, prefix: string, quote: string, src: string) =>
            `${prefix}${quote}${resolveLink(src.trim(), {
              env,
              absolutePathPrependBase,
              aliasSupport,
            })}${quote}`,
        )
        // handle srcset
        .replace(
          /(<(?:img|source|video|audio)\b.*?srcset=)(['"])(.*?)\2/gs,
          (_, prefix: string, quote: string, srcset: string) =>
            `${prefix}${quote}${srcset
              .split(',')
              .map((item) =>
                item.trim().replace(
                  /^([^ ]*?)([ \n].*)?$/,
                  (__, url: string, descriptor: string | undefined = '') =>
                    `${resolveLink(url.trim(), {
                      env,
                      absolutePathPrependBase,
                    })}${descriptor.replace(/[ \n]+/g, ' ').trimEnd()}`,
                ),
              )
              .join(', ')}${quote}`,
        )

      return rawHtmlRule(tokens, idx, options, env, self)
    }
  const rawHtmlBlockRule = md.renderer.rules.html_block!
  const rawHtmlInlineRule = md.renderer.rules.html_inline!
  md.renderer.rules.html_block = createHtmlRule(rawHtmlBlockRule)
  md.renderer.rules.html_inline = createHtmlRule(rawHtmlInlineRule)
}
