import { describe, expect, it } from 'vitest'
import { inferRoutePath } from '../src/index.js'

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
