import type { HeadAttrsConfig } from '@vuepress/shared'
import { describe, expect, it } from 'vitest'
import { renderHeadAttrs } from '../src/index.js'

const testCases: [HeadAttrsConfig, string][] = [
  [
    {
      foo: 'foo',
    },
    ` foo="foo"`,
  ],
  [
    {
      'foo': 'foo',
      'foo-bar': 'foo-bar',
    },
    ` foo="foo" foo-bar="foo-bar"`,
  ],
]

describe('utils > renderHeadAttrs', () => {
  describe('should render head attrs config correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), () => {
        expect(renderHeadAttrs(source)).toBe(expected)
      })
    })
  })
})
