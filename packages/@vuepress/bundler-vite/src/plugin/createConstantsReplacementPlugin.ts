import type { App } from '@vuepress/core'
import type { Plugin } from 'vite'

const pageComponentRegexp = /\.html\.vue$/
const templateRegexp = /<template>[\s\S]*<\/template>/
const jsStringBreaker = '\u200b'
const vueTemplateBreaker = '<wbr>'

/**
 * Global constants and env variables will be statically replaced in
 * production mode, even in JavaScript string and Vue template.
 *
 * To avoid that behavior in Vue template, we use this plugin to insert
 * `<wbr>` tag into the constant string.
 *
 * @see https://vitejs.dev/guide/env-and-mode.html#production-replacement
 */
export const createConstantsReplacementPlugin = (app: App): Plugin => {
  const pagesDirPrefix = `${app.dir.temp('pages')}/`

  let constantsRegexp: RegExp
  const replaceConstants = (code: string, breaker: string): string =>
    code.replace(
      constantsRegexp,
      (define) => `${define[0]}${breaker}${define.slice(1)}`
    )

  return {
    name: 'vuepress:constant-replacement',

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
      if (!pageComponentRegexp.test(id)) {
        return replaceConstants(code, jsStringBreaker)
      }

      // handle page component
      const match = code.match(templateRegexp)
      if (match === null) return
      return (
        code.substring(0, match.index!) +
        replaceConstants(match[0], vueTemplateBreaker) +
        code.substring(match.index! + match[0].length)
      )
    },
  }
}
