import { defineConfig } from 'taze'

export default defineConfig({
  maturityPeriod: 1,
  packageMode: {
    '@types/express': 'minor',
    '@types/node': 'minor',
    'express': 'minor',
    'typescript': 'minor',
  },
  recursive: true,
  write: true,
})
