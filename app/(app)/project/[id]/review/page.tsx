'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ExportButton from '@/components/review/ExportButton'
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

/**
 * Review Page
 *
 * Allows users to review and export their completed documentation bundle.
 * Shows all 10 files with markdown preview.
 */
export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<any>(null)
  const [bundle, setBundle] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<FileName>('PLANNING.md')

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch project
        const projectResponse = await fetch(`/api/projects/${projectId}`)
        if (!projectResponse.ok) {
          throw new Error('Project not found')
        }
        const projectData = await projectResponse.json()
        setProject(projectData)

        // Fetch bundle
        const bundleResponse = await fetch(`/api/projects/${projectId}/bundle`)
        if (!bundleResponse.ok) {
          throw new Error('No documentation bundle found. Complete the interview first.')
        }
        const bundleData = await bundleResponse.json()
        setBundle(bundleData)

        setLoading(false)
      } catch (err) {
        console.error('Load error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load documentation')
        setLoading(false)
      }
    }

    loadData()
  }, [projectId])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading documentation...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="max-w-md space-y-4 text-center">
          <div className="text-destructive">{error}</div>
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const currentContent = bundle?.files?.[activeTab] || ''

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{project?.name}</h1>
            <p className="text-sm text-muted-foreground">Documentation Bundle Review</p>
          </div>
          <div className="flex items-center space-x-4">
            <ExportButton projectId={projectId} projectName={project?.name || 'project'} />
            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              Back to Dashboard
            </button>
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
      <div className="flex-1 overflow-y-auto bg-muted/10 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
