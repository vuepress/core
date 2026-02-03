import { defineConfig } from 'tsdown'

const shared = defineConfig({
  target: 'es2023',
  tsconfig: '../tsconfig.dts.json',
})

export default defineConfig([
  {
    ...shared,
    dts: true,
    entry: './src/index.ts',
    format: 'esm',
  },
  {
    ...shared,
    dts: false,
    entry: {
      'vuepress-ssr-loader': './src/loaders/vuepressSsrLoader.cts',
    },
    format: 'cjs',
  },
])
