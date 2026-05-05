# Specification
## Feature: [Feature Name]

> **How to use this template:**
> Fill every section before any implementation begins. Sections marked ⚠️ are mandatory — a spec with these blank will be rejected. Sections marked (if applicable) may be skipped with a written justification. Delete this instruction block before committing.

---

### Overview
[1–2 sentences: what is being built, why it exists, and what user problem it solves. Be specific. "Improve the user experience" is not acceptable here.]

**Feature type:** [ ] Core interview engine  [ ] Documentation generation  [ ] UI/UX  [ ] Auth/BYOK  [ ] Export  [ ] Infrastructure

---

### User Stories ⚠️

Write stories from the perspective of the primary user (a junior–mid developer using AI coding tools). Each story must include the outcome — what the user is able to do or feel after this feature exists that they could not before.

- As a developer starting a new project, I want to [action] so that [specific outcome — confidence, time saved, decision made]
- As a developer returning to an existing project, I want to [action] so that [specific outcome]
- As a developer who [edge case persona], I want to [action] so that [specific outcome]

**Confidence outcome statement:** After using this feature, the developer should feel: [complete this sentence — this is the north star for the feature]

---

### Functional Requirements ⚠️

Number each requirement. Be explicit enough that a coding agent can implement it and a human can verify it without asking follow-up questions. Avoid "should" — use "must."

1. [Requirement]
2. [Requirement]
3. [Requirement]

---

### Non-Functional Requirements ⚠️

- **Performance:** [Specific target — e.g., "Interview screen must reach interactive in under 2 seconds on a 4G connection"]
- **Security:** [Specific requirement — always include BYOK constraint if feature touches API keys: "The Anthropic API key must not appear in any network request to DevDocs servers, confirmed by network log inspection"]
- **Accessibility:** WCAG 2.1 AA. Specific additions: [any feature-specific a11y requirements]
- **Scalability:** [How this feature behaves at 100 users, 10,000 users — note any limits]
- **Error tolerance:** [What happens when this feature's dependencies fail — Supabase down, Anthropic API quota exceeded, network timeout]

---

### AI Behaviour Specification ⚠️ *(mandatory if feature touches interview, bundle generation, or regeneration)*

This section defines what the AI must do, how it must sound, and what constitutes passing vs failing output. Without this section, AI-touching features cannot be reviewed or merged.

#### Persona and Tone
[Describe the voice the AI must use for this feature. Reference: direct, opinionated, senior developer with 10+ years experience. Avoid hedging language. Make recommendations, not lists of options.]

#### Input → Expected Output Examples

Provide a minimum of 3 examples covering: a typical case, an ambiguous/vague input, and an edge case input.

**Example 1 — [Project type]:**
- Input: [What the user said or selected]
- Expected output characteristics: [What the AI response must contain, the recommendation it must make, the tone it must use]
- Failure signal: [What the output must NOT contain — e.g., "must not list 5 database options without recommending one"]

**Example 2 — [Vague/ambiguous input]:**
- Input: [Deliberately vague user input]
- Expected output characteristics: [How the AI handles ambiguity — does it ask a clarifying question or make a reasonable assumption? Define which is correct for this context.]
- Failure signal: [What would indicate the AI is lost or producing generic output]

**Example 3 — [Edge case]:**
- Input: [Unusual stack, niche use case, or contradictory requirements]
- Expected output characteristics: [How the AI handles this case specifically]
- Failure signal: [What would indicate failure for this case]

#### Hard Rules for AI Output in This Feature
- [ ] Must make a specific recommendation, not list options without a conclusion
- [ ] Must include reasoning for every recommendation ("use X because Y, given your constraint Z")
- [ ] Must not use the phrases: "it depends", "you could consider", "there are several options", "it's up to you"
- [ ] Must [feature-specific rule]
- [ ] Must [feature-specific rule]

#### Quality Review Gate
Before this feature is merged, the output must be manually tested against these 3 project types and pass all hard rules above:
1. Solo founder building a SaaS product, 3-month deadline, limited budget
2. 2-person team building an internal tool, no public users
3. Bootcamp graduate building their first full-stack app to show employers

---

### User Interface ⚠️

Describe every screen, state, and interaction. Be specific enough that a designer or developer can build it without a wireframe.

#### Screens / Components Affected
- [Screen name]: [What changes or is added]

#### All UI States

For every async operation in this feature, define all four states explicitly:

**[Operation name]:**
- **Loading state:** [Exact loading UI — skeleton, spinner, progress bar, streaming text. Specify which.]
- **Error state:** [Exact error message text and available actions. "Something went wrong" is not acceptable.]
- **Empty state:** [What the user sees when there is no data yet. Must include a call to action.]
- **Success state:** [What the user sees when the operation completes successfully.]

#### Interactions and Transitions
[Describe user interactions: what happens on click, on keyboard input, on focus, on form submission. Include keyboard shortcuts if relevant.]

---

### Data Model *(if applicable)*

#### New or Modified Tables

```
table_name
├── id (uuid, PK)
├── field_name (type, constraints, reason for this field)
├── created_at (timestamptz, not null, default now())
├── updated_at (timestamptz, not null, default now())
└── deleted_at (timestamptz, nullable — soft delete)
```

#### Row Level Security Policies
[Define the RLS policies required for each table. Every table must have RLS. Policy must specify: which role can read, which can insert, which can update, which can delete, and the condition.]

#### Indexes
[List any indexes beyond the primary key. Justify each one with the query it optimises.]

---

### API Contracts *(if applicable)*

#### Endpoint: `[METHOD] /api/[path]`

**Purpose:** [One sentence]

**Authentication:** [ ] Required (Supabase JWT)  [ ] Not required

**Request:**
```typescript
{
  field: type // description
}
```

**Response — 200:**
```typescript
{
  field: type // description
}
```

**Response — error cases:**
| Status | Condition | Response body |
|---|---|---|
| 400 | [Condition] | `{ error: "[User-safe message]" }` |
| 401 | Unauthenticated | `{ error: "Authentication required" }` |
| 429 | Rate limit exceeded | `{ error: "Too many requests", retryAfter: number }` |
| 500 | Unexpected server error | `{ error: "An unexpected error occurred" }` — never expose stack traces |

---

### Component Architecture *(if applicable)*

```
ComponentName/
├── index.ts                     — public exports only
├── ComponentName.tsx            — component logic
├── ComponentName.test.tsx       — unit tests
├── ComponentName.types.ts       — TypeScript interfaces and types
├── ComponentName.stories.tsx    — Storybook stories (if design system component)
└── hooks/
    └── useComponentName.ts      — stateful logic extracted from component
```

**State management approach:** [Local state / Context / Zustand / Server state via SWR or React Query — specify which and why for this component]

---

### Edge Cases ⚠️

Do not leave these as bullets to fill in later. Define each edge case explicitly. For AI-interview features, edge cases are especially critical.

| Edge case | Expected behaviour | Failure mode to avoid |
|---|---|---|
| User gives a one-word answer to an interview question | [Behaviour] | AI must not accept this and move on — it must ask for more detail |
| User contradicts a previous answer (e.g., says "small budget" then requests enterprise features) | [Behaviour] | AI must surface the contradiction explicitly, not silently choose one |
| User asks a question mid-interview instead of answering | [Behaviour] | AI must answer the question then re-ask the original prompt |
| Anthropic API call fails mid-interview | [Behaviour] | Must not lose interview progress — state persisted to Supabase before each call |
| User's API key quota is exhausted mid-interview | [Behaviour] | Specific error message with link to Anthropic billing — not generic error |
| User closes the browser mid-interview | [Behaviour] | Interview must resume from exact point on reopen |
| [Feature-specific edge case] | [Behaviour] | [Failure mode] |

---

### Out of Scope ⚠️

Be explicit. Every item here prevents scope creep during implementation.

- [What is explicitly not included in this feature]
- [What a developer might reasonably assume is included but is not]
- [Any MVP out-of-scope items from the constitution that this feature might tempt]

---

### Dependencies

**External:**
- [Anthropic API — note any specific model behaviour dependencies]
- [Supabase — note any specific feature usage]
- [Any npm package — version pinned]

**Internal:**
- [Other features or components this depends on being complete first]
- [Shared hooks, utilities, or context providers this uses]

---

### Success Metrics ⚠️

Define measurable outcomes, not vague goals. Every metric must have a target value and a measurement method.

| Metric | Target | How measured |
|---|---|---|
| [e.g., Interview completion rate] | [e.g., > 40% of users who start complete all 10 domains] | PostHog funnel: `interview_started` → `interview_completed` |
| [e.g., Time to first bundle export] | [e.g., < 30 minutes from interview start] | PostHog event timing: `interview_started` to `bundle_exported` |
| [e.g., Output quality — manual] | [e.g., 4/5 beta users rate output as "useful or very useful"] | Manual survey sent to first 20 beta users |
| [Feature-specific metric] | [Target] | [Method] |

---

### Security Considerations ⚠️

- [ ] Does this feature touch or could it accidentally expose the user's API key? If yes: [describe the specific mitigation]
- [ ] Does this feature add a new server-side API route? If yes: [confirm RLS or JWT auth is applied]
- [ ] Does this feature store new user data? If yes: [confirm RLS policy is defined in the Data Model section above]
- [ ] Does this feature accept user input? If yes: [confirm Zod validation schema is defined in the API contract above]
- [ ] Could this feature be used to exfiltrate data via the system prompt or AI output? If yes: [describe mitigation]

---

### Accessibility Considerations ⚠️

- [ ] All new interactive elements are keyboard-navigable
- [ ] All new form inputs have associated `<label>` elements
- [ ] All new icons have `aria-label` or `aria-hidden` as appropriate
- [ ] Any new async status changes announce via `aria-live`
- [ ] Colour contrast meets 4.5:1 for body text — [list any specific new colour pairs introduced]
- [ ] [Feature-specific a11y requirement]

---

### Review & Acceptance Checklist ⚠️

This checklist must be completed by the reviewer before approving the PR. A PR where these are unchecked cannot be merged.

**Spec completeness:**
- [ ] All user stories have a confidence outcome statement
- [ ] All functional requirements are specific and verifiable
- [ ] All edge cases are defined with expected behaviour
- [ ] Out of scope is explicitly stated
- [ ] Success metrics have numeric targets and measurement methods

**AI output quality (if applicable):**
- [ ] AI behaviour specification is complete with 3 input/output examples
- [ ] Hard rules for AI output are defined
- [ ] Quality review gate has been executed against all 3 project types
- [ ] No generic output detected — all responses are specific and opinionated

**Security:**
- [ ] BYOK constraint verified — no key transmitted to server (confirmed by network log)
- [ ] All new routes have auth or explicit justification for why they do not
- [ ] All new user inputs have Zod validation

**Accessibility:**
- [ ] axe DevTools run — zero new critical or serious violations

**Testing:**
- [ ] Unit tests cover all utility functions introduced
- [ ] E2E test covers the primary user flow for this feature
- [ ] All four UI states tested (loading, error, empty, success)
