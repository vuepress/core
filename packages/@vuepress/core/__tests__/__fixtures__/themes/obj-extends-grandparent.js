const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-obj-extends-grandparent',
  extends: require('./obj-extends-parent'),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Bar.vue'),
    Bar: path.resolve(__dirname, '../layouts/Bar.vue'),
  },
  plugins: [require('../plugins/obj-bar.js')],
  templateDev: 'theme-obj-extends-grandparent-template-dev',
}
