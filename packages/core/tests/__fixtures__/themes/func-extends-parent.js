import { path } from '@vuepress/utils'
import objFooPlugin from '../plugins/obj-foo.js'
import funcTheme from './func.js'

export default () => ({
  name: 'theme-func-extends-parent',
  extends: funcTheme(),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Foo.vue'),
    Foo: path.resolve(__dirname, '../layouts/Foo.vue'),
  },
  plugins: [objFooPlugin],
  templateBuild: 'theme-func-extends-parent-template-build',
})
