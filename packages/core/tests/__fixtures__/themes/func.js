import { path } from '@vuepress/utils'
import objPlugin from '../plugins/obj.js'

export default () => ({
  name: 'theme-func',
  layouts: {
    Layout: path.resolve(__dirname, '../layouts/Layout.vue'),
    404: path.resolve(__dirname, '../layouts/404.vue'),
  },
  plugins: [objPlugin],
  templateBuild: 'theme-func-template-build',
  templateDev: 'theme-func-template-dev',
})
