const { path } = require('@vuepress/utils')

module.exports = () => ({
  name: 'theme-func-extends-parent',
  extends: path.resolve(__dirname, './func'),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Foo.vue'),
    Foo: path.resolve(__dirname, '../layouts/Foo.vue'),
  },
  plugins: [path.resolve(__dirname, '../plugins/obj-foo.js')],
  templateBuild: 'theme-func-extends-parent-template-build',
})
