import type { AnchorEnv, AnchorOptions } from '@mdit/plugin-anchor'
import { anchor as anchorPlugin } from '@mdit/plugin-anchor'

export type MarkdownItAnchorEnv = AnchorEnv

declare module 'markdown-it' {
  interface Env {
    /**
     * Slugs registered by @mdit/plugin-anchor
     */
    markdownItAnchor?: MarkdownItAnchorEnv
  }
}

export type AnchorPluginOptions = AnchorOptions
export { anchorPlugin }
