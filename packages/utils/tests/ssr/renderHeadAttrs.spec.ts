import type { HeadAttrsConfig } from '@vuepress/shared'
import { expect, it } from 'vitest'
import { renderHeadAttrs } from '../../src/index.js'

const TEST_CASES: [HeadAttrsConfig, string][] = [
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

TEST_CASES.forEach(([source, expected]) => {
  it(JSON.stringify(source), () => {
    expect(renderHeadAttrs(source)).toBe(expected)
  })
})
