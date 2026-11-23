import type { HeadConfig } from '@vuepress/shared'
import { expect, it } from 'vitest'

import { renderHead } from '../../src/index.js'

const TEST_CASES: [HeadConfig, string][] = [
  [['title', {}, 'vuepress site title'], `<title>vuepress site title</title>`],
  [
    [
      'base',
      {
        target: '_blank',
        href: 'https://vuepress.vuejs.org/',
      },
    ],
    `<base target="_blank" href="https://vuepress.vuejs.org/">`,
  ],
  [
    [
      'link',
      {
        href: '/path/to.css',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ],
    `<link href="/path/to.css" rel="stylesheet" type="text/css">`,
  ],
  [
    [
      'meta',
      {
        charset: 'utf-8',
      },
    ],
    `<meta charset="utf-8">`,
  ],
  [
    [
      'meta',
      {
        name: 'description',
        content: 'description content',
      },
    ],
    '<meta name="description" content="description content">',
  ],
  [
    ['style', {}, 'body: { color: red; }'],
    `<style>body: { color: red; }</style>`,
  ],
  [
    ['script', { src: '/path/to/module.js', type: 'module' }],
    `<script src="/path/to/module.js" type="module"></script>`,
  ],
  [
    ['script', { src: '/path/to/fallback.js', nomodule: true }],
    `<script src="/path/to/fallback.js" nomodule></script>`,
  ],
  [
    ['script', {}, `console.log('test')`],
    `<script>console.log('test')</script>`,
  ],
  [
    ['noscript', {}, `please enable javascript`],
    `<noscript>please enable javascript</noscript>`,
  ],
  [
    ['template', { id: 'template-id' }, `<div>foobar</div>`],
    `<template id="template-id"><div>foobar</div></template>`,
  ],
  [
    [
      'meta',
      {
        name: 'description',
        content: 'He said "hi" & left',
      },
    ],
    `<meta name="description" content="He said &quot;hi&quot; &amp; left">`,
  ],
  [['title', {}, `A & B < C > D`], `<title>A &amp; B &lt; C &gt; D</title>`],
  [
    ['title', {}, `x</title><script>alert(1)</script>`],
    `<title>x&lt;/title&gt;&lt;script&gt;alert(1)&lt;/script&gt;</title>`,
  ],
  [
    ['script', {}, `if (a < b && c > d) console.log('&')`],
    `<script>if (a < b && c > d) console.log('&')</script>`,
  ],
  [
    ['style', {}, `a > b { content: "x & y < z" }`],
    `<style>a > b { content: "x & y < z" }</style>`,
  ],
  [
    ['template', { id: 'template-id' }, `<div>a &amp; b</div>`],
    `<template id="template-id"><div>a &amp; b</div></template>`,
  ],
  [
    ['noscript', {}, `<p>please enable javascript & reload</p>`],
    `<noscript><p>please enable javascript & reload</p></noscript>`,
  ],
  [['title', {}, 123 as unknown as string], `<title>123</title>`],
  [
    ['meta', { name: 'description', content: 42 as unknown as string }],
    `<meta name="description" content="42">`,
  ],
]

TEST_CASES.forEach(([source, expected]) => {
  it(expected, () => {
    expect(renderHead(source)).toBe(expected)
  })
})
