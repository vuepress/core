import { describe, expect, it } from 'vitest'

import { mergeEvents } from '../../../src/commands/dev/watchPageFiles.js'

describe('mergeEvents', () => {
  it('should return null for empty events', () => {
    expect(mergeEvents([])).toBe(null)
  })

  describe('single event', () => {
    it('should return "add" for a single add event', () => {
      expect(mergeEvents(['add'])).toBe('add')
    })

    it('should return "change" for a single change event', () => {
      expect(mergeEvents(['change'])).toBe('change')
    })

    it('should return "unlink" for a single unlink event', () => {
      expect(mergeEvents(['unlink'])).toBe('unlink')
    })
  })

  describe('add → ...', () => {
    it('should merge add + change into "add" (file added then modified before processing)', () => {
      expect(mergeEvents(['add', 'change'])).toBe('add')
    })

    it('should merge add + change + change into "add"', () => {
      expect(mergeEvents(['add', 'change', 'change'])).toBe('add')
    })

    it('should merge add + unlink into null (file added then removed, nothing happened)', () => {
      expect(mergeEvents(['add', 'unlink'])).toBe(null)
    })

    it('should merge add + change + unlink into null', () => {
      expect(mergeEvents(['add', 'change', 'unlink'])).toBe(null)
    })
  })

  describe('unlink → ...', () => {
    it('should merge unlink + add into "change" (atomic save: remove then re-add equals a change)', () => {
      expect(mergeEvents(['unlink', 'add'])).toBe('change')
    })

    it('should merge unlink + add + change into "change"', () => {
      expect(mergeEvents(['unlink', 'add', 'change'])).toBe('change')
    })
  })

  describe('change → ...', () => {
    it('should merge change + change into "change"', () => {
      expect(mergeEvents(['change', 'change'])).toBe('change')
    })

    it('should merge change + unlink into "unlink"', () => {
      expect(mergeEvents(['change', 'unlink'])).toBe('unlink')
    })

    it('should merge change + change + change into "change"', () => {
      expect(mergeEvents(['change', 'change', 'change'])).toBe('change')
    })
  })
})
