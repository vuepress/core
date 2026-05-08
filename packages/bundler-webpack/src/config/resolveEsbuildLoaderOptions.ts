import type { EsbuildPluginOptions } from 'esbuild-loader'

export const resolveEsbuildLoaderOptions = (
  options: EsbuildPluginOptions = {},
): EsbuildPluginOptions => ({
  /**
   * keep consistent with vite
   *
   * @see https://vite.dev/config/build-options.html#build-target
   */
  target: ['edge111', 'firefox114', 'chrome111', 'safari16.4'],

  /**
   * jsx options
   */
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',

  /**
   * overrides
   */
  ...options,
})
