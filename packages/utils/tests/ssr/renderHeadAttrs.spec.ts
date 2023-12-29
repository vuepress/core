import type { HeadAttrsConfig } from '@vuepress/shared'
import { expect, it } from 'vitest'
import { renderHeadAttrs } from '../../src/index.js'

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

testCases.forEach(([source, expected]) => {
  it(JSON.stringify(source), () => {
    expect(renderHeadAttrs(source)).toBe(expected)
  })
})
