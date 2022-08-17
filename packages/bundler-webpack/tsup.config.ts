import { defineConfig } from 'tsup'

const shared = defineConfig({
  clean: true,
  outDir: './dist',
  sourcemap: false,
  target: 'es2020',
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
      'vuepress-loader': './src/build/ssr/vuepressLoader.cts',
    },
    format: ['cjs'],
  },
])
