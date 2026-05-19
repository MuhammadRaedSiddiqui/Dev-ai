'use client'

import { cn } from '@/lib/utils'
import { DomainProgressItem } from '../molecules/DomainProgressItem'

const DOMAINS = [
  { id: 'planning', label: 'Planning & Scope' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'database', label: 'Database Design' },
  { id: 'api', label: 'API Contracts' },
  { id: 'environment', label: 'Environment Strategy' },
  { id: 'auth', label: 'Authentication' },
  { id: 'testing', label: 'Testing' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'deployment', label: 'Deployment' },
]

export interface DomainProgressPanelProps {
  completedDomains: string[]
  currentDomain: string | null
  onDomainClick?: (domainId: string) => void
  className?: string
}

export function DomainProgressPanel({
  completedDomains,
  currentDomain,
  onDomainClick,
  className,
}: DomainProgressPanelProps) {
  const completionPercentage = Math.round(
    (completedDomains.length / DOMAINS.length) * 100
  )

  const getDomainStatus = (
    domainId: string
  ): 'completed' | 'active' | 'pending' => {
    if (completedDomains.includes(domainId)) return 'completed'
    if (currentDomain === domainId) return 'active'
    return 'pending'
  }

  return (
    <aside
      className={cn(
        'w-full md:w-64 bg-stitch-vellum-white border-r border-stitch-parchment flex flex-col h-full overflow-y-auto p-stitch-gap-md',
        className
      )}
    >
      <h2 className="font-stitch-h4 text-stitch-h4 text-stitch-ink-black mb-stitch-gap-md">
        Domain Progress
      </h2>

      {/* Overall Completion */}
      <div className="mb-stitch-gap-lg">
        <div className="flex justify-between items-center mb-stitch-unit">
          <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone">
            Overall Completion
          </span>
          <span className="font-stitch-caption text-stitch-caption text-stitch-ink-black font-semibold">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-stitch-surface-container rounded-full h-2">
          <div
            className="bg-stitch-ink-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Domain List */}
      <nav className="flex flex-col gap-stitch-unit">
        {DOMAINS.map((domain) => (
          <DomainProgressItem
            key={domain.id}
            label={domain.label}
            status={getDomainStatus(domain.id)}
            onClick={() => onDomainClick?.(domain.id)}
          />
        ))}
      </nav>
    </aside>
  )
}
