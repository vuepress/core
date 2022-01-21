import type { Plugin } from '@vuepress/core'
import type { MarkdownEnv } from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import type { ExternalLinkIconLocales } from '../shared'

/**
 * Options for @vuepress/plugin-external-link-icon
 */
export type ExternalLinkIconPluginOptions = {
  locales?: ExternalLinkIconLocales
}

export const externalLinkIconPlugin: Plugin<ExternalLinkIconPluginOptions> = ({
  locales = {},
}) => ({
  name: '@vuepress/plugin-external-link-icon',

  define: {
    __EXTERNAL_LINK_ICON_LOCALES__: locales,
  },

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    '../client/clientAppEnhance.js'
  ),

  extendsMarkdown: (md) => {
    let shouldRenderExternalIcon = false

    const rawLinkOpenRule = md.renderer.rules.link_open!
    md.renderer.rules.link_open = (
      tokens,
      idx,
      options,
      env: MarkdownEnv,
      self
    ) => {
      const result = rawLinkOpenRule(tokens, idx, options, env, self)
      if (
        env.frontmatter?.externalLinkIcon !== false &&
        tokens[idx].attrGet('target') === '_blank'
      ) {
        shouldRenderExternalIcon = true
      }
      return result
    }

    const rawLinkCloseRule = md.renderer.rules.link_close!
    md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
      const result = rawLinkCloseRule(tokens, idx, options, env, self)
      // add external link icon before ending tag
      if (shouldRenderExternalIcon) {
        shouldRenderExternalIcon = false
        return `<ExternalLinkIcon/>${result}`
      }
      return result
    }
  },
})
