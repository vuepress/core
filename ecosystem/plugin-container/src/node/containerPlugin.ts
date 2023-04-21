import type { Plugin, PluginObject } from '@vuepress/core'
import type { MarkdownEnv } from '@vuepress/markdown'
import type { LocaleConfig } from '@vuepress/shared'
import { ensureLeadingSlash, resolveLocalePath } from '@vuepress/shared'
import { colors, logger } from '@vuepress/utils'
import type Renderer from 'markdown-it/lib/renderer.js'
import type Token from 'markdown-it/lib/token.js'
import container from 'markdown-it-container'

/**
 * Options for markdown-it-container
 */
export interface MarkdownItContainerOptions {
  /**
   * The marker of the container syntax
   *
   * @default ':'
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  marker?: string

  /**
   * Renderer function for opening / closing tokens
   *
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  render?: MarkdownItContainerRenderFunction

  /**
   * Function to validate tail after opening marker, should return `true` on success
   */
  validate?: (params: string) => boolean
}

export type MarkdownItContainerRenderFunction = (
  tokens: Token[],
  index: number,
  options: any,
  env: MarkdownEnv,
  self: Renderer
) => string

export type RenderPlaceFunction = (info: string) => string

/**
 * Options for @vuepress/plugin-container
 */
export interface ContainerPluginOptions extends MarkdownItContainerOptions {
  /**
   * The type of the container
   *
   * It would be used as the `name` of the container
   *
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  type: string

  /**
   * Locales config for container
   */
  locales?: LocaleConfig<{
    /**
     * Default info of the container
     *
     * If this option is not specified, the default info will fallback to the
     * uppercase of the `type` option
     */
    defaultInfo: string
  }>

  /**
   * A function to render the starting tag of the container.
   *
   * This option will not take effect if you don't specify the `after` option.
   */
  before?: RenderPlaceFunction

  /**
   * A function to render the ending tag of the container.
   *
   * This option will not take effect if you don't specify the `before` option.
   */
  after?: RenderPlaceFunction
}

export const containerPlugin = ({
  // plugin options
  type,
  after,
  before,
  locales,

  // raw options for markdown-it-container
  validate,
  marker,
  render,
}: ContainerPluginOptions): Plugin => {
  const plugin: PluginObject = {
    name: '@vuepress/plugin-container',
    multiple: true,
  }

  // `type` option is required
  if (!type) {
    logger.warn(`[${plugin.name}] ${colors.magenta('type')} option is required`)
    return plugin
  }

  // if `render` option is not specified
  // use `before` and `after` to generate render function
  if (!render) {
    let renderBefore: RenderPlaceFunction
    let renderAfter: RenderPlaceFunction

    if (before !== undefined && after !== undefined) {
      // user defined
      renderBefore = before
      renderAfter = after
    } else {
      // fallback
      renderBefore = (info: string): string =>
        `<div class="custom-container ${type}">${
          info ? `<p class="custom-container-title">${info}</p>` : ''
        }\n`
      renderAfter = (): string => '</div>\n'
    }

    // token info stack
    const infoStack: string[] = []

    render = (tokens, index, opts, env): string => {
      const token = tokens[index]

      if (token.nesting === 1) {
        // `before` tag

        // resolve info (title)
        let info = token.info.trim().slice(type.length).trim()

        if (!info && locales) {
          // locale
          const { filePathRelative } = env
          const relativePath = ensureLeadingSlash(filePathRelative ?? '')

          const localePath = resolveLocalePath(locales, relativePath)
          const localeData = locales[localePath] ?? {}

          if (localeData.defaultInfo) {
            info = localeData.defaultInfo
          } else {
            info = type.toUpperCase()
          }
        }

        // push the info to stack
        infoStack.push(info)

        // render
        return renderBefore(info)
      } else {
        // `after` tag

        // pop the info from stack
        const info = infoStack.pop() || ''

        // render
        return renderAfter(info)
      }
    }
  }

  // use markdown-it-container
  plugin.extendsMarkdown = (md) => {
    md.use(container, type, { render, validate, marker })
  }

  return plugin
}
