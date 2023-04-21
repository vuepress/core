/**
 * A webpack loader to handle SSR dependencies
 *
 * This loader will only take effect in server bundle
 * because we only replace `ssrRender` code
 *
 * But we still need to use this loader in client,
 * to ensure that the module `request` in client and
 * server bundle are the same
 */
module.exports = function vuepressLoader(source: string): string {
  // get `request` from loader context
  const { request } = this as any

  if (!request.endsWith('.vue')) return source

  // add `request` to `ssrContext._registeredComponents` to handle SSR dependencies
  // notice that this could only handle those sfc that cannot use inline template
  // see https://github.com/vuejs/vue-loader/blob/1b1a195612f885a8dec3f371edf1cb8b35d341e4/src/index.ts#L167-L183
  return source.replace(
    /import { ssrRender } from (.*)\n/,
    `import { ssrRender as _ssrRender } from $1
import { ssrContextKey } from 'vue'
const ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[ssrContextKey]
  ssrContext._registeredComponents.add(${JSON.stringify(request)})
  return _ssrRender(...args)
}
`
  )
}
