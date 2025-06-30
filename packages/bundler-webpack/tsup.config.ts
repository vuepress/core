import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

const shared = defineConfig({
  clean: true,
  outDir: './dist',
  sourcemap: false,
  target: 'es2023',
  tsconfig: '../tsconfig.dts.json',
}) as Options

export default defineConfig([
  {
    ...shared,
    dts: './src/index.ts',
    entry: ['./src/index.ts'],
    format: ['esm'],
  },
  {
    ...shared,
    entry: {
      'vuepress-ssr-loader': './src/loaders/vuepressSsrLoader.cts',
    },
    format: ['cjs'],
  },
])
