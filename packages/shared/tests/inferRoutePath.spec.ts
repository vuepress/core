import { describe, expect, it } from 'vitest'
import { inferRouteLink, inferRoutePath } from '../src/index.js'

describe('inferRoutePath', () => {
  it('Should handle .md files', () => {
    expect(inferRoutePath('/path/to/file.md')).toBe('/path/to/file.html')
    expect(inferRoutePath('/path/to/file')).toBe('/path/to/file.html')
    expect(inferRoutePath('/file.md')).toBe('/file.html')
    expect(inferRoutePath('/file')).toBe('/file.html')
  })

  it('Should handle README.md and index.md', () => {
    expect(inferRoutePath('/path/to/README.md')).toBe('/path/to/')
    expect(inferRoutePath('/path/to/readme.md')).toBe('/path/to/')
    expect(inferRoutePath('/path/to/index.md')).toBe('/path/to/')
    expect(inferRoutePath('/path/to/README')).toBe('/path/to/')
    expect(inferRoutePath('/path/to/readme')).toBe('/path/to/')
    expect(inferRoutePath('/path/to/index')).toBe('/path/to/')
    expect(inferRoutePath('/README.md')).toBe('/')
    expect(inferRoutePath('/readme.md')).toBe('/')
    expect(inferRoutePath('/index.md')).toBe('/')

    expect(inferRoutePath('/README')).toBe('/')
    expect(inferRoutePath('/readme')).toBe('/')
    expect(inferRoutePath('/index')).toBe('/')
  })

  it('Should preserve html', () => {
    expect(inferRoutePath('/path/to/file.html')).toBe('/path/to/file.html')
    expect(inferRoutePath('/file.html')).toBe('/file.html')
  })

  it('Should preserve trailing slash', () => {
    expect(inferRoutePath('/path/to/')).toBe('/path/to/')
    expect(inferRoutePath('/')).toBe('/')
  })
})

describe('inferRouteLink', () => {
  it('Should handle hash', () => {
    expect(inferRouteLink('#')).toBe('#')
    expect(inferRouteLink('#a')).toBe('#a')
  })

  it('Should handle .md files', () => {
    expect(inferRouteLink('/path/to/file.md')).toBe('/path/to/file.html')
    expect(inferRouteLink('/path/to/file')).toBe('/path/to/file.html')
    expect(inferRouteLink('/file.md')).toBe('/file.html')
    expect(inferRouteLink('/file')).toBe('/file.html')
    expect(inferRouteLink('/path/to/file.md#a')).toBe('/path/to/file.html#a')
    expect(inferRouteLink('/path/to/file#a')).toBe('/path/to/file.html#a')
    expect(inferRouteLink('/file.md#a')).toBe('/file.html#a')
    expect(inferRouteLink('/file#a')).toBe('/file.html#a')
  })

  it('Should handle README.md and index.md', () => {
    expect(inferRouteLink('/path/to/README.md')).toBe('/path/to/')
    expect(inferRouteLink('/path/to/readme.md')).toBe('/path/to/')
    expect(inferRouteLink('/path/to/index.md')).toBe('/path/to/')
    expect(inferRouteLink('/path/to/README')).toBe('/path/to/')
    expect(inferRouteLink('/path/to/readme')).toBe('/path/to/')
    expect(inferRouteLink('/path/to/index')).toBe('/path/to/')
    expect(inferRouteLink('/README.md')).toBe('/')
    expect(inferRouteLink('/readme.md')).toBe('/')
    expect(inferRouteLink('/index.md')).toBe('/')

    expect(inferRouteLink('/README')).toBe('/')
    expect(inferRouteLink('/readme')).toBe('/')
    expect(inferRouteLink('/index')).toBe('/')

    expect(inferRouteLink('/path/to/README.md#a')).toBe('/path/to/#a')
    expect(inferRouteLink('/path/to/readme.md#a')).toBe('/path/to/#a')
    expect(inferRouteLink('/path/to/index.md#a')).toBe('/path/to/#a')
    expect(inferRouteLink('/path/to/README#a')).toBe('/path/to/#a')
    expect(inferRouteLink('/path/to/readme#a')).toBe('/path/to/#a')
    expect(inferRouteLink('/path/to/index#a')).toBe('/path/to/#a')
    expect(inferRouteLink('/README.md#a')).toBe('/#a')
    expect(inferRouteLink('/readme.md#a')).toBe('/#a')
    expect(inferRouteLink('/index.md#a')).toBe('/#a')

    expect(inferRouteLink('/README#a')).toBe('/#a')
    expect(inferRouteLink('/readme#a')).toBe('/#a')
    expect(inferRouteLink('/index#a')).toBe('/#a')
  })

  it('Should preserve html', () => {
    expect(inferRouteLink('/path/to/file.html')).toBe('/path/to/file.html')
    expect(inferRouteLink('/file.html')).toBe('/file.html')
    expect(inferRouteLink('/path/to/file.html#a')).toBe('/path/to/file.html#a')
    expect(inferRouteLink('/file.html#a')).toBe('/file.html#a')
  })

  it('Should preserve trailing slash', () => {
    expect(inferRouteLink('/path/to/')).toBe('/path/to/')
    expect(inferRouteLink('/')).toBe('/')
    expect(inferRouteLink('/path/to/#a')).toBe('/path/to/#a')
    expect(inferRouteLink('/#a')).toBe('/#a')
  })
})
