# CLAUDE.md — DevDocs AI Agent Rules

You are an AI coding agent working on **DevDocs AI** — a conversational, AI-powered pre-build
planning assistant for developers. Before writing a single line of code, read this file in full,
then read `memory/constitution.md` and `specs/001-devdocs-ai-mvp/plan.md`.

---

## Project Identity

**DevDocs AI** interviews developers before they start building, surfaces every critical
architectural and technical decision, and generates a 10-file structured markdown documentation
bundle that can be fed directly into AI coding agents (Claude Code, Cursor, Windsurf).

- **Stack**: Next.js 14 (App Router), shadcn/ui, Tailwind CSS, Supabase, Vercel
- **AI model**: `claude-sonnet-4-6` via Anthropic SDK (BYOK, client-side only)
- **MVP timeline**: 4–6 weeks across 4 phases

---

## Absolute Rules (Never Violate)

1. **BYOK security** — User API keys live ONLY in browser `localStorage`. Never send them to any
   DevDocs AI server endpoint. Never log them. All Anthropic SDK calls are client-side only.
2. **System prompt is server-side only** — `DEVDOCS_SYSTEM_PROMPT` env var is read server-side and
   injected per session. It is NEVER exposed in the client bundle or any API response.
3. **No secrets in code** — all secrets use Vercel encrypted environment variables. Never hardcode.
4. **RLS on every table** — every Supabase table has Row Level Security. Users can only read/write
   their own data. Test this with direct Supabase queries, not just application-layer guards.
5. **Soft deletes only** — use `deleted_at` timestamp. Never `DELETE` user data without an explicit
   user-initiated purge action.
6. **Scope lock** — implement only what is defined in `specs/001-devdocs-ai-mvp/spec.md`. New ideas
   go in BACKLOG.md. Do not implement them during MVP build.
7. **AI output quality gate** — no code that calls the Anthropic API may be merged unless the
   current `DEVDOCS_SYSTEM_PROMPT` passes all 5 archetype graders in `tests/prompts/`. A working
   interview UI backed by a failing or incomplete system prompt is not a shippable increment. If
   you cannot run the graders, block the PR and flag for human review. Output quality is a
   first-class correctness concern, not a polish concern.

---

## General Practices

- Prefer the **smallest viable diff** — do not refactor unrelated code.
- Never invent APIs, table columns, or env vars not defined in the spec or plan.
- TypeScript strict mode — zero `any` types in production code.
- All user inputs sanitised before Supabase storage — no raw HTML.
- Cite existing code with file paths when referencing or modifying files.
- Use `shadcn/ui` components before writing custom components.
- Rate limit all API routes with Vercel Edge Middleware (100 req/min/IP).

## Execution Contract

For every coding task:
1. State which user story and task ID this implements (e.g. US2 / T014).
2. List any constitution constraints that apply.
3. Produce the implementation with acceptance checks inlined as comments or test assertions.
4. Flag any decision that would require a constitution amendment — do not proceed without consent.

## Testing Requirements

- Unit tests: Vitest — target 80% coverage on utilities and state management.
- Integration tests: Playwright component tests against Supabase test project.
- E2E tests: Playwright against staging environment.
- Tests are written BEFORE implementation (TDD). Verify tests FAIL before implementing.
- CI gates: all unit + integration tests passing, TypeScript zero errors, ESLint zero errors,
  Lighthouse CI ≥ 85, zero critical axe accessibility violations.

## Prompt Evaluation Flywheel

When writing or refining the master system prompt (`DEVDOCS_SYSTEM_PROMPT`):

1. **Analyse** — list likely failure modes per project type and translate to binary pass/fail oracles.
2. **Measure** — create strict PASS/FAIL graders: does the output for project type X include a
   complete schema? Does it recommend architecture based on the user's stated constraints?
3. **Improve** — when a grader FAILs, adjust the smallest part of the prompt that caused the
   failure. Re-run graders until PASS. Never expand the prompt without a failing test that justifies it.

Test the system prompt against these 5 project archetypes minimum before any production release:
- Solo founder, SaaS, 3-month deadline, PostgreSQL, moderate backend experience
- Bootcamp graduate, internal tool, 2-week deadline, no backend experience
- Small team, API-only service, needs authentication and rate limiting
- Mobile app (React Native), needs offline support, no existing backend
- Landing page + waitlist, simple, no database

---

## Key File Locations

| File | Purpose |
|------|---------|
| `memory/constitution.md` | Project governing principles — read first |
| `specs/001-devdocs-ai-mvp/spec.md` | Full MVP feature specification with user stories |
| `specs/001-devdocs-ai-mvp/plan.md` | Technical implementation plan with ADRs |
| `specs/001-devdocs-ai-mvp/data-model.md` | Database schema and RLS policies |
| `specs/001-devdocs-ai-mvp/tasks.md` | Ordered task list — check off as you go |
| `specs/001-devdocs-ai-mvp/contracts/` | API route contracts |
| `history/prompts/` | Prompt History Records per session |
