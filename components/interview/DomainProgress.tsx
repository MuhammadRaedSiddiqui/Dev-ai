'use client'

import { useInterviewStore } from '@/store/interview'
import { DOMAINS } from '@/lib/interview/domains'

/**
 * DomainProgress Component
 *
 * Shows progress through the 10 interview domains.
 * Highlights completed domains and indicates the current domain.
 */
export default function DomainProgress() {
  const { currentDomain, completedDomains } = useInterviewStore()

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground">
        Progress: {completedDomains.length} / {DOMAINS.length} domains
      </div>
      <div className="space-y-1">
        {DOMAINS.map((domain) => {
          const isComplete = completedDomains.includes(domain.id)
          const isCurrent = currentDomain === domain.id

          return (
            <div
              key={domain.id}
              className={`flex items-center space-x-2 rounded px-2 py-1 text-sm ${
                isCurrent
                  ? 'bg-primary/10 font-medium text-primary'
                  : isComplete
                    ? 'text-muted-foreground line-through'
                    : 'text-muted-foreground'
              }`}
            >
              <div className="flex h-5 w-5 items-center justify-center">
                {isComplete ? (
                  <span className="text-green-600">✓</span>
                ) : isCurrent ? (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                ) : (
                  <span className="h-2 w-2 rounded-full border border-muted-foreground" />
                )}
              </div>
              <span>{domain.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
