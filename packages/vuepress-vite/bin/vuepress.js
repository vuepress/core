#!/usr/bin/env node

import { viteBundler } from '@vuepress/bundler-vite'
import { cli } from '@vuepress/cli'

// set default bundler
cli({ bundler: viteBundler() })
