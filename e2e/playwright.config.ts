import { defineConfig, devices } from '@playwright/test'
import { BASE, BUNDLER, isCI, isDev } from './utils/env'

const commandPart1 = isDev ? 'docs:dev' : 'docs:build'
const commandPart2 = BUNDLER === 'vite' ? '' : `-${BUNDLER}`
const commandPart3 = isDev ? '' : ' && pnpm docs:serve'

export default defineConfig({
  testDir: 'tests',
  forbidOnly: isCI,
  reporter: isCI ? 'github' : 'line',
  retries: isCI ? 2 : 0,
  workers: isCI || isDev ? 1 : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    baseURL: `http://127.0.0.1:9080${BASE}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `pnpm docs:clean && pnpm ${commandPart1}${commandPart2}${commandPart3}`,
    url: 'http://127.0.0.1:9080',
    reuseExistingServer: !isCI,
  },
})
