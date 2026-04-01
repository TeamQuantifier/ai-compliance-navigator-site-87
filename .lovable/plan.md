

## SEO Audit & Fixes for quantifier.ai

### Critical Issues Found

**Issue #1 — Massive duplicate content: Product pages (SEVERITY: HIGH)**
Routes `/product`, `/product/features`, `/product/ai-compliance-officer`, `/product/task-data-management`, `/product/documents-management`, `/product/value-chain`, `/product/risk-assessment`, `/product/analytics-dashboards`, `/product/api-integrations` ALL render the **same `Features` component**. This creates 9 URLs × 3 locales = **27 near-identical pages** in the sitemap. Dedicated page components exist (`ComplianceOfficer.tsx`, `AnalyticsDashboards.tsx`, etc.) but are **not wired up** in `App.tsx`.

**Issue #2 — Massive duplicate content: By-Roles pages (SEVERITY: HIGH)**
Routes `/by-roles`, `/by-roles/managers`, `/by-roles/contributors`, `/by-roles/auditor` ALL render the same `ByRoles` component. 4 × 3 = **12 near-identical pages** in the sitemap.

**Issue #3 — ProductOverview is orphaned/thin (SEVERITY: MEDIUM)**
`/product/overview` renders a separate thin hub page (`ProductOverview.tsx`) that mostly links to sub-pages. It competes with `/product` and `/product/features` for the same intent.

**Issue #4 — Sitemap contains event page with only one slug (SEVERITY: LOW)**
Only `/events/nis2-w-polsce` is hardcoded in the sitemap. Other events from `eventsData.ts` are missing. The events themselves use `slug` per locale from the data file, but the sitemap hardcodes one Polish slug across all 3 locales.

**Issue #5 — `cybersecurity-check` in sitemap uses same path for PL/CS (SEVERITY: MEDIUM)**
The sitemap lists `/pl/cybersecurity-check/` and `/cs/cybersecurity-check/` but the actual PL URL is `/pl/sprawdz-cyberbezpieczenstwo/` and CS is `/cs/zkontrolujte-kybernetickou-bezpecnost/`. The hreflang for these is also wrong.

**Issue #6 — `grc-platform` lacks PageTemplate wrapper and hreflang (SEVERITY: MEDIUM)**
`GrcPlatform.tsx` uses a raw Helmet block instead of `PageTemplate`, so it may not have consistent hreflang across all locales.

---

### Fix Plan

#### Phase 1: Wire up dedicated product pages (eliminate 27-page duplicate cluster)

**`App.tsx`**: Import and connect the dedicated product components that already exist:
- `/product` → `Features` (keep as main product page)
- `/product/overview` → `ProductOverview` (keep)
- `/product/features` → **redirect to `/product`** (duplicate)
- `/product/ai-compliance-officer` → `ComplianceOfficer`
- `/product/task-data-management` → `TaskDataManagement`
- `/product/documents-management` → `DocumentsManagement`
- `/product/analytics-dashboards` → `AnalyticsDashboards`
- `/product/api-integrations` → `ApiIntegrations`
- `/product/value-chain` → `ValueChain`
- `/product/risk-assessment` → `RiskAssessment`

Import the 7 dedicated components that exist but aren't used. Add redirect from `/product/features` → `/product`.

#### Phase 2: Fix By-Roles duplicate cluster

The `ByRoles` component uses tabs. Route `/by-roles/managers`, `/by-roles/contributors`, `/by-roles/auditor` should open with the correct tab active. The dedicated page components (`Managers.tsx`, `Contributors.tsx`, `Auditor.tsx`) exist.

**`App.tsx`**: Wire up dedicated role pages:
- `/by-roles` → `ByRoles` (keep as hub)
- `/by-roles/managers` → `Managers`
- `/by-roles/contributors` → `Contributors`
- `/by-roles/auditor` → `Auditor`

#### Phase 3: Fix sitemap issues

**`supabase/functions/sitemap/index.ts`**:
1. Remove `/product/features` (redirect target, not canonical)
2. Fix `cybersecurity-check` — use locale-specific paths:
   - EN: `/cybersecurity-check`
   - PL: `/sprawdz-cyberbezpieczenstwo`
   - CS: `/zkontrolujte-kybernetickou-bezpecnost`
   (These need custom per-locale handling, not the generic all-locales loop)
3. Fix `/events/nis2-w-polsce` — this Polish slug shouldn't be in EN/CS sitemap. Use localized slugs from eventsData or handle per-locale.
4. Update `lastmod` dates to current date for modified pages.

#### Phase 4: Netlify redirects

**`netlify.toml`**: Add 301 redirect for `/product/features` → `/product/`.

#### Phase 5: Minor SEO fixes

1. **GrcPlatform.tsx**: Ensure proper hreflang tags for all 3 locales + x-default.
2. **ProductOverview**: Consider if this thin page should be `noIndex` or merged with `/product`. Decision: keep but ensure unique title/description.

---

### Files to modify

1. `src/App.tsx` — wire up dedicated product + role page imports, add redirect for `/product/features`
2. `supabase/functions/sitemap/index.ts` — fix duplicate/wrong URLs, locale-specific paths for cybersecurity-check and events
3. `netlify.toml` — add `/product/features` → `/product/` redirect
4. `supabase/functions/llms-txt/index.ts` — no changes needed (already correct)

### Impact

- **Before**: ~142 unindexed pages, ~39 duplicate product/role pages in sitemap
- **After**: Each product sub-page serves unique content, sitemap is clean, duplicate clusters eliminated
- **Risk**: Users who bookmarked `/product/features` get 301'd to `/product` (acceptable)

