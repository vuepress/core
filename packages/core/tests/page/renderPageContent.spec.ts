import { createMarkdown } from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { createBaseApp, renderPageContent } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})
app.markdown = createMarkdown()

describe('core > page > renderPageContent', () => {
  it('should render page content correctly', () => {
    const resolved = renderPageContent({
      app,
      content: `\
foobar
<script setup lang="ts">
const msg = 'msg'
</script>
`,
      filePath: app.dir.source('foo.md'),
      filePathRelative: 'foo.md',
      options: {},
    })

    expect(resolved).toEqual({
      contentRendered: '<p>foobar</p>\n',
      deps: [],
      frontmatter: {},
      headers: [],
      links: [],
      markdownEnv: { excerpt: '' },
      sfcBlocks: {
        template: {
          type: 'template',
          content: '<template><p>foobar</p>\n</template>',
          contentStripped: '<p>foobar</p>\n',
          tagClose: '</template>',
          tagOpen: '<template>',
        },
        script: null,
        scriptSetup: {
          type: 'script',
          content: `<script setup lang="ts">\nconst msg = 'msg'\n</script>`,
          contentStripped: `\nconst msg = 'msg'\n`,
          tagClose: '</script>',
          tagOpen: '<script setup lang="ts">',
        },
        scripts: [
          {
            type: 'script',
            content: `<script setup lang="ts">\nconst msg = 'msg'\n</script>`,
            contentStripped: `\nconst msg = 'msg'\n`,
            tagClose: '</script>',
            tagOpen: '<script setup lang="ts">',
          },
        ],
        styles: [],
        customBlocks: [],
      },
      title: '',
    })
  })

  describe('page title', () => {
    it('should use title in frontmatter', () => {
      const resolved = renderPageContent({
        app,
        content: '# title in header',
        filePath: null,
        filePathRelative: null,
        options: {
          frontmatter: {
            title: 'title in frontmatter',
          },
        },
      })

      expect(resolved.title).toEqual('title in frontmatter')
    })

    it('should use title in the first h1 header', () => {
      const resolved = renderPageContent({
        app,
        content: '# title in header',
        filePath: null,
        filePathRelative: null,
        options: {},
      })

      expect(resolved.title).toEqual('title in header')
    })

    it('should use empty title', () => {
      const resolved = renderPageContent({
        app,
        content: '',
        filePath: null,
        filePathRelative: null,
        options: {},
      })

      expect(resolved.title).toEqual('')
    })
  })

  describe('page frontmatter', () => {
    it('should merge markdown frontmatter and options frontmatter', () => {
      const resolved = renderPageContent({
        app,
        content: `\
---
title: title in markdown frontmatter
---
`,
        filePath: null,
        filePathRelative: null,
        options: {
          frontmatter: {
            description: 'description in options frontmatter',
          },
        },
      })

      expect(resolved.frontmatter).toEqual({
        title: 'title in markdown frontmatter',
        description: 'description in options frontmatter',
      })
    })

    it('should use fields from markdown frontmatter first', () => {
      const resolved = renderPageContent({
        app,
        content: `\
---
title: title in markdown frontmatter
---
`,
        filePath: null,
        filePathRelative: null,
        options: {
          frontmatter: {
            title: 'title in options frontmatter',
          },
        },
      })

      expect(resolved.frontmatter).toEqual({
        title: 'title in markdown frontmatter',
      })
    })
  })
})
