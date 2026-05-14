import type { SwcLoaderJscConfig, SwcLoaderOptions } from '@rspack/core'

export const resolveSwcLoaderOptions = (
  options: SwcLoaderOptions = {},
  isTypescript = false,
): SwcLoaderOptions => ({
  env: {
    /**
     * keep consistent with vite
     *
     * @see https://vite.dev/config/build-options.html#build-target
     */
    targets: {
      chrome: '111',
      edge: '111',
      firefox: '114',
      safari: '16.4',
    },
    ...options.env,
  },

  jsc: {
    parser: isTypescript
      ? {
          syntax: 'typescript',
          tsx: true,
          ...options.jsc?.parser,
        }
      : {
          syntax: 'ecmascript',
          jsx: true,
          ...options.jsc?.parser,
        },

    transform: {
      react: {
        runtime: 'classic',
        pragma: 'jsx',
        pragmaFrag: 'Fragment',
        development: false,
        ...options.jsc?.transform?.react,
      },
      ...options.jsc?.transform,
    },
    ...(options.jsc as SwcLoaderJscConfig),
  },

  /**
   * overrides
   */
  ...options,
})
