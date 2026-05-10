/**
 * README.md Generator
 *
 * Auto-generates a README.md index file for the documentation bundle.
 * This file provides an overview and links to all 10 documentation files.
 */

export interface ReadmeConfig {
  projectName: string
  projectType: string
  completionDate: string
}

/**
 * Generate README.md content for documentation bundle
 */
export function generateReadme(config: ReadmeConfig): string {
  const { projectName, projectType, completionDate } = config

  return `# ${projectName} — Documentation Bundle

**Project Type:** ${formatProjectType(projectType)}
**Generated:** ${formatDate(completionDate)}
**Created with:** [DevDocs AI](https://devdocs.ai)

---

## 📚 Documentation Files

This bundle contains 10 comprehensive documentation files covering all aspects of your project's technical planning:

### Planning & Architecture
- **[PLANNING.md](./PLANNING.md)** — Project scope, MVP definition, timeline, and success metrics
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Tech stack decisions, system design, and ADRs

### Data & APIs
- **[DATABASE.md](./DATABASE.md)** — Database choice, schema design, migrations, and indexing
- **[API-CONTRACTS.md](./API-CONTRACTS.md)** — API endpoints, request/response formats, and versioning

### Infrastructure & Security
- **[ENV-STRATEGY.md](./ENV-STRATEGY.md)** — Environment setup, secrets management, and CI/CD
- **[AUTH.md](./AUTH.md)** — Authentication provider, session strategy, and authorization

### Quality & Operations
- **[TESTING.md](./TESTING.md)** — Testing strategy, tools, coverage targets, and CI integration
- **[MONITORING.md](./MONITORING.md)** — Logging, error tracking, alerting, and observability

### Frontend & Deployment
- **[FRONTEND.md](./FRONTEND.md)** — Framework choice, state management, performance, and accessibility
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Hosting platform, deployment process, and scaling strategy

---

## 🚀 How to Use This Bundle

1. **Review each file** — Read through all 10 documents to understand the full technical plan
2. **Share with your team** — These docs are designed to be shared with developers, designers, and stakeholders
3. **Feed to AI coding agents** — Use these as context for Claude Code, Cursor, Windsurf, or other AI tools
4. **Keep updated** — As your project evolves, update these docs to reflect changes

---

## 💡 Next Steps

With this documentation bundle, you're ready to:

- Set up your development environment
- Initialize your repository with the recommended tech stack
- Create database migrations from the schema
- Implement API endpoints following the contracts
- Configure CI/CD pipelines as specified
- Build with confidence knowing all decisions are documented

---

**Questions or feedback?** Visit [devdocs.ai](https://devdocs.ai) or open an issue on GitHub.
`
}

/**
 * Format project type for display
 */
function formatProjectType(type: string): string {
  const typeMap: Record<string, string> = {
    saas: 'SaaS Application',
    api: 'API Service',
    internal_tool: 'Internal Tool',
    mobile: 'Mobile App',
    landing_page: 'Landing Page',
    other: 'Other',
  }

  return typeMap[type] || type
}

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
