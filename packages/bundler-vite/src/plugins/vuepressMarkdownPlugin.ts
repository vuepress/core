import type { App } from '@vuepress/core'
import { createPage, renderPageToVue } from '@vuepress/core'
import type { Plugin } from 'vite'

/**
 * Handle markdown transformation
 */
export const vuepressMarkdownPlugin = ({ app }: { app: App }): Plugin => ({
  name: 'vuepress:markdown',

  enforce: 'pre',

  async transform(code, id) {
    if (!id.endsWith('.md')) return

    // get the matched page by file path (id)
    const page = app.pagesMap[id]

    // if the page content is not changed, render it to vue component directly
    if (page?.content === code) {
      return renderPageToVue(page)
    }

    // create a new page with the new content
    const newPage = await createPage(app, {
      content: code,
      filePath: id,
    })
    return renderPageToVue(newPage)
  },

  async handleHotUpdate(ctx) {
    if (!ctx.file.endsWith('.md')) return

    // read the source code
    const code = await ctx.read()

    // create a new page with the new content
    const newPage = await createPage(app, {
      content: code,
      filePath: ctx.file,
    })

    ctx.read = () => renderPageToVue(newPage)
  },
})
