import objFooPlugin from '../plugins/obj-foo.js'
import funcTheme from './func.js'

export default () => ({
  name: 'theme-func-extends-parent',
  extends: funcTheme(),
  plugins: [objFooPlugin],
  templateBuild: 'theme-func-extends-parent-template-build',
})
