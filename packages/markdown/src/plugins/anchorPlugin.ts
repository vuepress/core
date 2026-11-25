import anchorPlugin from 'markdown-it-anchor'

export interface MarkdownItAnchorEnv {
  slugs: Record<string, true>
}

declare module 'markdown-it' {
  interface Env {
    /**
     * Slugs registered by markdown-it-anchor
     */
    markdownItAnchor?: MarkdownItAnchorEnv
  }
}

export type AnchorPluginOptions = anchorPlugin.AnchorOptions
export { anchorPlugin }
