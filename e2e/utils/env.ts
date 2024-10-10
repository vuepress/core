import process from 'node:process'

export const BASE = process.env.E2E_BASE ?? '/'
export const BUNDLER = process.env.E2E_BUNDLER ?? 'vite'
export const COMMAND = process.env.E2E_COMMAND ?? 'dev'

export const IS_DEV = COMMAND === 'dev'
export const IS_PROD = COMMAND === 'build'
export const IS_CI = !!process.env.CI
