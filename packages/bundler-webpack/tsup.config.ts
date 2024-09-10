import { defineConfig } from 'tsup'

const shared = defineConfig({
  clean: true,
  outDir: './dist',
  sourcemap: false,
  target: 'es2022',
  tsconfig: '../tsconfig.dts.json',
})

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
      'vuepress-markdown-loader': './src/loaders/vuepressMarkdownLoader.cts',
      'vuepress-ssr-loader': './src/loaders/vuepressSsrLoader.cts',
    },
    format: ['cjs'],
  },
])
