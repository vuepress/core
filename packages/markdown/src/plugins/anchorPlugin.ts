import type { MarkdownItPlugin } from '@mdit-vue/types'
import type { AnchorEnv, AnchorOptions } from '@mdit/plugin-anchor'
import { anchor } from '@mdit/plugin-anchor'

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

export const anchorPlugin: MarkdownItPlugin<Partial<AnchorPluginOptions>> =
  anchor
