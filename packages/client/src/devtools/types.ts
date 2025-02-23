import type { CustomInspectorNode } from '@vue/devtools-kit'
import type { ClientData } from '../types/index.js'

export type ClientDataKey = keyof ClientData
export type ClientDataValue = ClientData[ClientDataKey]

export interface InspectorNodeConfig
  extends Pick<CustomInspectorNode, 'id' | 'label'> {
  keys: ClientDataKey[]
}
