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
