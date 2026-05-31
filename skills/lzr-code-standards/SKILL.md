---
name: lzr-code-standards
description: Professional coding standards for web apps and services. Activates automatically when working in any web project. Defines how to fetch data, how to structure the data access layer, how to build components, and how to apply the visual system in code.
---

# LZR Code Standards

These standards apply to every LZR web project with a user interface. They are not preferences — each rule exists because the opposite caused real problems.

---

## Rule 1 — Data Fetching

**Every server-side data request uses React Query. No exceptions.**

Using `useState` + `useEffect` to load server data is prohibited. This pattern causes: full reload on every screen change, duplicate requests for the same data, no cache, no unified loading state.

**Correct:**
```tsx
const { data, isLoading, error } = useQuery({
  queryKey: queryKeys.invoices.list(),
  queryFn: () => invoiceService.getAll(),
  ...queryConfig.lists,
})
```

**Prohibited:**
```tsx
const [invoices, setInvoices] = useState([])
useEffect(() => { invoiceService.getAll().then(setInvoices) }, [])
```

**`useState` is allowed only for:**
- UI state: modal open, active tab, local filter
- Form draft before saving
- Ephemeral state: hover, focus, animation

**Every mutation uses optimistic updates:**
```tsx
const mutation = useMutation({
  mutationFn: (data) => invoiceService.create(data),
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: queryKeys.invoices.list() })
    const previous = queryClient.getQueryData(queryKeys.invoices.list())
    queryClient.setQueryData(queryKeys.invoices.list(), (old) => [...old, newData])
    return { previous }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.invoices.list() })
  },
  onError: (_err, _vars, context) => {
    queryClient.setQueryData(queryKeys.invoices.list(), context.previous)
  },
})
```

Why optimistic: most actions succeed. The user sees the result immediately. If it fails, the state reverts. Result: interface feels 300–500ms faster with no server changes.

**Required file `src/lib/query-keys.ts`:**
```tsx
export const queryKeys = {
  invoices: {
    all: ['invoices'] as const,
    list: () => ['invoices', 'list'],
    detail: (id: string) => ['invoices', id],
  },
}
```

**Cache times by data type:**

| Type | Stale after | Removed after |
|---|---|---|
| Static (company settings, config) | 10 min | 30 min |
| Lists (invoices, contracts, users) | 2 min | 10 min |
| Detail (one specific record) | 1 min | 5 min |
| Real-time activity | 30 sec | 5 min |

---

## Rule 2 — Layered Architecture (Backend)

**Business logic never accesses the database directly. It always goes through an interface layer.**

Without this separation: changing the database requires rewriting all code that touches data. With it: only the adapter changes.

**Three required layers:**

**Layer 1 — Interface (the contract):**
Defines what can be done with data. Zero dependency on any specific tool.
```ts
export interface InvoiceRepository {
  getAll(params?: PaginationParams): Promise<PaginatedResult<Invoice>>
  getById(id: string): Promise<Invoice | null>
  create(invoice: InvoiceInsert): Promise<Invoice>
  update(id: string, updates: InvoiceUpdate): Promise<Invoice>
  delete(id: string): Promise<void>
  getOwnerCompanyId(id: string): Promise<string | null>
}
```

**Layer 2 — Adapter (the implementation):**
Performs the actual database access. Receives the client as a parameter — never instantiates on its own.
```ts
export function createInvoiceRepository(client: DatabaseClient): InvoiceRepository {
  return {
    async getById(id) {
      const { data, error } = await client.from('invoices').select('*').eq('id', id).single()
      if (error) throw error
      return data
    },
  }
}
```

**Layer 3 — Composition root (where everything connects):**
The only place in the codebase that knows which database is being used.
```ts
export function getRepositories() {
  return createRepositories(createDatabaseClient())
}
```

**Authorization lives in the service layer, never in the adapter:**
```ts
async function authorizeInvoiceAccess(id: string) {
  const ctx = await getCurrentAuthContext()
  requireAuthenticated(ctx)
  const ownerCompanyId = await getRepositories().invoices.getOwnerCompanyId(id)
  if (!ownerCompanyId) throw new AuthorizationError('NOT_FOUND', 'Invoice not found.')
  requireCompanyMatch(ctx.companyId, ownerCompanyId)
}
```

Apply when: multi-tenant SaaS with more than 2 weeks of life.
Skip when: one-off scripts, prototypes still in validation.

---

## Rule 3 — Visual Tokens in Code

**Never use hardcoded colors or sizes. Always use system tokens.**

**Prohibited:**
```tsx
<div className="bg-[#3b82f6] text-white p-[13px]">
```

**Correct:**
```tsx
<div className="bg-action text-inverse p-s4">
```

**Required `tailwind.config.ts` mapping:**
```ts
theme: {
  extend: {
    colors: {
      bg: 'var(--bg)',
      surface: 'var(--surface)',
      'surface-raised': 'var(--surface-raised)',
      border: 'var(--border)',
      'border-strong': 'var(--border-strong)',
      'text-primary': 'var(--text-primary)',
      'text-secondary': 'var(--text-secondary)',
      'text-disabled': 'var(--text-disabled)',
      'text-inverse': 'var(--text-inverse)',
      accent: 'var(--accent)',
      'accent-hover': 'var(--accent-hover)',
      action: 'var(--action)',
      'action-hover': 'var(--action-hover)',
      danger: 'var(--danger)',
      success: 'var(--success)',
    },
    spacing: {
      s1: '4px', s2: '8px', s3: '12px', s4: '16px', s5: '24px',
      s6: '32px', s7: '48px', s8: '64px', s9: '96px',
    },
  }
}
```

**Placeholder uses `--text-placeholder` — never `--text-secondary`:**
```tsx
// Prohibited — contrast failure (~3:1)
<input className="placeholder:text-text-secondary" />

// Correct — guarantees 4.5:1 required for accessibility
<input className="placeholder:text-text-placeholder" />
```

---

## Rule 4 — Navigation

**Back navigation always uses history. Never a hardcoded route.**

```tsx
// Prohibited — sends user to a place they may not have come from
<button onClick={() => router.push('/dashboard')}>Back</button>

// Correct — returns to wherever the user was
<button onClick={() => router.back()}>Back</button>
```

Why: the user may have arrived from search, a notification, or a direct link. A hardcoded route breaks their navigation flow.

`router.push()` is for intentional forward navigation. `router.back()` is exclusively for going back.

---

## Rule 5 — No Loose HTML Elements

**Application code never uses bare HTML elements for UI. Always uses system components.**

```tsx
// Prohibited
<button onClick={save}>Save</button>
<input type="text" />
<select>...</select>

// Correct
<Button onClick={save}>Save</Button>
<Input />
<Select>...</Select>
```

Why: bare elements bypass the focus, loading, disabled, and accessibility states that system components implement. Every loose element is a component that will fail in the edge cases.

---

## Rule 6 — Super Admin (Multi-tenant SaaS)

In every SaaS with multiple companies, super admin is an explicit role — never a user without a company.

```sql
CREATE OR REPLACE FUNCTION is_super_admin_user()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;
```

Fixed rules:
- User without a company and without super admin role = blocked (this is security, not a bug)
- Never use `IS NULL OR company_id = ...` in security policies — this opens cross-company access

---

## Rule 7 — Zero Tolerance for Errors

No project ships with pending errors or warnings. This includes: TypeScript errors, linter warnings, failing tests, build failures, design audit warnings.

If an error appears during development — regardless of when it was introduced — stop, fix everything, confirm all checks pass, then continue.

**Required before any code push:**
1. Type check: zero errors
2. Lint: zero warnings
3. Tests: all passing
4. Build: no errors
