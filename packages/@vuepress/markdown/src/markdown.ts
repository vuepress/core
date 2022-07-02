import { slugify as defaultSlugify } from '@mdit-vue/shared'
import * as MarkdownIt from 'markdown-it'
import {
  anchorPlugin,
  assetsPlugin,
  codePlugin,
  componentPlugin,
  emojiPlugin,
  headersPlugin,
  importCodePlugin,
  linksPlugin,
  sfcPlugin,
  titlePlugin,
  tocPlugin,
} from './plugins'
import type {
  AnchorPluginOptions,
  AssetsPluginOptions,
  CodePluginOptions,
  EmojiPluginOptions,
  HeadersPluginOptions,
  ImportCodePluginOptions,
  LinksPluginOptions,
  SfcPluginOptions,
  TocPluginOptions,
} from './plugins'
import type { Markdown, MarkdownOptions } from './types'

/**
 * Create vuepress customized markdown-it instance
 */
export const createMarkdown = ({
  anchor,
  assets,
  code,
  component,
  emoji,
  headers,
  title,
  importCode,
  links,
  sfc,
  slugify = defaultSlugify,
  toc,
  ...markdownItOptions
}: MarkdownOptions = {}): Markdown => {
  // create raw markdown-it instance
  const md = MarkdownIt({
    ...markdownItOptions,
    // should always enable html option
    html: true,
  })

  // =====================================================
  // following plugins push rules to the end of chain, so
  // the order to use them is important

  // parse emoji
  if (emoji !== false) {
    md.use<EmojiPluginOptions>(emojiPlugin, emoji)
  }

  // add anchor to headers
  if (anchor !== false) {
    md.use<AnchorPluginOptions>(anchorPlugin, {
      level: [1, 2, 3, 4, 5, 6],
      slugify,
      permalink: anchorPlugin.permalink.ariaHidden({
        class: 'header-anchor',
        symbol: '#',
        space: true,
        placement: 'before',
      }),
      ...anchor,
    })
  }

  // allow toc syntax
  if (toc !== false) {
    md.use<TocPluginOptions>(tocPlugin, {
      level: [2, 3],
      slugify,
      linkTag: 'router-link',
      ...toc,
    })
  }

  // extract headers into env
  if (headers !== false) {
    md.use<HeadersPluginOptions>(headersPlugin, {
      level: [2, 3],
      slugify,
      ...headers,
    })
  }

  // extract title into env
  if (title !== false) {
    md.use(titlePlugin)
  }

  // =====================================================
  // following plugins modify or replace the rule in place
  // and have no conflicts, so the order is not important

  // treat unknown html tags as components
  if (component !== false) {
    md.use(componentPlugin)
  }

  // replace relative link of assets with absolute link
  if (assets !== false) {
    md.use<AssetsPluginOptions>(assetsPlugin, assets)
  }

  // extract vue SFC blocks into env
  if (sfc !== false) {
    md.use<SfcPluginOptions>(sfcPlugin, sfc)
  }

  // process external and internal links
  if (links !== false) {
    md.use<LinksPluginOptions>(linksPlugin, links)
  }

  // process code fence
  if (code !== false) {
    md.use<CodePluginOptions>(codePlugin, code)
  }

  // handle import_code syntax
  if (importCode !== false) {
    md.use<ImportCodePluginOptions>(importCodePlugin, importCode)
  }

  return md
}
