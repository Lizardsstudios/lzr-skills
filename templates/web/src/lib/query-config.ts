/**
 * Cache configuration by data type.
 * staleTime: how long until data is considered stale and background-refetched
 * gcTime: how long until unused data is removed from cache
 */
export const queryConfig = {
  /** Static data: company settings, config — rarely changes */
  static: {
    staleTime: 10 * 60 * 1000,  // 10 minutes
    gcTime: 30 * 60 * 1000,     // 30 minutes
  },
  /** List data: invoices, users, records — changes occasionally */
  lists: {
    staleTime: 2 * 60 * 1000,   // 2 minutes
    gcTime: 10 * 60 * 1000,     // 10 minutes
  },
  /** Detail data: one specific record — changes occasionally */
  details: {
    staleTime: 1 * 60 * 1000,   // 1 minute
    gcTime: 5 * 60 * 1000,      // 5 minutes
  },
  /** Real-time data: notifications, activity — changes frequently */
  realtime: {
    staleTime: 30 * 1000,        // 30 seconds
    gcTime: 5 * 60 * 1000,      // 5 minutes
  },
}
