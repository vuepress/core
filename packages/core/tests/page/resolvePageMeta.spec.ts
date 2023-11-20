import { describe, expect, it } from 'vitest'
import { resolvePageMeta } from '../../src/index.js'

describe('core > page > resolvePageMeta', () => {
  it('should use frontmatter meta', () => {
    const meta = resolvePageMeta({
      frontmatter: {
        meta: {
          foo: 'foo',
        },
      },
    })

    expect(meta).toEqual({
      foo: 'foo',
    })
  })

  it('should return default value', () => {
    const meta = resolvePageMeta({
      frontmatter: {},
    })

    expect(meta).toEqual({})
  })
})
