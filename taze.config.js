import { defineConfig } from 'taze'

export default defineConfig({
  packageMode: {
    '@types/express': 'minor',
    'chokidar': 'minor',
    'express': 'minor',
    'vite': 'patch',
  },
  recursive: true,
  write: true,
})
