#!/usr/bin/env node

const { webpackBundler } = require('@vuepress/bundler-webpack')
const { cli } = require('@vuepress/cli')
const { defaultTheme } = require('@vuepress/theme-default')

// set default bundler
cli({ bundler: webpackBundler(), theme: defaultTheme() })
