export type ContentUpdatedReason = 'beforeUnmount' | 'mounted' | 'updated'

export type ContentUpdatedCallback = (reason: ContentUpdatedReason) => unknown
