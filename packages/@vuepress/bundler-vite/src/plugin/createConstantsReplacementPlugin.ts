import type { App } from '@vuepress/core'
import type { Plugin } from 'vite'

const pageComponentFileRegexp = /\.html\.vue$/
const vueTemplateRegexp = /<template>[\s\S]*<\/template>/

const jsStringBreaker = '\u200b'
const vueTemplateBreaker = '<wbr>'

/**
 * Global constants and env variables will be statically replaced in
 * production mode, even in JavaScript string and Vue template.
 *
 * To avoid that behavior, we use this plugin to insert `'\u200b'` char into
 * constant strings in page data, and insert `<wbr>` tag into constant strings
 * in template of page component.
 *
 * @see https://vitejs.dev/guide/env-and-mode.html#production-replacement
 */
export const createConstantsReplacementPlugin = (app: App): Plugin => {
  const pagesDirPrefix = `${app.dir.temp('pages')}/`

  let constantsRegexp: RegExp
  const replaceConstants = (code: string, breaker: string): string =>
    code.replace(
      constantsRegexp,
      (constant) => `${constant[0]}${breaker}${constant.slice(1)}`
    )

  return {
    name: 'vuepress:constants-replacement',

    enforce: 'pre',

    apply: 'build',

    configResolved(resolvedConfig) {
      const constants = ['import.meta', 'process.env']

      if (resolvedConfig.define) {
        constants.push(...Object.keys(resolvedConfig.define))
      }

      constantsRegexp = new RegExp(
        `\\b(${constants
          .map((item) => item.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'))
          .join('|')})`,
        'g'
      )
    },

    transform(code, id) {
      // only handle page temp files
      if (!id.startsWith(pagesDirPrefix)) return

      // handle page data
      if (!pageComponentFileRegexp.test(id)) {
        return replaceConstants(code, jsStringBreaker)
      }

      // handle page component
      const match = code.match(vueTemplateRegexp)
      if (match === null) return
      return (
        code.substring(0, match.index!) +
        replaceConstants(match[0], vueTemplateBreaker) +
        code.substring(match.index! + match[0].length)
      )
    },
  }
}
