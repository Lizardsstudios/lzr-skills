import { describe, it, expect } from 'vitest'
import { queryKeys } from '@/lib/query-keys'

describe('queryKeys', () => {
  it('every domain has an "all" key as a readonly tuple', () => {
    expect(Array.isArray(queryKeys.example.all)).toBe(true)
    expect(queryKeys.example.all.length).toBeGreaterThan(0)
  })

  it('list() returns a more specific key than all', () => {
    const all = queryKeys.example.all
    const list = queryKeys.example.list()
    expect(list.length).toBeGreaterThan(all.length)
    expect(list[0]).toBe(all[0]) // same domain prefix
  })

  it('detail(id) returns a key scoped to that id', () => {
    const detail = queryKeys.example.detail('abc-123')
    expect(detail).toContain('abc-123')
    expect(detail[0]).toBe(queryKeys.example.all[0]) // same domain prefix
  })

  it('detail keys with different ids are not equal', () => {
    const a = queryKeys.example.detail('id-1')
    const b = queryKeys.example.detail('id-2')
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(b))
  })
})
