import type { App } from '@vuepress/core'
import autoprefixer from 'autoprefixer'
import type { AcceptedPlugin } from 'postcss'
import postcssrc from 'postcss-load-config'

/**
 * Resolve PostCSS plugins for a VuePress app
 *
 * The config is always searched from the site source directory, instead of
 * `process.cwd()`, so that vite, webpack and rspack share the same resolution
 * semantics.
 *
 * The built-in `autoprefixer` is appended after the plugins from user config,
 * so that it always runs last, no matter whether a config file exists.
 */
export const resolvePostcssPlugins = async (
  app: App,
): Promise<AcceptedPlugin[]> => {
  const sourceDir = app.dir.source()

  try {
    const { plugins } = await postcssrc({}, sourceDir)

    return [...(plugins ?? []), autoprefixer]
  } catch (error) {
    // no config file is not an error, fall back to the built-in plugins
    if (
      error instanceof Error &&
      error.message.includes('No PostCSS Config found')
    ) {
      return [autoprefixer]
    }

    throw new Error(
      `[vuepress] Failed to load PostCSS config from "${sourceDir}": ${
        error instanceof Error ? error.message : String(error)
      }`,
      { cause: error },
    )
  }
}
