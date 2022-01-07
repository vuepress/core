const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-func-extends-grandparent',
  extends: path.resolve(__dirname, './func-extends-parent'),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Bar.vue'),
    Bar: path.resolve(__dirname, '../layouts/Bar.vue'),
  },
  plugins: [path.resolve(__dirname, '../plugins/obj-bar.js')],
  templateDev: 'theme-func-extends-grandparent-template-dev',
}
