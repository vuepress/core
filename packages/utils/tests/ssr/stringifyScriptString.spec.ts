import { expect, test } from 'vitest'

import { stringifyScriptString } from '../../src/index.js'

test.for([
  '',
  'a < b << c',
  '<!-- comment --><script></ScRiPt>',
  '"VuePress"\nC:\\docs\\首页',
  '\\u003c and <',
])('should serialize %j as an inline script string', (value) => {
  const literal = stringifyScriptString(value)

  expect(literal).not.toContain('<')
  expect(JSON.parse(literal)).toBe(value)
})
