const { path } = require('@vuepress/utils')

module.exports = () => ({
  name: 'theme-func',
  layouts: {
    Layout: path.resolve(__dirname, '../layouts/Layout.vue'),
    404: path.resolve(__dirname, '../layouts/404.vue'),
  },
  plugins: [path.resolve(__dirname, '../plugins/obj.js')],
  templateBuild: 'theme-func-template-build',
  templateDev: 'theme-func-template-dev',
})
