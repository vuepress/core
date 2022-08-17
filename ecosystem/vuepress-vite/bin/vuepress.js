#!/usr/bin/env node

import { viteBundler } from '@vuepress/bundler-vite'
import { cli } from '@vuepress/cli'
import { defaultTheme } from '@vuepress/theme-default'

// set default bundler
cli({ bundler: viteBundler(), theme: defaultTheme() })
