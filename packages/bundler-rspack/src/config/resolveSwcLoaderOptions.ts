import type { SwcLoaderJscConfig, SwcLoaderOptions } from '@rspack/core'

export const resolveSwcLoaderOptions = (
  { env, jsc = {}, ...rest }: SwcLoaderOptions = {},
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
    ...env,
  },

  jsc: {
    parser: isTypescript
      ? {
          syntax: 'typescript',
          tsx: true,
          ...jsc.parser,
        }
      : {
          syntax: 'ecmascript',
          jsx: true,
          ...jsc.parser,
        },

    transform: {
      react: {
        runtime: 'classic',
        pragma: 'jsx',
        pragmaFrag: 'Fragment',
        development: false,
        ...jsc.transform?.react,
      },
      ...jsc.transform,
    },
    ...(jsc as SwcLoaderJscConfig),
  },

  /**
   * overrides
   */
  ...rest,
})
