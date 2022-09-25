import type { PluginWithOptions } from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.js'
import type { MarkdownEnv } from '../../types.js'
import { resolveLink } from './resolveLink.js'

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
  // wrap raw image renderer rule
  const rawImageRule = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env: MarkdownEnv, self) => {
    const token = tokens[idx]

    // get the image link
    const link = token.attrGet('src')

    if (link) {
      // replace the original link with resolved link
      token.attrSet('src', resolveLink(link, relativePathPrefix, env))
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
          /(<img\b.*?src=)(['"])([^\2]*?)\2/gs,
          (_, prefix: string, quote: string, src: string) =>
            `${prefix}${quote}${resolveLink(
              src.trim(),
              relativePathPrefix,
              env,
              true
            )}${quote}`
        )
        // handle srcset
        .replace(
          /(<img\b.*?srcset=)(['"])([^\2]*?)\2/gs,
          (_, prefix: string, quote: string, srcset: string) =>
            `${prefix}${quote}${srcset
              .split(',')
              .map((item) =>
                item
                  .trim()
                  .replace(
                    /^([^ ]*?)([ \n].*)?$/,
                    (_, url, descriptor = '') =>
                      `${resolveLink(
                        url.trim(),
                        relativePathPrefix,
                        env,
                        true
                      )}${descriptor.replace(/[ \n]+/g, ' ').trimEnd()}`
                  )
              )
              .join(', ')}${quote}`
        )

      return rawHtmlRule(tokens, idx, options, env, self)
    }
  const rawHtmlBlockRule = md.renderer.rules.html_block!
  const rawHtmlInlineRule = md.renderer.rules.html_inline!
  md.renderer.rules.html_block = createHtmlRule(rawHtmlBlockRule)
  md.renderer.rules.html_inline = createHtmlRule(rawHtmlInlineRule)
}
