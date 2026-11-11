import type { PageFrontmatter } from '@vuepress/shared'
import type { Env } from 'markdown-it'
import { expectTypeOf, test } from 'vitest'

import type {
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
