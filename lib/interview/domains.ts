/**
 * Interview Domain Definitions
 *
 * The 10 domains that structure the DevDocs AI interview.
 * Each domain has a specific focus and generates a corresponding documentation file.
 */

export type DomainId =
  | 'planning'
  | 'architecture'
  | 'database'
  | 'api'
  | 'environment'
  | 'auth'
  | 'testing'
  | 'monitoring'
  | 'frontend'
  | 'deployment'

export interface Domain {
  id: DomainId
  name: string
  description: string
  outputFile: string
  requiredSections: string[]
}

export const DOMAINS: Domain[] = [
  {
    id: 'planning',
    name: 'Planning & Scope',
    description: 'Project goals, MVP definition, timeline, and success metrics',
    outputFile: 'PLANNING.md',
    requiredSections: [
      'Project Overview',
      'MVP Definition',
      'Out of Scope',
      'Success Metrics',
      'Timeline & Budget',
    ],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    description: 'Tech stack, system design, and architectural decisions',
    outputFile: 'ARCHITECTURE.md',
    requiredSections: ['Tech Stack', 'Architecture Decision', 'System Components', 'ADRs'],
  },
  {
    id: 'database',
    name: 'Database Design',
    description: 'Database choice, schema, migrations, and indexing',
    outputFile: 'DATABASE.md',
    requiredSections: ['Database Choice', 'Schema', 'Migration Strategy', 'Indexing Plan'],
  },
  {
    id: 'api',
    name: 'API Contracts',
    description: 'API design, endpoints, versioning, and authentication',
    outputFile: 'API-CONTRACTS.md',
    requiredSections: ['API Style', 'Endpoints', 'Versioning', 'Auth Requirements'],
  },
  {
    id: 'environment',
    name: 'Environment Strategy',
    description: 'Environments, secrets management, and CI/CD',
    outputFile: 'ENV-STRATEGY.md',
    requiredSections: ['Environments', 'Secrets Management', 'CI/CD Pipeline'],
  },
  {
    id: 'auth',
    name: 'Authentication',
    description: 'Auth provider, session strategy, and RBAC',
    outputFile: 'AUTH.md',
    requiredSections: ['Auth Provider', 'Session Strategy', 'RBAC Model'],
  },
  {
    id: 'testing',
    name: 'Testing Strategy',
    description: 'Testing pyramid, tools, and coverage targets',
    outputFile: 'TESTING.md',
    requiredSections: ['Testing Pyramid', 'Tools', 'Coverage Targets', 'CI Integration'],
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Observability',
    description: 'Logging, error tracking, alerting, and health checks',
    outputFile: 'MONITORING.md',
    requiredSections: ['Logging', 'Error Tracking', 'Alerting', 'Health Checks'],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Framework, state management, performance, and accessibility',
    outputFile: 'FRONTEND.md',
    requiredSections: [
      'Framework',
      'State Management',
      'Performance Budget',
      'Accessibility',
      'SEO',
    ],
  },
  {
    id: 'deployment',
    name: 'Deployment',
    description: 'Hosting platform, deployment method, and scaling strategy',
    outputFile: 'DEPLOYMENT.md',
    requiredSections: ['Hosting Platform', 'Deployment Method', 'Rollback Strategy', 'Scaling'],
  },
]

/**
 * Get domain by ID
 */
export function getDomain(id: DomainId): Domain | undefined {
  return DOMAINS.find((d) => d.id === id)
}

/**
 * Get next domain in sequence
 */
export function getNextDomain(currentId: DomainId): Domain | null {
  const currentIndex = DOMAINS.findIndex((d) => d.id === currentId)
  if (currentIndex === -1 || currentIndex === DOMAINS.length - 1) {
    return null
  }
  return DOMAINS[currentIndex + 1]
}

/**
 * Check if all domains are complete
 */
export function areAllDomainsComplete(completedDomains: DomainId[]): boolean {
  return DOMAINS.every((domain) => completedDomains.includes(domain.id))
}
