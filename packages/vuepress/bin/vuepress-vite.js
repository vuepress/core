#!/usr/bin/env node

import { viteBundler } from '@vuepress/bundler-vite'
import { cli } from '@vuepress/cli'

cli({ bundler: viteBundler() })
