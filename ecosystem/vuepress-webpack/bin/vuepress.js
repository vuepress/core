#!/usr/bin/env node

import { webpackBundler } from '@vuepress/bundler-webpack'
import { cli } from '@vuepress/cli'
// eslint-disable-next-line import/named
import { defaultTheme } from '@vuepress/theme-default'

// set default bundler
cli({ bundler: webpackBundler(), theme: defaultTheme() })
