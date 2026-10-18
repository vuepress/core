#!/usr/bin/env node

import process from 'node:process'

// Set `NODE_ENV` before loading the bundler, because some of its dependencies
// (e.g. `vue`) select their development or production builds according to
// `NODE_ENV` when they are loaded, which is earlier than the `dev` / `build`
// command sets it. Keep the defaults in sync with the commands.
const command = process.argv[2]
if (command === 'dev') {
  process.env.NODE_ENV ??= 'development'
} else if (command === 'build') {
  process.env.NODE_ENV ??= 'production'
}

const { viteBundler } = await import('@vuepress/bundler-vite')
const { cli } = await import('@vuepress/cli')

cli({ bundler: viteBundler() })
