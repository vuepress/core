import { defineConfig } from 'taze'

export default defineConfig({
  packageMode: {
    esbuild: 'minor',
    vite: 'minor',
  },
  recursive: true,
  write: true,
})
