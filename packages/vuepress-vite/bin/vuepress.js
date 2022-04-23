#!/usr/bin/env node

const { viteBundler } = require('@vuepress/bundler-vite')
const { cli } = require('@vuepress/cli')
const { defaultTheme } = require('@vuepress/theme-default')

// set default bundler
cli({ bundler: viteBundler(), theme: defaultTheme() })
