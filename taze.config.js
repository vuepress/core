import { defineConfig } from 'taze'

export default defineConfig({
  packageMode: {
    vite: 'patch',
  },
  recursive: true,
  write: true,
})
