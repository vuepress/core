#!/usr/bin/env node

import { webpackBundler } from '@vuepress/bundler-webpack'
import { cli } from '@vuepress/cli'

cli({ bundler: webpackBundler() })
