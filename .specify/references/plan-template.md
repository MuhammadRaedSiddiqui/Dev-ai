# Implementation Plan
## Feature: [Feature Name]

> **How to use this template:**
> This plan is written AFTER the spec is approved and BEFORE implementation begins. Every section must be filled by the developer implementing the feature. Sections marked ⚠️ are mandatory. A plan with blank mandatory sections will be rejected at PR review. The spec is the what — this plan is the how. Delete this instruction block before committing.

---

### Spec Reference
- **Spec document:** `specs/[feature-name].spec.md`
- **Spec approved by:** [Name / date]
- **Plan author:** [Name / date]
- **Estimated implementation time:** [hours or days]

---

### Technical Approach ⚠️

[2–4 paragraphs describing how this feature will be implemented at a high level. Cover: the core technical mechanism, how it fits into the existing architecture, the main data flow from user action to final state, and any non-obvious implementation choices. Be specific enough that another developer could pick this up mid-way and understand the approach without asking questions.]

**Key technical decisions made in this plan:**
1. [Decision and brief rationale]
2. [Decision and brief rationale]

---

### Architecture Decisions *(one ADR per non-trivial decision)*

#### ADR-[XXX]: [Decision Title]

| Field | Detail |
|---|---|
| **Decision** | [The choice made] |
| **Alternatives considered** | [Other options evaluated] |
| **Rationale** | [Why this choice, given this project's specific constraints] |
| **Trade-offs** | [What this choice sacrifices] |
| **Consequences** | [How this affects the codebase going forward] |
| **Reversibility** | [ ] Easily reversible  [ ] Hard to reverse — [migration required if changed] |

---

### Prompt Engineering ⚠️ *(mandatory if feature touches the interview engine, bundle generation, or section regeneration)*

This section defines the exact system prompt changes or additions required. The system prompt is the product's core IP — changes must be deliberate, tested, and documented.

#### System Prompt Changes

**Section modified:** `DEVDOCS_SYSTEM_PROMPT` — [which domain or section]

**Current behaviour (before this change):**
[Describe what the prompt currently does in this area, or "N/A — new addition"]

**New or modified prompt content:**
```
[Paste the exact prompt text being added or changed. Do not summarise — write the actual text.]
```

**Rationale for this exact wording:**
[Why this phrasing was chosen over alternatives. What specific behaviour does this wording produce that other phrasings did not?]

#### Prompt Validation

Before implementation is merged, the updated prompt must be tested against all three benchmark project types and results documented here:

**Test 1 — Solo SaaS founder, 3-month deadline, limited budget:**
- Input given: [Exact inputs used in test]
- Output received: [Paste or summarise the actual AI output]
- Pass / Fail against hard rules: [ ] Pass  [ ] Fail
- Notes: [Any observations]

**Test 2 — 2-person team building an internal tool:**
- Input given: [Exact inputs used in test]
- Output received: [Paste or summarise the actual AI output]
- Pass / Fail against hard rules: [ ] Pass  [ ] Fail
- Notes: [Any observations]

**Test 3 — Bootcamp graduate building first full-stack app:**
- Input given: [Exact inputs used in test]
- Output received: [Paste or summarise the actual AI output]
- Pass / Fail against hard rules: [ ] Pass  [ ] Fail
- Notes: [Any observations]

**Output quality sign-off:** [ ] All 3 tests passed — prompt change approved for merge

#### Failure Mode Handling

| Failure scenario | Prompt behaviour | UI behaviour |
|---|---|---|
| User gives vague one-word answer | [How prompt handles this] | [What user sees] |
| User asks off-topic question mid-interview | [How prompt handles this] | [What user sees] |
| API returns partial/truncated response | [How prompt handles this] | [What user sees] |
| User contradicts a previous answer | [How prompt handles this] | [What user sees] |

---

### Data Model *(if applicable)*

#### New Tables

```
table_name
├── id (uuid, PK, default gen_random_uuid())
├── field_name (type, constraints)  -- reason this field exists
├── created_at (timestamptz, not null, default now())
├── updated_at (timestamptz, not null, default now())
└── deleted_at (timestamptz, nullable)  -- soft delete — never hard delete
```

#### Modified Tables

```
existing_table
└── + new_column (type, constraints)  -- reason for addition
```

#### Migrations

Migration filename convention: `[timestamp]_[descriptive-name].sql`

```sql
-- Migration: [timestamp]_[feature-name].sql
-- Description: [What this migration does]
-- Reversible: [Yes / No — if no, explain why]

-- UP
[SQL here]

-- DOWN (rollback)
[SQL here — if not reversible, document why and what manual steps are needed]
```

**Migration safety checklist:**
- [ ] Migration is non-destructive — no columns dropped, no data deleted
- [ ] Migration tested on a copy of staging data before applying to production
- [ ] DOWN migration written and tested
- [ ] If column is added as NOT NULL: default value provided or backfill included

#### Row Level Security Policies

```sql
-- [Table name] RLS policies

-- Users can only read their own rows
CREATE POLICY "users_select_own" ON [table_name]
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own rows
CREATE POLICY "users_insert_own" ON [table_name]
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own rows
CREATE POLICY "users_update_own" ON [table_name]
  FOR UPDATE USING (auth.uid() = user_id);

-- Soft delete only — no DELETE policy
-- [If a DELETE policy is needed, justify it explicitly here]
```

#### Indexes

```sql
-- [Index name] — optimises [query description]
CREATE INDEX [index_name] ON [table_name] ([column_name]);
```

---

### API Contracts *(if applicable)*

#### `[METHOD] /api/[path]`

**Authentication:** Supabase JWT required — middleware rejects unauthenticated requests before handler runs

**Rate limiting:** [requests per minute per user / per IP — specify which]

**Request schema (Zod):**
```typescript
const [FeatureName]RequestSchema = z.object({
  field: z.string().min(1).max(500), // reason for limits
});

type [FeatureName]Request = z.infer<typeof [FeatureName]RequestSchema>;
```

**Response type:**
```typescript
type [FeatureName]Response = {
  field: type; // description
};
```

**Handler pseudocode:**
```typescript
// 1. Validate request body against Zod schema — return 400 if invalid
// 2. Extract authenticated user from Supabase JWT
// 3. [Business logic steps]
// 4. Return structured response
// Error handling: all errors caught, logged to Sentry, user-safe message returned
```

**Error responses:**

| Status | Condition | User-safe message |
|---|---|---|
| 400 | Validation failure | [Specific message — not "Bad request"] |
| 401 | Missing or invalid JWT | "Please sign in to continue" |
| 403 | RLS policy violation / wrong user | "You don't have permission to access this resource" |
| 429 | Rate limit hit | "Too many requests — please wait [N] seconds before trying again" |
| 500 | Unhandled exception | "Something went wrong on our end — this has been reported" |

---

### Component Architecture *(if applicable)*

```
src/
└── components/
    └── [FeatureName]/
        ├── index.ts                        — named exports only, no logic
        ├── [FeatureName].tsx               — component, imports from hooks
        ├── [FeatureName].test.tsx          — unit tests
        ├── [FeatureName].types.ts          — interfaces, types, prop definitions
        └── hooks/
            ├── use[FeatureName].ts         — stateful logic, API calls
            └── use[FeatureName].test.ts    — hook unit tests
```

**State management decision:**
- [ ] Local `useState` — reason: [why local state is sufficient]
- [ ] React Context — reason: [why context is needed, which context provider]
- [ ] Server state (SWR / React Query) — reason: [why server state caching is needed]

**Key props interface:**
```typescript
interface [FeatureName]Props {
  // Required props
  prop: type; // why required

  // Optional props
  prop?: type; // default value and why optional
}
```

---

### File Changes ⚠️

List every file that will be created or modified. No surprises in the PR.

#### New Files

| File path | Purpose |
|---|---|
| `src/components/[Feature]/[Feature].tsx` | [What it does] |
| `src/components/[Feature]/hooks/use[Feature].ts` | [What it does] |
| `src/app/api/[route]/route.ts` | [What it does] |
| `supabase/migrations/[timestamp]_[name].sql` | [What it does] |
| `src/lib/[utility].ts` | [What it does] |

#### Modified Files

| File path | Change description |
|---|---|
| `src/app/[page]/page.tsx` | [Specific change — not "update to add feature"] |
| `src/lib/anthropic.ts` | [Specific change] |
| `src/types/index.ts` | [Specific change] |
| `.env.example` | [New variables added — list them] |

---

### Testing Strategy ⚠️

#### Unit Tests — `[ComponentName].test.tsx`

| Test case | What is being verified | Pass condition |
|---|---|---|
| [Renders correctly with minimal props] | Component mounts without throwing | Renders without error |
| [Shows loading state during async operation] | Loading UI appears while fetch is pending | Loading indicator visible |
| [Shows error state on API failure] | Error message shown when API returns error | Specific error text visible |
| [Shows empty state with CTA] | Empty state renders when no data present | CTA button visible and focusable |
| [Handles keyboard navigation] | All interactive elements reachable by Tab | Focus moves correctly through all elements |
| [Feature-specific test] | [What] | [Pass condition] |

#### Unit Tests — `use[FeatureName].test.ts`

| Test case | What is being verified | Pass condition |
|---|---|---|
| [Initial state is correct] | Hook initialises with expected default values | State matches defaults |
| [State updates correctly on action] | Calling action updates state as expected | State reflects change |
| [Handles error from API] | Error state set when API call fails | Error state populated, loading false |
| [Cleans up on unmount] | No memory leaks or lingering subscriptions | No warnings in test output |

#### Integration Tests

| Test case | Components / layers involved | Pass condition |
|---|---|---|
| [Full data flow — create to retrieve] | API route + Supabase + component | Data created and visible in UI |
| [RLS enforcement] | Direct Supabase query as wrong user | Returns empty, not 403 or data |
| [Auth gate] | API route without JWT | Returns 401 |

#### E2E Tests — Playwright

```typescript
// tests/[feature-name].spec.ts

test('[Primary user flow]', async ({ page }) => {
  // 1. [Setup — auth, navigate]
  // 2. [User action]
  // 3. [Assert outcome]
  // 4. [Assert PostHog event fired — if critical path]
});

test('[Error path]', async ({ page }) => {
  // 1. [Setup]
  // 2. [Trigger error condition]
  // 3. [Assert specific error message visible]
  // 4. [Assert recovery path available]
});

test('[Keyboard navigation]', async ({ page }) => {
  // 1. [Navigate to screen]
  // 2. [Tab through all interactive elements]
  // 3. [Assert each element is focusable and activatable via Enter]
});
```

#### AI Output Quality Tests *(if applicable)*

These are manual tests — document the results here before the PR is reviewed.

| Test | Input | Expected output characteristics | Actual output | Pass / Fail |
|---|---|---|---|---|
| [SaaS solo founder] | [Input] | [Expected] | [Actual — filled during testing] | [ ] |
| [Internal tool team] | [Input] | [Expected] | [Actual] | [ ] |
| [Bootcamp graduate] | [Input] | [Expected] | [Actual] | [ ] |

---

### Security Review ⚠️

Work through each item. Do not leave unchecked without a written justification.

**API Key Safety:**
- [ ] This feature does not touch the user's Anthropic API key, OR
- [ ] This feature handles the API key — confirmed by network log inspection that key does not appear in any request to `*.devdocs.ai` or Vercel functions

**Input Validation:**
- [ ] All user inputs validated with Zod schema before processing
- [ ] Zod schemas reject unexpected fields (`z.object({}).strict()` used where appropriate)
- [ ] No user input is interpolated directly into SQL — Supabase parameterised queries used

**Authentication:**
- [ ] All new API routes require Supabase JWT, OR
- [ ] Route is intentionally public — reason: [justify here]

**Data Access:**
- [ ] RLS policies written and tested for all new tables
- [ ] No query bypasses RLS using the service role key unless explicitly required — [if used, justify]

**Output Safety:**
- [ ] AI-generated content is not rendered as raw HTML — `react-markdown` used with `rehype-sanitize`
- [ ] No user-controlled content is used to construct Anthropic API prompts without sanitisation

**System Prompt Protection:**
- [ ] `DEVDOCS_SYSTEM_PROMPT` is not exposed in any client-side bundle
- [ ] Verified with: `grep -r "DEVDOCS_SYSTEM_PROMPT" .next/static` returns no results

---

### Performance Considerations ⚠️

| Concern | Mitigation | Verification |
|---|---|---|
| [Bundle size increase] | [Code split at route level / lazy import] | [Verified with: `next build` output] |
| [Database query N+1] | [Batch query / join instead of loop] | [Verified with: Supabase query log] |
| [Large AI response blocking UI] | [Streaming with incremental render] | [Verified with: manual test on slow connection] |
| [Re-render on every keystroke] | [Debounce / useMemo / useCallback] | [Verified with: React DevTools Profiler] |
| [Feature-specific concern] | [Mitigation] | [How verified] |

**Lighthouse targets — must be met on affected pages after this change:**
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 95
- [ ] SEO = 100 (landing page only)

---

### Accessibility Checklist ⚠️

- [ ] All new interactive elements reachable by keyboard — tested manually
- [ ] All new form inputs have a visible `<label>` or `aria-label`
- [ ] All new icon-only buttons have `aria-label` describing the action
- [ ] All async status changes (loading complete, error occurred) announced via `aria-live="polite"`
- [ ] Focus is managed correctly after modal open/close and after async actions complete
- [ ] New colour combinations verified at 4.5:1 contrast ratio — tool used: [WebAIM Contrast Checker / axe DevTools]
- [ ] axe DevTools run on affected pages — zero new critical or serious violations
- [ ] [Feature-specific a11y requirement from spec]

---

### Monitoring & Observability ⚠️

#### PostHog Events

List every new event added. Include the exact event name, when it fires, and the properties captured.

| Event name | Fires when | Properties | Why tracked |
|---|---|---|---|
| `[event_name]` | [Exact trigger] | `{ prop: value }` — no PII | [What decision this data informs] |

#### Sentry Error Tracking

| Error scenario | Sentry severity | Context captured |
|---|---|---|
| [API call failure] | `warning` or `error` | `{ userId, projectId, errorCode }` — no API key |
| [Unexpected exception] | `error` | `{ userId, route, input }` — sanitised |

#### Health Impact

- [ ] This feature adds a new external dependency — update `/api/health` to include its status check
- [ ] This feature has no new external dependencies — no health check change needed

---

### Rollback Plan ⚠️

**Step 1 — Application rollback:**
Revert to previous Vercel deployment: [describe which deployment, how to identify it in the Vercel dashboard]. Estimated time: < 2 minutes.

**Step 2 — Database rollback (if migration included):**
- [ ] Migration is reversible — run the DOWN migration: `supabase db push --file supabase/migrations/[timestamp]_rollback.sql`
- [ ] Migration is NOT reversible — [explain why, and document the manual recovery steps required]

**Step 3 — Verification after rollback:**
- [ ] Run smoke test: [specific user flow to verify the rollback was successful]
- [ ] Confirm PostHog shows event volumes returning to pre-deploy baseline

---

### Documentation Updates

- [ ] `README.md` updated if setup steps changed
- [ ] `.env.example` updated with any new environment variables
- [ ] `constitution.md` updated if a new technical constraint or pattern is introduced
- [ ] Inline JSDoc added to all new exported functions and hooks
- [ ] If a new API route was added: route documented in the API contracts section of the project documentation

---

### Implementation Checklist ⚠️

Complete in order. Do not mark a step done until it is fully complete — partial completion is not completion.

**Database:**
- [ ] Migration file written and named correctly
- [ ] Migration tested on staging — no errors
- [ ] RLS policies written and tested — confirmed no cross-user data access
- [ ] Indexes added for all queried columns

**Backend:**
- [ ] API route(s) implemented with Zod validation
- [ ] Auth middleware applied
- [ ] Rate limiting applied
- [ ] All error cases return user-safe messages
- [ ] No stack traces or internal details exposed in error responses
- [ ] Sentry error capture added

**Frontend:**
- [ ] Component built with all four UI states (loading, error, empty, success)
- [ ] Component keyboard navigable — tested manually
- [ ] PostHog events added and verified firing in staging
- [ ] No hardcoded colours, spacing, or font sizes — design tokens used

**AI / Prompt (if applicable):**
- [ ] System prompt changes documented in the Prompt Engineering section above
- [ ] All 3 benchmark project type tests completed and passed
- [ ] Output quality sign-off completed
- [ ] Failure modes handled and tested

**Tests:**
- [ ] Unit tests written — coverage target met
- [ ] Integration tests written and passing
- [ ] E2E test written and passing in CI
- [ ] AI output quality tests completed (manual) and documented

**Security:**
- [ ] Full security review checklist above completed
- [ ] BYOK constraint verified by network log inspection (if applicable)
- [ ] `npm audit` — no new critical vulnerabilities

**Accessibility:**
- [ ] Full accessibility checklist above completed
- [ ] axe DevTools — zero new critical or serious violations

**Performance:**
- [ ] Lighthouse targets met on affected pages
- [ ] Bundle size within limits

**Final:**
- [ ] All files listed in File Changes section are accounted for in the PR
- [ ] PR description written: what changed, why, how to test, system prompt changes noted
- [ ] Ready for review
