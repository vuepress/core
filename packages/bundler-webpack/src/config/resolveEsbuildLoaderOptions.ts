import type { EsbuildPluginOptions } from 'esbuild-loader'

export const resolveEsbuildLoaderOptions = (
  options: EsbuildPluginOptions = {},
): EsbuildPluginOptions => ({
  /**
   * keep consistent with vite
   *
   * @see https://vite.dev/config/build-options.html#build-target
   */
  target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],

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
