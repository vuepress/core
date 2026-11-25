type DeepPartialArray<T> = DeepPartial<T>[]

type DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type DeepPartial<T> = T extends Function
  ? T
  : T extends (infer U)[]
    ? DeepPartialArray<U>
    : T extends object
      ? DeepPartialObject<T>
      : T | undefined
