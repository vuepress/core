import type { App, PageOptions } from '../types'

/**
 * Render page content and extract related info
 */
export const resolvePageOptions = async ({
  app,
  optionsRaw,
}: {
  app: App
  optionsRaw: PageOptions
}): Promise<PageOptions> => {
  const options = { ...optionsRaw }

  // plugin hook: extendsPageOptions
  const extendsPageOptions = await app.pluginApi.hooks.extendsPageOptions.process(
    optionsRaw,
    app
  )
  extendsPageOptions.forEach((item) => Object.assign(options, item))

  return options
}
