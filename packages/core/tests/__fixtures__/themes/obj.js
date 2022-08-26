import objPlugin from '../plugins/obj.js'

export default {
  name: 'theme-obj',
  plugins: [objPlugin],
  templateBuild: 'theme-obj-template-build',
  templateDev: 'theme-obj-template-dev',
}
