import { onMounted } from 'vue'
import cssVars from '../styles/_variables.module.scss?module'

export enum DeviceType {
  MOBILE = 'mobile',
}

const DeviceTypeMap = {
  [DeviceType.MOBILE]: Number(cssVars.mobile?.replace('px', '')),
}

/**
 * add listener to detect screen though device type
 */
export const updateDeviceStatus = (
  deviceType: DeviceType,
  callback: (width: number) => void
): void => {
  const width = DeviceTypeMap[deviceType]
  if (!width) return

  onMounted(() => {
    callback(width)
    window.addEventListener('resize', () => callback(width), false)
    window.addEventListener('orientationchange', () => callback(width), false)
  })
}
