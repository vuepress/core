import type { Plugin } from 'vite'

const fileRegex = /\.html\.vue$/
const templateRegex = /<template>[\s\S]*<\/template>/g

export const createConstantReplacementPlugin = (): Plugin => {
  let defineRegex: RegExp | null = null

  return {
    name: 'vuepress:constant-replacement',
    enforce: 'pre',
    apply: 'build',
    configResolved(resolvedConfig) {
      if (resolvedConfig.define) {
        const define = Reflect.ownKeys(resolvedConfig.define) as string[]
        defineRegex = new RegExp(
          `\\b(${define
            .map((key) => key.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'))
            .join('|')})`,
          'g'
        )
      }
    },
    transform(code, id) {
      if (fileRegex.test(id)) {
        for (const match of code.matchAll(templateRegex)) {
          let html = match[0]

          // avoid env variables being replaced by vite
          html = html
            .replace(/\bimport\.meta/g, 'import.<wbr/>meta')
            .replace(/\bprocess\.env/g, 'process.<wbr/>env')

          // also avoid replacing vite user defines
          if (defineRegex) {
            html = html.replace(
              defineRegex,
              (_) => `${_[0]}<wbr/>${_.slice(1)}`
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
