#!/usr/bin/env node

import { viteBundler } from '@vuepress/bundler-vite'
import { cli } from '@vuepress/cli'
// eslint-disable-next-line import/named
import { defaultTheme } from '@vuepress/theme-default'

// set default bundler
cli({ bundler: viteBundler(), theme: defaultTheme() })
