# Project Constitution
## DevDocs AI — Pre-Build Planning Assistant

---

## Project Overview

DevDocs AI is an AI-powered pre-build planning assistant for developers. It conducts a structured, conversational interview before a single line of code is written, surfaces every critical architectural and technical decision, and generates a 10-file documentation bundle optimised for direct consumption by AI coding agents (Claude Code, Cursor, Windsurf).

**Core positioning:** The thinking layer before AI coding — not a documentation tool.

**Primary user:** Junior to mid-level developers (0–3 years) building with AI coding agents who do not yet know what architectural decisions they are skipping.

**Business model:** BYOK (Bring Your Own Key) — users supply their own Anthropic API key. All AI calls are made client-side directly to the Anthropic API. The operator never holds, proxies, or logs user API keys under any circumstance.

---

## Core Principles

### 1. AI Output Quality Is a Build Requirement

The documentation bundle produced by the interview is the entire product. Generic, vague, or boilerplate output is a build failure — not a UX issue.

**Hard rules for all AI-touching code:**
- Every feature that produces or modifies AI output must include a quality benchmark: 3 example project types (SaaS, API-only, internal tool) with expected output samples
- Output must read like guidance from a senior developer with 10+ years experience — opinionated, specific, and reasoned
- The phrases "it depends", "you could consider", and "there are many options" are failure signals in output — the system must make a recommendation with justification
- Before any AI-related code is merged, the output must be manually reviewed against the quality benchmark. Passing CI tests alone is not sufficient.
- If output quality cannot be verified — the feature is not done

### 2. BYOK Security Is an Absolute Constraint

This is not a coding guideline. It is a constitutional constraint that cannot be relaxed under any circumstance.

**Hard rules:**
- User API keys are stored exclusively in the user's browser `localStorage`
- Keys are never transmitted to DevDocs AI servers — not in request headers, bodies, logs, or analytics events
- All Anthropic API calls are made client-side directly to `api.anthropic.com`
- The Content Security Policy must explicitly whitelist only `api.anthropic.com` and the Supabase project URL for outbound fetch
- No server-side function may accept, log, or process a user's API key
- Any code that could accidentally capture a key (middleware, logging, analytics) must be explicitly tested to confirm the key does not appear

**The system prompt (`DEVDOCS_SYSTEM_PROMPT`) is the only server-side secret related to AI.** It is served from a server function to the client as part of each API call setup. It is never hardcoded client-side, never committed to version control, and never returned in an API response that could be read by the user.

### 3. Code Quality

- TypeScript strict mode enabled across the entire codebase — no `any` types without explicit justification in a comment
- Write clean, readable code over clever code — the next developer (or AI agent) reading this must understand it without context
- Follow established patterns already in the codebase before introducing new ones
- Every function longer than 20 lines must have a JSDoc comment explaining its purpose, parameters, and return value
- No `console.log` in production code — use the structured logger

### 4. Security

- Row Level Security (RLS) enabled on all Supabase tables — enforced at the database layer, not just application layer
- Validate and sanitise all user inputs at the API boundary using Zod schemas
- Follow OWASP Top 10 guidelines
- Dependencies audited on every CI run via `npm audit` — critical vulnerabilities block deployment
- No secrets in client-side code. Environment variables prefixed `NEXT_PUBLIC_` are public by definition — treat them accordingly

### 5. Testing Standards

- Follow the 70/20/10 pyramid: 70% unit, 20% integration, 10% e2e
- 80% coverage target for all utility functions and state management code
- All critical user paths must have Playwright e2e tests: registration, BYOK setup, full interview, bundle export
- Tests must pass before any PR merge — this is enforced by CI, not honour system
- Test AI output quality: every domain of the system prompt must have a test fixture with known input → expected output characteristics. These are reviewed manually, not asserted programmatically.
- Never run tests against the production database — use a dedicated test Supabase project

### 6. Performance

- Lighthouse scores must exceed: 90 performance, 90 accessibility, 95 best practices, 100 SEO on the landing page
- Bundle size alert: warn at 200KB gzipped, block deployment at 350KB gzipped
- Code split at route level — the interview page bundle must not include dashboard code
- All images served in WebP format with explicit width/height to prevent CLS
- Fonts self-hosted with `font-display: swap` — no Google Fonts CDN in production

### 7. Accessibility

- WCAG 2.1 AA compliance is mandatory — not a nice-to-have
- Full keyboard navigation: every interactive element reachable via Tab, activated via Enter/Space
- Screen reader compatible: all form inputs labelled, all icons have `aria-label`, all async status changes announced via `aria-live`
- Minimum 4.5:1 colour contrast ratio for all body text; 3:1 for large text and UI components
- Run axe DevTools before every release — zero critical or serious violations permitted
- The interview chat interface must be fully operable by keyboard alone

### 8. User Experience

- Developer-first design: clarity, density, and precision over decoration
- Every async operation must implement all four states: loading, error, empty, success — in that order of implementation
- Empty states are first-class UI — they must include a clear explanation and a specific call to action
- Error messages must be specific and actionable — "Something went wrong" is not an acceptable error message
- No auto-playing media, no animations that cannot be paused, no modals that cannot be closed with Escape

### 9. Development Workflow

- Feature branches: `feat/`, `fix/`, `chore/` prefixes with descriptive names
- PR reviews required before merge — no self-merges to `main`
- Semantic commit messages: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
- Every PR must include: what changed, why it changed, how to test it, and whether it touches the system prompt (if yes, output quality review required)
- CI/CD pipeline gates: TypeScript compilation, ESLint, unit tests, integration tests, Lighthouse CI, axe accessibility check

---

## Technical Constraints

These are fixed for the MVP. Do not introduce alternatives without updating this constitution and getting explicit approval.

| Layer | Technology | Rationale |
|---|---|---|
| Frontend framework | Next.js 14, App Router | SSG for marketing, CSR for app, mature ecosystem |
| UI components | shadcn/ui + Tailwind CSS | Customisable, accessible primitives |
| AI SDK | Anthropic SDK, client-side, BYOK | Zero operator API cost, self-selecting users |
| AI Model | `claude-sonnet-4-6` | Best multi-turn reasoning for technical interviews |
| Database + Auth | Supabase (PostgreSQL + Supabase Auth) | Managed, RLS built-in, generous free tier |
| Hosting | Vercel | Zero-config Next.js deployment, preview environments |
| ZIP export | JSZip | Lightweight, browser-compatible |
| Error tracking | Sentry | Source maps, session replay |
| Analytics | PostHog | Privacy-preserving, self-hostable |
| Testing — unit | Vitest | Fast, native TypeScript, ESM compatible |
| Testing — e2e | Playwright | Cross-browser, reliable |
| Markdown editor | CodeMirror 6 | Extensible, accessible, maintained |
| Markdown preview | react-markdown + remark-gfm | Standard, well-tested |

---

## Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Admin Supabase operations |
| `DEVDOCS_SYSTEM_PROMPT` | Server only — NEVER client | Master AI interview system prompt |
| `SENTRY_DSN` | Server only | Error tracking |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client | Product analytics (non-PII only) |

**Rule:** If a variable is not in this table, it does not exist in this project. Adding a new environment variable requires updating this table and the `.env.example` file in the same commit.

---

## Out of Scope — MVP

The following will not be built until after the MVP is validated with paying users. Any code added for these features before that point is a scope violation.

- VS Code extension
- MCP server integration
- CLI tool (`devdocs init`)
- Team collaboration and shared workspaces
- Hosted API key tier (operator-managed keys)
- GitHub repository integration
- Documentation drift detection
- PDF export
- Dark mode (nice-to-have, post-validation)
- Share links (post-validation)

---

## Definition of Done

A feature is done when **all** of the following are true:

- [ ] TypeScript compiles with zero errors
- [ ] All unit and integration tests pass
- [ ] E2E test written and passing for any new user-facing flow
- [ ] Lighthouse scores meet targets on affected pages
- [ ] Zero new critical/serious axe accessibility violations
- [ ] All four UI states implemented (loading, error, empty, success) for any async operation
- [ ] If the feature touches AI output: manual quality review against 3 project type benchmarks completed and documented in the PR
- [ ] If the feature touches auth or API keys: explicit test confirming no key is transmitted to DevDocs servers
- [ ] PostHog event added and verified firing in staging for any new user action worth tracking
- [ ] PR description documents what changed, why, and how to test it
