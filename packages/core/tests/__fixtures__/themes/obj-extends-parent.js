import { path } from '@vuepress/utils'
import objFooPlugin from '../plugins/obj-foo.js'
import objTheme from './obj.js'

export default {
  name: 'theme-obj-extends-parent',
  extends: objTheme,
  layouts: {
    404: path.resolve(__dirname, '../layouts/Foo.vue'),
    Foo: path.resolve(__dirname, '../layouts/Foo.vue'),
  },
  plugins: [objFooPlugin],
  templateBuild: 'theme-obj-extends-parent-template-build',
}
