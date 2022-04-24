const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-func-extends-grandparent',
  extends: require('./func-extends-parent'),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Bar.vue'),
    Bar: path.resolve(__dirname, '../layouts/Bar.vue'),
  },
  plugins: [require('../plugins/obj-bar.js')],
  templateDev: 'theme-func-extends-grandparent-template-dev',
}
