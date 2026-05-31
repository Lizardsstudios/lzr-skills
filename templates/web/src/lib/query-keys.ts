/**
 * Centralized query key factory.
 * Add a new entry for each data domain in your app.
 * Hierarchy enables granular cache invalidation.
 *
 * Example:
 *   invalidateQueries({ queryKey: queryKeys.invoices.all })  → clears everything
 *   invalidateQueries({ queryKey: queryKeys.invoices.list() }) → clears list only
 *   invalidateQueries({ queryKey: queryKeys.invoices.detail(id) }) → clears one record
 */
export const queryKeys = {
  // Example domain — replace with your actual data domains
  example: {
    all: ['example'] as const,
    list: () => ['example', 'list'] as const,
    detail: (id: string) => ['example', id] as const,
  },
}
