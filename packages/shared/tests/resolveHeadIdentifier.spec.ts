import { describe, expect, it } from 'vitest'
import { resolveHeadIdentifier } from '../src/index.js'
import type { HeadConfig } from '../src/index.js'

describe('shared > resolveHeadIdentifier', () => {
  it('should resolve same identifiers of <title>', () => {
    const titleFoo = resolveHeadIdentifier(['title', {}, 'title foo'])
    const titleBar = resolveHeadIdentifier(['title', {}, 'title bar'])
    expect(titleFoo).toBe(titleBar)
  })

  it('should resolve same identifiers of <base>', () => {
    const baseFoo = resolveHeadIdentifier([
      'base',
      { href: 'https://vuepress.vuejs.org' },
    ])
    const baseBar = resolveHeadIdentifier([
      'base',
      { href: 'https://vuepress.github.io' },
    ])
    expect(baseFoo).toBe(baseBar)
  })

  it('should resolve same identifiers of <meta> with same name', () => {
    const metaFooBar = resolveHeadIdentifier([
      'meta',
      { name: 'foo', content: 'bar' },
    ])
    const metaFooBaz = resolveHeadIdentifier([
      'meta',
      { name: 'foo', content: 'baz' },
    ])
    const metaBarBar = resolveHeadIdentifier([
      'meta',
      { name: 'bar', content: 'bar' },
    ])
    expect(metaFooBar).toBe(metaFooBaz)
    expect(metaFooBar).not.toBe(metaBarBar)
    expect(metaFooBaz).not.toBe(metaBarBar)
  })

  it('should resolve same identifiers of <template> with same id', () => {
    const templateFooBar = resolveHeadIdentifier([
      'template',
      { id: 'foo' },
      'bar',
    ])
    const templateFooBaz = resolveHeadIdentifier([
      'template',
      { id: 'foo' },
      'baz',
    ])
    const templateBarBar = resolveHeadIdentifier([
      'template',
      { id: 'bar' },
      'bar',
    ])
    expect(templateFooBar).toBe(templateFooBaz)
    expect(templateFooBar).not.toBe(templateBarBar)
    expect(templateFooBaz).not.toBe(templateBarBar)
  })

  it('should resolve same identifiers of same HeadConfig', () => {
    const style1 = resolveHeadIdentifier([
      'style',
      { id: 'foo' },
      `body { color: red; }`,
    ])
    const style2 = resolveHeadIdentifier([
      'style',
      { id: 'foo' },
      `body { color: red; }`,
    ])
    const link1 = resolveHeadIdentifier([
      'link',
      { href: 'https://example.com', defer: '' },
    ])
    const link2 = resolveHeadIdentifier([
      'link',
      { href: 'https://example.com', defer: true },
    ])
    const link3 = resolveHeadIdentifier([
      'link',
      { defer: '', href: 'https://example.com' },
    ])
    const link4 = resolveHeadIdentifier([
      'link',
      { defer: true, href: 'https://example.com' },
    ])
    const link5 = resolveHeadIdentifier([
      'link',
      { href: 'https://example.com' },
    ])
    const link6 = resolveHeadIdentifier([
      'link',
      { href: 'https://example.com', defer: false },
    ])
    const link7 = resolveHeadIdentifier([
      'link',
      { defer: false, href: 'https://example.com' },
    ])

    expect(style1).toBe(style2)
    expect(link1).toBe(link2)
    expect(link1).toBe(link3)
    expect(link1).toBe(link4)
    expect(link5).toBe(link6)
    expect(link5).toBe(link7)
  })

  it('should resolve identifiers correctly', () => {
    const head: HeadConfig[] = [
      // 1
      ['title', {}, 'foo'],
      ['title', {}, 'bar'],
      // 1
      ['base', { href: 'foo' }],
      ['base', { href: 'bar' }],
      // 2
      ['meta', { name: 'foo', content: 'foo' }],
      ['meta', { name: 'foo', content: 'bar' }],
      ['meta', { name: 'bar', content: 'bar' }],
      // 2
      ['template', { id: 'foo' }, 'foo'],
      ['template', { id: 'foo' }, 'bar'],
      ['template', { id: 'bar' }, 'bar'],
      // 3
      ['script', { src: 'foo' }],
      ['script', { src: 'foo' }],
      ['script', { src: 'bar' }],
      ['script', { src: 'bar', async: true }],
      // 2
      ['noscript', {}, 'foo'],
      ['noscript', {}, 'foo'],
      ['noscript', {}, 'bar'],
      // 3
      ['link', { rel: 'icon', href: 'foo.ico' }],
      ['link', { rel: 'icon', href: 'foo.ico' }],
      ['link', { rel: 'stylesheet', href: 'foo.css' }],
      ['link', { rel: 'canonical', href: 'foo' }],
      // 2
      ['style', { type: 'text/css' }, 'body { color: red; }'],
      ['style', { type: 'text/css' }, 'body { color: red; }'],
      ['style', { type: 'text/css' }, 'body { color: white; }'],
    ]

    const identifiers = head.map((item) => resolveHeadIdentifier(item))
    const filtered = [...new Set(identifiers)]

    expect(filtered).toHaveLength(1 + 1 + 2 + 2 + 3 + 2 + 3 + 2)
  })
})
