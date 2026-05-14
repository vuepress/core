import type { EsbuildPluginOptions } from 'esbuild-loader'

export const resolveEsbuildLoaderOptions = (
  options: EsbuildPluginOptions = {},
): EsbuildPluginOptions => ({
  /**
   * keep consistent with vite
   *
   * @see https://vite.dev/config/build-options.html#build-target
   */
  target: ['es2023', 'chrome111', 'edge111', 'firefox114', 'safari16.4'],

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
