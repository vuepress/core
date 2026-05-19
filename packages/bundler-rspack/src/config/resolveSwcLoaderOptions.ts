import type { SwcLoaderJscConfig, SwcLoaderOptions } from '@rspack/core'

export const resolveSwcLoaderOptions = (
  { env, jsc = {}, ...rest }: SwcLoaderOptions = {},
  isTypescript = false,
): SwcLoaderOptions => {
  const { parser = {}, transform = {}, ...jscRest } = jsc as SwcLoaderJscConfig

  return {
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
            ...parser,
          }
        : {
            syntax: 'ecmascript',
            jsx: true,
            ...parser,
          },

      transform: {
        ...transform,
        react: {
          runtime: 'classic',
          pragma: 'jsx',
          pragmaFrag: 'Fragment',
          development: false,
          ...transform.react,
        },
      },

      ...jscRest,
    },

    /**
     * overrides
     */
    ...rest,
  }
}
