import type { PluginWithOptions } from 'markdown-it'
import { resolveVPre } from './resolveVPre.js'

export interface VPrePluginOptions {
  /**
   * Add `v-pre` directive to `<pre>` tag of code block or not
   */
  block?: boolean

  /**
   * Add `v-pre` directive to `<code>` tag of inline code or not
   */
  inline?: boolean
}

/**
 * v-pre plugin
 */
export const vPrePlugin: PluginWithOptions<VPrePluginOptions> = (
  md,
  { inline = true, block = true }: VPrePluginOptions = {},
) => {
  const rawFence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    let result = rawFence(...args)

    if (resolveVPre(info) ?? block) {
      result = `<pre v-pre${result.slice('<pre'.length)}`
    }
    return result
  }

  if (inline) {
    const rawInlineCodeRule = md.renderer.rules.code_inline!
    md.renderer.rules.code_inline = (...args) => {
      const result = rawInlineCodeRule(...args)
      return `<code v-pre${result.slice('<code'.length)}`
    }
  }
}
