import { expect, it } from 'vitest'
import { resolvePageRouteMeta } from '../../src/index.js'

it('should use frontmatter routeMeta', () => {
  const routeMeta = resolvePageRouteMeta({
    frontmatter: {
      routeMeta: {
        foo: 'foo',
      },
    },
  })

  expect(routeMeta).toEqual({
    foo: 'foo',
  })
})

it('should return default value', () => {
  const routeMeta = resolvePageRouteMeta({
    frontmatter: {},
  })

  expect(routeMeta).toEqual({})
})
