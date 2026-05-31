import { describe, it, expect } from 'vitest'
import { queryConfig } from '@/lib/query-config'

describe('queryConfig', () => {
  const configs = ['static', 'lists', 'details', 'realtime'] as const

  it.each(configs)('%s has positive staleTime and gcTime', (key) => {
    expect(queryConfig[key].staleTime).toBeGreaterThan(0)
    expect(queryConfig[key].gcTime).toBeGreaterThan(0)
  })

  it.each(configs)('%s gcTime is greater than staleTime', (key) => {
    // Data should stay in cache longer than it takes to go stale
    expect(queryConfig[key].gcTime).toBeGreaterThan(queryConfig[key].staleTime)
  })

  it('static data stays fresh longer than list data', () => {
    expect(queryConfig.static.staleTime).toBeGreaterThan(queryConfig.lists.staleTime)
  })

  it('list data stays fresh longer than detail data', () => {
    expect(queryConfig.lists.staleTime).toBeGreaterThan(queryConfig.details.staleTime)
  })

  it('detail data stays fresh longer than realtime data', () => {
    expect(queryConfig.details.staleTime).toBeGreaterThan(queryConfig.realtime.staleTime)
  })
})
