import { expect, it } from 'vitest'

import type { TemplateRendererContext } from '../../src/index.js'
import { templateRenderer } from '../../src/index.js'

const TEMPLATE = `\
<!DOCTYPE html>
<html lang="{{ lang }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="generator" content="VuePress {{ version }}">
    <!--vuepress-ssr-head-->
    <!--vuepress-ssr-styles-->
    <!--vuepress-ssr-preload-->
    <!--vuepress-ssr-prefetch-->
  </head>
  <body>
    <div id="app"><!--vuepress-ssr-content--></div>
    <!--vuepress-ssr-scripts-->
  </body>
</html>

`

const EXPECTED = `\
<!DOCTYPE html>
<html lang="#lang#">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="generator" content="VuePress #version#">
    #head#
    #styles#
    #preload#
    #prefetch#
  </head>
  <body>
    <div id="app">#content#</div>
    #scripts#
  </body>
</html>

`

const context: TemplateRendererContext = {
  content: '#content#',
  head: '#head#',
  lang: '#lang#',
  prefetch: '#prefetch#',
  preload: '#preload#',
  scripts: '#scripts#',
  styles: '#styles#',
  version: '#version#',
}

it('should fill template outlets correctly', () => {
  const result = templateRenderer(TEMPLATE, context)

  expect(result).toBe(EXPECTED)
})

it('should not replace the outlets inside the rendered values', () => {
  const result = templateRenderer(TEMPLATE, {
    ...context,
    content: 'content<!--vuepress-ssr-scripts-->{{ lang }}',
    scripts: 'scripts<!--vuepress-ssr-content-->',
  })

  expect(result).toBe(
    EXPECTED.replace(
      '#content#',
      'content<!--vuepress-ssr-scripts-->{{ lang }}',
    ).replace('#scripts#', 'scripts<!--vuepress-ssr-content-->'),
  )
})

it('should replace every occurrence of the same outlet', () => {
  const result = templateRenderer(
    '{{ lang }}|{{ lang }}|{{ version }}|{{ version }}',
    {
      ...context,
      lang: '$&',
      version: '$1',
    },
  )

  expect(result).toBe('$&|$&|$1|$1')
})

it('should keep `$&` and `$1` in the rendered values as-is', () => {
  const result = templateRenderer(TEMPLATE, {
    ...context,
    content: '$&',
    head: '$1',
    lang: '$`',
    prefetch: `$'`,
    preload: '$$',
    scripts: '$<name>',
    styles: '$&$1',
    version: '$`$1',
  })

  expect(result).toBe(
    EXPECTED.replace('#content#', () => '$&')
      .replace('#head#', () => '$1')
      .replace('#lang#', () => '$`')
      .replace('#prefetch#', () => `$'`)
      .replace('#preload#', () => '$$')
      .replace('#scripts#', () => '$<name>')
      .replace('#styles#', () => '$&$1')
      .replace('#version#', () => '$`$1'),
  )
})

it('should keep the outlets without corresponding values as-is', () => {
  const result = templateRenderer(
    '<!--vuepress-ssr-prefetch-->|{{ version }}|<!--vuepress-ssr-content-->',
    {
      ...context,
      prefetch: undefined,
      version: undefined,
    } as unknown as TemplateRendererContext,
  )

  expect(result).toBe('<!--vuepress-ssr-prefetch-->|{{ version }}|#content#')
})
