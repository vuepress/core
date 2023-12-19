import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/**/*.cy.ts',
  },
  env: {
    E2E_BASE: process.env.E2E_BASE ?? '/',
  },
})
