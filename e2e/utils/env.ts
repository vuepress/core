export const BASE = process.env.E2E_BASE ?? '/'
export const BUNDLER = process.env.E2E_BUNDLER ?? 'vite'
export const COMMAND = process.env.E2E_COMMAND ?? 'dev'

export const isDev = COMMAND === 'dev'
export const isProd = COMMAND === 'build'
export const isCI = !!process.env.CI
