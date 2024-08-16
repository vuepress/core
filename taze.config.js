import { defineConfig } from 'taze'

export default defineConfig({
  mode: 'latest',
  packageMode: {
    esbuild: 'minor',
    vite: 'minor',
  },
  recursive: true,
  write: true,
})
