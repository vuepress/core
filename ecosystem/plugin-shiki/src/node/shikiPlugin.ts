import type { Plugin } from '@vuepress/core'
import { getHighlighter } from 'shiki'
import type { HighlighterOptions } from 'shiki'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = Pick<HighlighterOptions, 'theme' | 'langs'>

export const shikiPlugin = ({
  theme = 'nord',
  langs,
}: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdown: async (md) => {
    const highlighter = await getHighlighter({
      theme,
      langs,
    })
    md.options.highlight = (code, lang) =>
      highlighter.codeToHtml(code, {
        lang,
      })
  },
})
