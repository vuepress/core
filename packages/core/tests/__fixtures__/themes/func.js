import objPlugin from '../plugins/obj.js'

export default () => ({
  name: 'theme-func',
  plugins: [objPlugin],
  templateBuild: 'theme-func-template-build',
  templateDev: 'theme-func-template-dev',
})
