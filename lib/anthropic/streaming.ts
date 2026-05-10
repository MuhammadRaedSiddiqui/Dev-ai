import type Anthropic from '@anthropic-ai/sdk'
import { detectDomainCompletion, extractMarkdownContent } from '@/lib/interview/completion'
import type { DomainId } from '@/lib/interview/domains'

/**
 * Streaming Utilities for Anthropic SDK
 *
 * Handles streaming responses from the Anthropic API and processes them
 * for the interview UI.
 */

export interface StreamConfig {
  model: string
  systemPrompt: string
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  onToken?: (token: string) => void
  onComplete?: (fullMessage: string) => void
  onDomainComplete?: (domainId: DomainId, content: string) => void
  onError?: (error: Error) => void
  useMockMode?: boolean
}

/**
 * Stream an interview response from the Anthropic API
 *
 * This function handles:
 * - Streaming tokens in real-time
 * - Detecting domain completion signals
 * - Extracting generated documentation content
 * - Error handling
 */
export async function streamInterviewResponse(
  client: Anthropic | null,
  config: StreamConfig
): Promise<string> {
  // Use mock mode if enabled or no client provided
  if (config.useMockMode || !client) {
    return streamMockResponse(config)
  }

  let fullMessage = ''

  try {
    const stream = await client.messages.stream({
      model: config.model,
      max_tokens: 4096,
      system: config.systemPrompt,
      messages: config.messages,
    })

    // Process streaming tokens
    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        const token = chunk.delta.text
        fullMessage += token

        // Call token callback for real-time UI updates
        if (config.onToken) {
          config.onToken(token)
        }
      }
    }

    // Check for domain completion signal
    const completion = detectDomainCompletion(fullMessage)

    if (completion.detected && completion.domainId && completion.content) {
      // Extract the markdown content for this domain
      const markdownContent = extractMarkdownContent(
        completion.content,
        completion.domainId
      )

      // Call domain completion callback
      if (config.onDomainComplete) {
        config.onDomainComplete(completion.domainId, markdownContent)
      }
    }

    // Call completion callback
    if (config.onComplete) {
      config.onComplete(fullMessage)
    }

    return fullMessage
  } catch (error) {
    console.error('Streaming error:', error)

    if (config.onError) {
      config.onError(error as Error)
    }

    throw error
  }
}

/**
 * Mock streaming response for development/testing
 */
async function streamMockResponse(config: StreamConfig): Promise<string> {
  const lastUserMessage = config.messages[config.messages.length - 1]?.content || ''
  const conversationLength = config.messages.length

  // Determine which domain we're in based on conversation length
  const domainIndex = Math.floor(conversationLength / 4) // Roughly 2 exchanges per domain
  const domains: DomainId[] = [
    'planning',
    'architecture',
    'database',
    'api',
    'environment',
    'auth',
    'testing',
    'monitoring',
    'frontend',
    'deployment'
  ]

  const currentDomain = domains[Math.min(domainIndex, domains.length - 1)]

  // Generate mock response based on domain
  const mockResponses: Record<DomainId, string> = {
    planning: `Great! Let me help you plan this project.

Based on what you've described, here are the key considerations:

**Project Scope:**
- MVP timeline: 3 months
- Team size: Solo founder
- Target users: Project managers and teams

**Core Features for MVP:**
1. User authentication and profiles
2. Project creation and management
3. Task tracking with status updates
4. Basic collaboration (comments, assignments)
5. Simple dashboard with metrics

**What to defer post-MVP:**
- Advanced reporting and analytics
- Mobile apps (start with responsive web)
- Third-party integrations
- Custom workflows

**Success Metrics:**
- 100 active users in first month
- 70% task completion rate
- < 2 second page load time

[DOMAIN_COMPLETE: planning]

# Planning & Scope

## Project Overview
SaaS project management tool for small teams, MVP in 3 months.

## Core Features
- User authentication
- Project & task management
- Real-time collaboration
- Dashboard analytics

## Timeline
- Month 1: Auth + basic CRUD
- Month 2: Collaboration features
- Month 3: Polish + deployment`,

    architecture: `Let's design the architecture for your SaaS application.

**Recommended Stack:**
- **Frontend:** Next.js 14 (App Router) with TypeScript
- **Backend:** Next.js API routes (monolith for MVP)
- **Database:** PostgreSQL via Supabase
- **Auth:** Supabase Auth
- **Hosting:** Vercel

**Why this stack for a solo founder?**
1. Single codebase (faster development)
2. Built-in API routes (no separate backend)
3. Supabase handles auth + database (less infrastructure)
4. Vercel deployment is seamless with Next.js

**Architecture Pattern:**
- Monolithic Next.js app (not microservices)
- Server-side rendering for SEO
- Client-side state with Zustand
- Row-level security in database

[DOMAIN_COMPLETE: architecture]

# Architecture

## Stack
- Next.js 14 + TypeScript
- PostgreSQL (Supabase)
- Vercel hosting

## Pattern
Monolithic architecture with server-side rendering and client-side state management.`,

    database: `Let's design your database schema.

**Core Tables:**

1. **users** (handled by Supabase Auth)
   - id, email, created_at

2. **profiles**
   - id (FK to users)
   - display_name
   - avatar_url
   - plan (free/pro)

3. **projects**
   - id, name, description
   - owner_id (FK to users)
   - created_at, updated_at

4. **tasks**
   - id, title, description
   - project_id (FK to projects)
   - assignee_id (FK to users)
   - status (todo/in_progress/done)
   - priority (low/medium/high)
   - due_date

5. **comments**
   - id, content
   - task_id (FK to tasks)
   - author_id (FK to users)
   - created_at

**Indexes:**
- projects.owner_id
- tasks.project_id
- tasks.assignee_id
- comments.task_id

[DOMAIN_COMPLETE: database]

# Database Schema

## Tables
- profiles, projects, tasks, comments

## Relationships
- Users own projects
- Projects contain tasks
- Tasks have assignees and comments`,

    api: `Let's define your API contracts.

**REST API Endpoints:**

**Projects:**
- GET /api/projects - List user's projects
- POST /api/projects - Create project
- GET /api/projects/[id] - Get project details
- PATCH /api/projects/[id] - Update project
- DELETE /api/projects/[id] - Soft delete

**Tasks:**
- GET /api/projects/[id]/tasks - List tasks
- POST /api/projects/[id]/tasks - Create task
- PATCH /api/tasks/[id] - Update task
- DELETE /api/tasks/[id] - Delete task

**Comments:**
- GET /api/tasks/[id]/comments - List comments
- POST /api/tasks/[id]/comments - Add comment

**Response Format:**
\`\`\`json
{
  "data": {...},
  "error": null
}
\`\`\`

[DOMAIN_COMPLETE: api]

# API Contracts

## Endpoints
RESTful API with /api/projects, /api/tasks, /api/comments

## Authentication
Bearer token via Supabase Auth`,

    environment: `Let's set up your environment configuration.

**Environment Variables:**

**.env.local (Development):**
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

**.env.production (Vercel):**
- Same variables, production values
- Add via Vercel dashboard

**Secrets Management:**
- Never commit .env files
- Use Vercel encrypted env vars
- Rotate keys quarterly

[DOMAIN_COMPLETE: environment]

# Environment Strategy

## Variables
Supabase credentials, app URL, feature flags

## Management
Vercel environment variables with encryption`,

    auth: `Let's implement authentication.

**Auth Strategy:**
- **Provider:** Supabase Auth
- **Methods:** Email/password + Google OAuth
- **Session:** JWT tokens (httpOnly cookies)
- **RLS:** Row-level security in database

**Implementation:**
1. Supabase handles auth flow
2. Middleware protects routes
3. RLS policies enforce data access
4. Client checks auth state

**Security:**
- Email verification required
- Password min 8 characters
- Rate limiting on auth endpoints
- Session expires after 7 days

[DOMAIN_COMPLETE: auth]

# Authentication

## Provider
Supabase Auth with email + Google OAuth

## Security
Email verification, RLS policies, rate limiting`,

    testing: `Let's plan your testing strategy.

**Testing Pyramid:**

1. **Unit Tests (Vitest)**
   - Utility functions
   - State management
   - Business logic
   - Target: 80% coverage

2. **Integration Tests (Playwright)**
   - API routes
   - Database operations
   - Auth flows

3. **E2E Tests (Playwright)**
   - Critical user paths
   - Project creation flow
   - Task management flow

**CI/CD:**
- Run tests on every PR
- Block merge if tests fail
- Deploy only after tests pass

[DOMAIN_COMPLETE: testing]

# Testing Strategy

## Levels
Unit (Vitest), Integration (Playwright), E2E

## Coverage
80% target, focus on critical paths`,

    monitoring: `Let's set up monitoring and observability.

**Monitoring Stack:**

1. **Error Tracking:** Sentry
   - Catch all runtime errors
   - User context included
   - Source maps for debugging

2. **Analytics:** PostHog
   - User behavior tracking
   - Feature usage metrics
   - Conversion funnels

3. **Performance:** Vercel Analytics
   - Page load times
   - Core Web Vitals
   - API response times

**Alerts:**
- Error rate > 1%
- API latency > 2s
- Database connection failures

[DOMAIN_COMPLETE: monitoring]

# Monitoring

## Tools
Sentry (errors), PostHog (analytics), Vercel (performance)

## Alerts
Error rate, latency, uptime`,

    frontend: `Let's design your frontend architecture.

**UI Framework:**
- **Base:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State:** Zustand for global state
- **Forms:** React Hook Form + Zod

**Key Pages:**
1. Landing page (/)
2. Dashboard (/dashboard)
3. Project view (/projects/[id])
4. Task board (/projects/[id]/tasks)

**UX Principles:**
- Mobile-first responsive design
- Loading states for all async ops
- Optimistic UI updates
- Keyboard shortcuts for power users

[DOMAIN_COMPLETE: frontend]

# Frontend Architecture

## Stack
Next.js 14, Tailwind CSS, shadcn/ui, Zustand

## Pages
Landing, dashboard, project view, task board`,

    deployment: `Let's plan your deployment strategy.

**Hosting:** Vercel
- Automatic deployments from GitHub
- Preview deployments for PRs
- Edge network (global CDN)
- Zero-config Next.js optimization

**Database:** Supabase
- Managed PostgreSQL
- Automatic backups
- Connection pooling
- Read replicas (if needed)

**Deployment Flow:**
1. Push to feature branch
2. Vercel creates preview deployment
3. Run tests in CI
4. Merge to main
5. Auto-deploy to production

**Domains:**
- Production: yourdomain.com
- Staging: staging.yourdomain.com

[DOMAIN_COMPLETE: deployment]

# Deployment

## Hosting
Vercel with automatic GitHub deployments

## Database
Supabase managed PostgreSQL with backups

## Flow
Feature branch → Preview → Tests → Production`
  }

  const response = mockResponses[currentDomain] || mockResponses.planning

  // Simulate streaming by sending tokens word by word
  const words = response.split(' ')
  let fullMessage = ''

  for (let i = 0; i < words.length; i++) {
    const token = (i === 0 ? '' : ' ') + words[i]
    fullMessage += token

    if (config.onToken) {
      config.onToken(token)
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 30))
  }

  // Check for domain completion
  const completion = detectDomainCompletion(fullMessage)

  if (completion.detected && completion.domainId && completion.content) {
    const markdownContent = extractMarkdownContent(
      completion.content,
      completion.domainId
    )

    if (config.onDomainComplete) {
      config.onDomainComplete(completion.domainId, markdownContent)
    }
  }

  if (config.onComplete) {
    config.onComplete(fullMessage)
  }

  return fullMessage
}

/**
 * Handle streaming errors with user-friendly messages
 */
export function getStreamErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status

    if (status === 401) {
      return 'Invalid API key. Please check your key in settings.'
    }

    if (status === 429) {
      return 'Rate limit exceeded. Please wait a moment and try again.'
    }

    if (status === 402 || status === 403) {
      return 'Your API key has no quota remaining. Please add credits to your Anthropic account.'
    }

    if (status >= 500) {
      return 'Anthropic API is experiencing issues. Please try again in a moment.'
    }
  }

  return 'An error occurred while streaming the response. Please try again.'
}
