import { defineConfig } from 'taze'

export default defineConfig({
  packageMode: {
    '@types/express': 'minor',
    '@types/node': 'minor',
    'express': 'minor',
  },
  recursive: true,
  write: true,
})
