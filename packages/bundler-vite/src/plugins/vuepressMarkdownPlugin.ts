import type { App } from '@vuepress/core'
import { parsePageContent, renderPageSfcBlocksToVue } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { Plugin } from 'vite'

/**
 * Handle markdown transformation
 */
export const vuepressMarkdownPlugin = ({ app }: { app: App }): Plugin => ({
  name: 'vuepress:markdown',

  enforce: 'pre',

  transform(code, id) {
    if (!id.endsWith('.md')) return

    // get the matched page by file path (id)
    const page = app.pagesMap[id]

    // if the page content is not changed, render it to vue component directly
    if (page?.content === code) {
      return renderPageSfcBlocksToVue(page.sfcBlocks)
    }

    // parse the markdown content to sfc blocks and render it to vue component
    const { sfcBlocks } = parsePageContent({
      app,
      content: code,
      filePath: id,
      filePathRelative: path.relative(app.dir.source(), id),
      options: {},
    })
    return renderPageSfcBlocksToVue(sfcBlocks)
  },

  async handleHotUpdate(ctx) {
    if (!ctx.file.endsWith('.md')) return

    // read the source code
    const code = await ctx.read()

    // parse the content to sfc blocks
    const { sfcBlocks } = parsePageContent({
      app,
      content: code,
      filePath: ctx.file,
      filePathRelative: path.relative(app.dir.source(), ctx.file),
      options: {},
    })

    ctx.read = () => renderPageSfcBlocksToVue(sfcBlocks)
  },
})
