import { defineConfig } from 'taze'

export default defineConfig({
  packageMode: {
    '@types/express': 'minor',
    'express': 'minor',
    'vite': 'patch',
  },
  recursive: true,
  write: true,
})
