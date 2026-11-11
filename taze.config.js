import { defineConfig } from 'taze'

export default defineConfig({
  maturityPeriod: 1,
  packageMode: {
    typescript: 'minor',
  },
  recursive: true,
  write: true,
})
