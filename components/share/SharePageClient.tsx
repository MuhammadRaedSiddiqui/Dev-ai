'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type FileName =
  | 'PLANNING.md'
  | 'ARCHITECTURE.md'
  | 'DATABASE.md'
  | 'API-CONTRACTS.md'
  | 'ENV-STRATEGY.md'
  | 'AUTH.md'
  | 'TESTING.md'
  | 'MONITORING.md'
  | 'FRONTEND.md'
  | 'DEPLOYMENT.md'

const FILE_TABS: { name: FileName; label: string }[] = [
  { name: 'PLANNING.md', label: 'Planning' },
  { name: 'ARCHITECTURE.md', label: 'Architecture' },
  { name: 'DATABASE.md', label: 'Database' },
  { name: 'API-CONTRACTS.md', label: 'API' },
  { name: 'ENV-STRATEGY.md', label: 'Environment' },
  { name: 'AUTH.md', label: 'Auth' },
  { name: 'TESTING.md', label: 'Testing' },
  { name: 'MONITORING.md', label: 'Monitoring' },
  { name: 'FRONTEND.md', label: 'Frontend' },
  { name: 'DEPLOYMENT.md', label: 'Deployment' },
]

interface SharePageClientProps {
  bundle: {
    files: Record<string, string>
    generated_at: string
    project_id: string
  }
  project: {
    name: string
    project_type: string
  } | null
}

/**
 * SharePageClient Component
 *
 * Client component for the share page.
 * Handles tab switching and rendering of shared documentation.
 */
export default function SharePageClient({ bundle, project }: SharePageClientProps) {
  const [activeTab, setActiveTab] = useState<FileName>('PLANNING.md')

  const currentContent = bundle?.files?.[activeTab] || ''

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background p-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{project?.name || 'Documentation Bundle'}</h1>
              <p className="text-sm text-muted-foreground">
                Shared documentation • Read-only view
              </p>
            </div>
            <div className="rounded-md bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              🔗 Shared Link
            </div>
          </div>
        </div>
      </div>

      {/* File Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="flex space-x-1 overflow-x-auto p-2">
            {FILE_TABS.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-muted/10 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-muted/30 p-4">
        <div className="mx-auto max-w-7xl text-center text-xs text-muted-foreground">
          Created with{' '}
          <a href="https://devdocs.ai" className="font-medium hover:underline">
            DevDocs AI
          </a>
        </div>
      </div>
    </div>
  )
}
