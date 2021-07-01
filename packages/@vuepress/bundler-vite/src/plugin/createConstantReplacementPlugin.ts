import type { Plugin } from 'vite'

const fileRegexp = /\.html\.vue$/
const templateRegexp = /<template>[\s\S]*<\/template>/

export const createConstantReplacementPlugin = (): Plugin => {
  let defineRegex: RegExp | null = null

  return {
    name: 'vuepress:constant-replacement',
    enforce: 'pre',
    apply: 'build',
    configResolved(resolvedConfig) {
      if (resolvedConfig.define) {
        const define = Object.keys(resolvedConfig.define)
        defineRegex = new RegExp(
          `\\b(${define
            .map((key) => key.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'))
            .join('|')})`,
          'g'
        )
      }
    },
    transform(code, id) {
      if (fileRegexp.test(id)) {
        const match = code.match(templateRegexp)
        if (match) {
          let html = match[0]

          // avoid env variables being replaced by vite
          html = html
            .replace(/\bimport\.meta/g, 'import.<wbr/>meta')
            .replace(/\bprocess\.env/g, 'process.<wbr/>env')

          // also avoid replacing vite user defines
          if (defineRegex) {
            html = html.replace(
              defineRegex,
              (a) => `${a[0]}<wbr/>${a.slice(1)}`
            )
          }

          const index = match.index!
          code =
            code.substring(0, index) +
            html +
            code.substring(index + html.length)
        }

        return code
      }
    },
  }
}
