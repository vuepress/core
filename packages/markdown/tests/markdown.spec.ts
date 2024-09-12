import { expect, it } from 'vitest'
import { createMarkdown } from '../src/index.js'

const md = createMarkdown()

it('should render anchors', () => {
  const rendered = md.render(`\
# h1
## h2
### h3
`)
  expect(rendered).toEqual(
    [
      '<h1 id="h1" tabindex="-1"><a class="header-anchor" href="#h1"><span>h1</span></a></h1>',
      '<h2 id="h2" tabindex="-1"><a class="header-anchor" href="#h2"><span>h2</span></a></h2>',
      '<h3 id="h3" tabindex="-1"><a class="header-anchor" href="#h3"><span>h3</span></a></h3>',
    ].join('\n') + '\n',
  )
})

it('should parse emoji', () => {
  const rendered = md.render(':smile:')
  expect(rendered).toBe('<p>😄</p>\n')
})
