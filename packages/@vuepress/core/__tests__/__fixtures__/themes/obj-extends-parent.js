const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-obj-extends-parent',
  extends: path.resolve(__dirname, './obj'),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Foo.vue'),
    Foo: path.resolve(__dirname, '../layouts/Foo.vue'),
  },
  plugins: [path.resolve(__dirname, '../plugins/obj-foo.js')],
  templateBuild: 'theme-obj-extends-parent-template-build',
}
