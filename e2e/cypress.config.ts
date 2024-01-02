import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'http://localhost:9080',
    specPattern: 'tests/**/*.cy.ts',
  },
  env: {
    E2E_BASE: process.env.E2E_BASE ?? '/',
  },
})
