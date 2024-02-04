import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9080',
    specPattern: 'tests/**/*.cy.ts',
  },
  env: {
    E2E_BASE: process.env.E2E_BASE ?? '/',
    E2E_COMMAND: process.env.E2E_COMMAND ?? 'dev',
  },
})
