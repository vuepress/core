import { onMounted } from 'vue'
import cssVars from '../styles/_variables.module.scss?module'

export enum DeviceType {
  MOBILE = 'mobile',
}

const DeviceTypeMap = {
  [DeviceType.MOBILE]: Number.parseInt(cssVars.mobile?.replace('px', ''), 10),
}

/**
 * add listener to detect screen though device type
 */
export const useUpdateDeviceStatus = (
  deviceType: DeviceType,
  callback: (width: number) => void
): void => {
  const width = DeviceTypeMap[deviceType]
  if (!Number.isInteger(width)) {
    if (__VUEPRESS_DEV__) throw new Error('device width must be a integer')
    return
  }

  onMounted(() => {
    callback(width)
    window.addEventListener('resize', () => callback(width), false)
    window.addEventListener('orientationchange', () => callback(width), false)
  })
}
