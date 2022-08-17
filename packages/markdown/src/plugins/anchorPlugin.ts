import anchorPlugin from 'markdown-it-anchor'

// @ts-expect-error: types error with markdown-it-anchor
export type AnchorPluginOptions = anchorPlugin.AnchorOptions
export { anchorPlugin }
