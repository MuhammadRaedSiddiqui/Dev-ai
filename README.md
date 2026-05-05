# DevDocs AI

An AI-powered pre-build planning assistant for developers that interviews them about their project and generates comprehensive documentation bundles optimized for AI coding agents.

## Overview

DevDocs AI solves a critical problem in agentic development: missing or incomplete project planning causes expensive rework when using AI coding tools. This tool acts as a senior developer mentor, asking the right questions before a single line of code is written.

## What It Does

1. **Interviews developers** through a conversational AI interface about their project
2. **Surfaces critical decisions** across 10 domains: planning, architecture, database, API, environment, auth, testing, monitoring, frontend, and deployment
3. **Generates documentation bundle** - 10 structured markdown files ready to feed into AI coding agents like Claude Code, Cursor, and Windsurf

## Target Users

- Junior and mid-level developers (0-3 years experience)
- Solo founders and indie hackers building SaaS products
- Bootcamp graduates starting their first projects
- Anyone using AI coding assistants who wants to avoid costly rework

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth (email + Google OAuth)
- **AI**: Anthropic SDK (client-side, BYOK model)
- **Hosting**: Vercel
- **Testing**: Vitest (unit), Playwright (E2E)

## Business Model

- **Free Tier**: BYOK (Bring Your Own Key) - users supply their own Anthropic API key
- **Pro Tier**: $12/month - hosted tier with unlimited projects
- **Team Tier**: $35/seat/month - team workspaces and collaboration

## Project Status

**Status**: Pre-Development  
**Timeline**: 4-6 week MVP  
**Current Phase**: Foundation setup

## Documentation

- **Complete Specification**: See `DevDocs_AI_Project.md` for full project documentation
- **Claude Code Instructions**: See `CLAUDE.md` for development guidelines
- **Project Constitution**: See `.specify/memory/constitution.md` for core principles

## Development Workflow

This project uses **Spec-Driven Development** with specifyplus:

```bash
# Create a feature specification
/sp.specify [feature description]

# Generate technical plan
/sp.plan [tech stack and architecture]

# Generate tasks
/sp.tasks

# Implement
/sp.implement
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Anthropic API key (for BYOK model)
- Supabase account
- Vercel account (for deployment)

### Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and other credentials

# Run development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

## MVP Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Next.js setup with App Router
- Supabase configuration
- BYOK key setup flow
- User authentication
- Project dashboard

### Phase 2: Core Product (Weeks 3-5)
- AI interview interface
- Documentation generation
- Bundle editor
- ZIP export
- Share links
- Project templates

### Phase 3: Polish (Weeks 6-8)
- Landing page with SEO
- Error handling
- Performance optimization
- Accessibility compliance
- Analytics integration

## Key Principles

1. **Security First**: Never expose user API keys, implement RLS for all data
2. **Developer-First Design**: Clarity over decoration, minimal interfaces
3. **Accessibility Required**: WCAG 2.1 AA compliance mandatory
4. **Performance Targets**: Lighthouse 90+ on all metrics
5. **No Feature Creep**: Stick to defined MVP scope

## Contributing

This is a pre-development project. Development guidelines:
- Read `CLAUDE.md` before starting work
- Follow the constitution in `.specify/memory/constitution.md`
- Use TypeScript strict mode
- Write tests for all features
- Ensure accessibility compliance

## License

[To be determined]

## Contact

[To be determined]
