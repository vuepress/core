#!/usr/bin/env node

import { webpackBundler } from '@vuepress/bundler-webpack'
import { cli } from '@vuepress/cli'

// set default bundler
cli({ bundler: webpackBundler() })
