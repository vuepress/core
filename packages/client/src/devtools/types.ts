import type { CustomInspectorNode } from '@vue/devtools-kit'
import type { Data } from '../types/index.js'

export type DataKey = keyof Data
export type DataValue = Data[DataKey]

export interface InspectorNodeConfig
  extends Pick<CustomInspectorNode, 'id' | 'label'> {
  keys: DataKey[]
}
