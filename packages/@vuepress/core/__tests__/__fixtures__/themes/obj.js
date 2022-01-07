const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-obj',
  layouts: {
    Layout: path.resolve(__dirname, '../layouts/Layout.vue'),
    404: path.resolve(__dirname, '../layouts/404.vue'),
  },
  plugins: [path.resolve(__dirname, '../plugins/obj.js')],
  templateBuild: 'theme-obj-template-build',
  templateDev: 'theme-obj-template-dev',
}
