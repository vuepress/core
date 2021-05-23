import type { App } from '../../types'

/**
 * Generate layout components temp file
 */
export const prepareLayoutComponents = async (app: App): Promise<void> => {
  const content = `\
import { defineAsyncComponent } from '${require.resolve('vue')}'

export const layoutComponents = {\
${app.themeApi.layouts
  .map(
    ({ name, path }) => `
  ${JSON.stringify(name)}: defineAsyncComponent(() => import(${
      app.env.isDebug ? `/* webpackChunkName: "layout-${name}" */` : ''
    }${JSON.stringify(path)})),`
  )
  .join('')}
}
`

  await app.writeTemp('internal/layoutComponents.js', content)
}
