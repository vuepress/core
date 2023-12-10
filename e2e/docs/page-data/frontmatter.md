---
str: str
num: 1
bool: true
arr:
  - 1
  - 2
  - 3
obj:
  foo: bar
  baz: qux
---

{{ JSON.stringify($frontmatter) }}
