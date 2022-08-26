import objFooPlugin from '../plugins/obj-foo.js'
import objTheme from './obj.js'

export default {
  name: 'theme-obj-extends-parent',
  extends: objTheme,
  plugins: [objFooPlugin],
  templateBuild: 'theme-obj-extends-parent-template-build',
}
