# DevDocs AI - Claude Code Instructions

## Project Overview
DevDocs AI is an AI-powered pre-build planning assistant that interviews developers before they start coding and generates a complete documentation bundle (10 structured markdown files) optimized for AI coding agents like Claude Code, Cursor, and Windsurf.

## Key Context
- **Target Users**: Junior and mid-level developers, solo founders, bootcamp graduates
- **Core Problem**: Missing or incomplete project planning causes expensive rework when using AI coding tools
- **Solution**: Conversational AI interview that surfaces all architectural decisions upfront
- **Business Model**: BYOK (Bring Your Own Key) free tier → $12/month Pro → $35/seat Team

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth (email + Google OAuth)
- **AI**: Anthropic SDK (client-side, BYOK model with claude-sonnet-4-6)
- **Hosting**: Vercel
- **Testing**: Vitest (unit), Playwright (E2E)
- **Monitoring**: Sentry (errors), PostHog (analytics)

## Architecture Decisions

### ADR-001: BYOK (Bring Your Own Key) Model
Users supply their own Anthropic API key. All AI calls are made client-side directly to Anthropic API. Keys stored in browser localStorage only, never transmitted to our servers. This eliminates API costs during validation phase.

### ADR-002: Client-Side AI Processing
All interview logic and documentation generation happens in the browser using the Anthropic SDK. The system prompt is served from a server function but execution is client-side.

### ADR-003: Supabase for Everything
Using Supabase for PostgreSQL database, authentication, and row-level security. This eliminates the need for custom auth logic and provides built-in security at the database layer.

## Project Structure
```
/app                    # Next.js App Router pages
  /api                  # Server-side API routes
  /(auth)              # Authentication pages
  /(app)               # Main application pages
/components            # React components
  /ui                  # shadcn/ui components
/lib                   # Utility functions
  /ai                  # Anthropic SDK integration
  /supabase           # Supabase client
/public               # Static assets
/.specify             # Spec-driven development artifacts
  /specs              # Feature specifications
  /memory             # Project memory and constitution
```

## Development Guidelines

### When Writing Code
1. **Read before writing** - Always check existing patterns and conventions
2. **Type safety** - Use TypeScript strict mode, no `any` types
3. **Security first** - Never expose API keys, always use RLS policies
4. **Test coverage** - Write tests for all utility functions and critical paths
5. **Accessibility** - All interactive elements must be keyboard accessible

### File Naming Conventions
- Components: PascalCase (e.g., `InterviewChat.tsx`)
- Utilities: camelCase (e.g., `formatMarkdown.ts`)
- Pages: kebab-case (e.g., `project-dashboard`)
- Types: PascalCase with `.types.ts` suffix

### Git Workflow
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Commit messages: Conventional Commits format
- Always create new commits, never amend unless explicitly requested

### Testing Requirements
- Unit tests for all utility functions (80% coverage target)
- Integration tests for API routes and database operations
- E2E tests for critical user paths (register → interview → export)
- All tests must pass before PR merge

## Key Features (MVP Scope)

### Phase 1: Foundation (Weeks 1-2)
- [ ] Next.js project setup with App Router
- [ ] Supabase configuration (schema, RLS, Auth)
- [ ] BYOK key setup flow with validation
- [ ] User registration and login
- [ ] Basic project dashboard
- [ ] Vercel deployment

### Phase 2: Core Product (Weeks 3-5)
- [ ] AI interview chat interface with streaming
- [ ] 10-domain system prompt implementation
- [ ] Live documentation bundle preview
- [ ] Bundle editor with markdown editing
- [ ] ZIP export functionality
- [ ] Share link generation
- [ ] Project templates (5 types)
- [ ] Regenerate section feature

### Phase 3: Polish (Weeks 6-8)
- [ ] Landing page with SEO
- [ ] Onboarding tutorial
- [ ] Error handling and loading states
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Analytics integration
- [ ] Dark mode

## Documentation Bundle Output
The product generates 10 markdown files:
1. PLANNING.md - Scope, MVP, timeline, success metrics
2. ARCHITECTURE.md - ADRs, tech stack, system design
3. DATABASE.md - Schema, migrations, indexing
4. API-CONTRACTS.md - Endpoint definitions, auth requirements
5. ENV-STRATEGY.md - Environments, secrets management
6. AUTH.md - Authentication and authorization architecture
7. TESTING.md - Testing pyramid, tools, coverage targets
8. MONITORING.md - Four golden signals, alerting, logging
9. FRONTEND.md - Design system, component architecture, a11y
10. DEPLOYMENT.md - Hosting, CI/CD, rollback strategy

## Important Constraints
- **MVP Timeline**: 4-6 weeks
- **No feature creep**: Stick to defined MVP scope
- **Security non-negotiable**: API key security and RLS are mandatory
- **Accessibility required**: WCAG 2.1 AA compliance before launch
- **Performance targets**: Lighthouse 90+ on all metrics

## Reference Documentation
See `DevDocs_AI_Project.md` for complete project specification including:
- Detailed problem statement and market analysis
- Complete technical architecture and database schema
- Testing strategy and security requirements
- Monitoring and deployment strategy
- Go-to-market plan and monetization strategy
- Risk register and competitor analysis

## Working with Claude Code
- Always read the constitution (`.specify/memory/constitution.md`) before starting work
- Check existing specs in `.specify/specs/` for feature context
- Use `/sp.specify` to create new feature specifications
- Use `/sp.plan` to generate technical implementation plans
- Use `/sp.implement` to execute planned tasks
- Refer to `DevDocs_AI_Project.md` for architectural decisions
