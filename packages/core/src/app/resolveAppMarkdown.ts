import type { Markdown } from '@vuepress/markdown'
import { createMarkdown } from '@vuepress/markdown'
import type { App } from '../types/index.js'

/**
 * Resolve markdown-it instance for vuepress app
 *
 * @internal
 */
export const resolveAppMarkdown = async (app: App): Promise<Markdown> => {
  app.options.markdown.links ??= {}

  // links plugin is not disabled
  if (app.options.markdown.links !== false) {
    // set the cleanUrl option
    app.options.markdown.links.cleanUrl = app.options.route.cleanUrl
  }

  // plugin hook: extendsMarkdownOptions
  await app.pluginApi.hooks.extendsMarkdownOptions.process(
    app.options.markdown,
    app,
  )

  const markdown = createMarkdown(app.options.markdown)

  // plugin hook: extendsMarkdown
  await app.pluginApi.hooks.extendsMarkdown.process(markdown, app)

  return markdown
}
