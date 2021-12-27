import { createMarkdown } from '@vuepress/markdown'
import type { Markdown } from '@vuepress/markdown'
import type { App } from '../types'

/**
 * Resolve markdown-it instance for vuepress app
 */
export const resolveAppMarkdown = async (app: App): Promise<Markdown> => {
  // plugin hook: extendsMarkdownOptions
  await app.pluginApi.hooks.extendsMarkdownOptions.process(
    app.options.markdown,
    app
  )

  const markdown = createMarkdown(app.options.markdown)

  // plugin hook: extendsMarkdown
  await app.pluginApi.hooks.extendsMarkdown.process(markdown, app)

  return markdown
}
