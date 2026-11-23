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
  [
    {
      content: 'He said "hi"',
    },
    ` content="He said &quot;hi&quot;"`,
  ],
  [
    {
      content: 'a & b < c > d',
    },
    ` content="a &amp; b &lt; c &gt; d"`,
  ],
  [
    {
      'data-foo': 'a&amp;b"c<d>e',
    },
    ` data-foo="a&amp;amp;b&quot;c&lt;d&gt;e"`,
  ],
  [
    {
      disabled: false,
      foo: 'foo',
      async: true,
    },
    ` foo="foo" async`,
  ],
]

TEST_CASES.forEach(([source, expected]) => {
  it(JSON.stringify(source), () => {
    expect(renderHeadAttrs(source)).toBe(expected)
  })
})
