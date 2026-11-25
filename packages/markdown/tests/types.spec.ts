import type { AnchorEnv, AnchorOptions } from '@mdit/plugin-anchor'
import type { PageFrontmatter } from '@vuepress/shared'
import type { Env } from 'markdown-it'
import { expectTypeOf, test } from 'vitest'

import type {
  AnchorPluginOptions,
  MarkdownEnv,
  MarkdownItAnchorEnv,
  MarkdownLink,
} from '../src/index.js'

test('should augment markdown-it env', () => {
  expectTypeOf<MarkdownEnv>().toExtend<Env>()
  expectTypeOf<MarkdownEnv['frontmatter']>().toEqualTypeOf<
    PageFrontmatter | undefined
  >()
  expectTypeOf<Env['base']>().toEqualTypeOf<string | undefined>()
  expectTypeOf<Env['links']>().toEqualTypeOf<MarkdownLink[] | undefined>()
  expectTypeOf<Env['markdownItAnchor']>().toEqualTypeOf<
    MarkdownItAnchorEnv | undefined
  >()
})

test('should expose the anchor types of @mdit/plugin-anchor', () => {
  expectTypeOf<MarkdownItAnchorEnv>().toEqualTypeOf<AnchorEnv>()
  expectTypeOf<AnchorPluginOptions>().toEqualTypeOf<AnchorOptions>()
})
