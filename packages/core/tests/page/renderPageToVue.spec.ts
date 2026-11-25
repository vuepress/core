import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { parse } from 'vue/compiler-sfc'

import type { App, Bundler, Page } from '../../src/index.js'
import { createBaseApp, renderPageToVue } from '../../src/index.js'

const createTestApp = ({ isDev = false } = {}): App => {
  const app = createBaseApp({
    source: path.resolve(__dirname, 'fake-source'),
    theme: { name: 'test' },
    bundler: {} as Bundler,
  })
  app.env.isDev = isDev
  app.env.isBuild = !isDev
  return app
}

const createTestPage = (partial: Partial<Page> = {}): Page =>
  ({
    chunkFilePath: 'foo.html.js',
    data: {
      path: '/foo.html',
      title: 'Foo',
      lang: 'en-US',
      frontmatter: {},
    },
    sfcBlocks: {
      template: {
        type: 'template',
        content: '<template><p>foobar</p>\n</template>',
        contentStripped: '<p>foobar</p>\n',
        tagClose: '</template>',
        tagOpen: '<template>',
      },
      script: null,
      scriptSetup: null,
      scripts: [],
      styles: [],
      customBlocks: [],
    },
    ...partial,
  }) as Page

const createTestPageWithPageData = (
  partialData: Record<string, unknown> = {},
): Page => {
  const page = createTestPage()
  page.data = { ...page.data, ...partialData }
  return page
}

const PAGE_DATA_JSON_REGEX = /JSON\.parse\(("(?:[^"\\]|\\.)*")\)/

const extractPageData = (vue: string): Page['data'] => {
  const literal = vue.match(PAGE_DATA_JSON_REGEX)?.[1]
  if (!literal) {
    throw new Error('page data code not found in generated vue file')
  }
  // first parse the JS string literal, then parse the serialized page data
  return JSON.parse(JSON.parse(literal) as string) as Page['data']
}

describe('renderPageToVue', () => {
  it('should render basic page with template and no script block', () => {
    const app = createTestApp()
    const page = createTestPage()
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should render page without template block', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: null,
        script: null,
        scriptSetup: null,
        scripts: [],
        styles: [],
        customBlocks: [],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should preserve existing script block with default export', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: null,
        script: {
          type: 'script',
          content:
            '<script>\nexport default { data() { return {} } }\n</script>',
          contentStripped: '\nexport default { data() { return {} } }\n',
          tagClose: '</script>',
          tagOpen: '<script>',
        },
        scriptSetup: null,
        scripts: [],
        styles: [],
        customBlocks: [],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should preserve existing script block with named default export', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: null,
        script: {
          type: 'script',
          content: '<script>\nexport { foo as default }\n</script>',
          contentStripped: '\nexport { foo as default }\n',
          tagClose: '</script>',
          tagOpen: '<script>',
        },
        scriptSetup: null,
        scripts: [],
        styles: [],
        customBlocks: [],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should use existing script tag open when script block exists', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: null,
        script: {
          type: 'script',
          content: '<script lang="ts">\nconst foo = 1\n</script>',
          contentStripped: '\nconst foo = 1\n',
          tagClose: '</script>',
          tagOpen: '<script lang="ts">',
        },
        scriptSetup: null,
        scripts: [],
        styles: [],
        customBlocks: [],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should use <script lang="ts"> when scriptSetup uses typescript', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: null,
        script: null,
        scriptSetup: {
          type: 'script',
          content: '<script setup lang="ts">\nconst msg = "hello"\n</script>',
          contentStripped: '\nconst msg = "hello"\n',
          tagClose: '</script>',
          tagOpen: '<script setup lang="ts">',
        },
        scripts: [],
        styles: [],
        customBlocks: [],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should inject HMR code in dev mode', () => {
    const app = createTestApp({ isDev: true })
    const page = createTestPage()
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should include scriptSetup content', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: {
          type: 'template',
          content: '<template><p>hello</p></template>',
          contentStripped: '<p>hello</p>',
          tagClose: '</template>',
          tagOpen: '<template>',
        },
        script: null,
        scriptSetup: {
          type: 'script',
          content: '<script setup>\nconst msg = "hello"\n</script>',
          contentStripped: '\nconst msg = "hello"\n',
          tagClose: '</script>',
          tagOpen: '<script setup>',
        },
        scripts: [],
        styles: [],
        customBlocks: [],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should include style blocks', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: null,
        script: null,
        scriptSetup: null,
        scripts: [],
        styles: [
          {
            type: 'style',
            content: '<style scoped>\n.foo { color: red; }\n</style>',
            contentStripped: '\n.foo { color: red; }\n',
            tagClose: '</style>',
            tagOpen: '<style scoped>',
          },
        ],
        customBlocks: [],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should include custom blocks', () => {
    const app = createTestApp()
    const page = createTestPage({
      sfcBlocks: {
        template: null,
        script: null,
        scriptSetup: null,
        scripts: [],
        styles: [],
        customBlocks: [
          {
            type: 'i18n',
            content: '<i18n>\n{"en": {"hello": "Hello"}}\n</i18n>',
            contentStripped: '\n{"en": {"hello": "Hello"}}\n',
            tagClose: '</i18n>',
            tagOpen: '<i18n>',
          },
        ],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should render a complete vue SFC with all blocks in dev mode', () => {
    const app = createTestApp({ isDev: true })
    const page = createTestPage({
      sfcBlocks: {
        template: {
          type: 'template',
          content: '<template><p>hello</p></template>',
          contentStripped: '<p>hello</p>',
          tagClose: '</template>',
          tagOpen: '<template>',
        },
        script: null,
        scriptSetup: {
          type: 'script',
          content: '<script setup lang="ts">\nconst msg = "hello"\n</script>',
          contentStripped: '\nconst msg = "hello"\n',
          tagClose: '</script>',
          tagOpen: '<script setup lang="ts">',
        },
        scripts: [],
        styles: [
          {
            type: 'style',
            content: '<style>.foo { color: red; }</style>',
            contentStripped: '.foo { color: red; }',
            tagClose: '</style>',
            tagOpen: '<style>',
          },
        ],
        customBlocks: [
          {
            type: 'i18n',
            content: '<i18n>{"en": {}}</i18n>',
            contentStripped: '{"en": {}}',
            tagClose: '</i18n>',
            tagOpen: '<i18n>',
          },
        ],
      },
    })
    const result = renderPageToVue(app, page)

    expect(result).toMatchSnapshot()
  })

  it('should generate a parseable SFC when page data contains script tags', () => {
    const title = '</script><script>alert(1)</script>'
    const page = createTestPageWithPageData({ title })
    const result = renderPageToVue(createTestApp(), page)

    const { errors } = parse(result, { filename: 'foo.html.vue' })

    expect(errors).toEqual([])
    expect(result.match(/<\/script/gi)).toHaveLength(1)
  })

  it('should round-trip page data unchanged after escaping', () => {
    const title = '</script><script>alert(1)</script>'
    const page = createTestPageWithPageData({ title })
    const result = renderPageToVue(createTestApp(), page)
    const pageData = extractPageData(result)

    expect(pageData).toEqual(page.data)
    expect(pageData.title).toBe(title)
    expect(pageData.title).toContain('</script>')
    expect(result).not.toContain(title)
  })

  it('should escape edge cases of `<` in page data', () => {
    const edgeCases = [
      '<script>',
      '</script>',
      '<!--',
      '-->',
      'a < b',
      '<',
      '<<',
      '</SCRIPT >',
      '< /script>',
      '</script><script>alert(1)</script>',
    ]

    for (const title of edgeCases) {
      const page = createTestPageWithPageData({ title })
      const result = renderPageToVue(createTestApp(), page)
      const pageData = extractPageData(result)
      const pageDataJson = result.match(PAGE_DATA_JSON_REGEX)?.[1]

      expect(pageData.title).toBe(title)
      expect(pageDataJson).toBeDefined()
      expect(pageDataJson).not.toContain('<')
      expect(parse(result, { filename: 'foo.html.vue' }).errors).toEqual([])
    }
  })

  it('should escape every `<` in the serialized page data', () => {
    const title = '</script><script>alert(1)</script><!-- comment -->'
    const page = createTestPageWithPageData({ title })
    const result = renderPageToVue(createTestApp(), page)
    const pageDataJson = result.match(PAGE_DATA_JSON_REGEX)?.[1]

    expect(pageDataJson).toBeDefined()
    expect(pageDataJson).not.toContain('<')
    expect(JSON.parse(pageDataJson as string)).not.toContain('<')
  })
})
