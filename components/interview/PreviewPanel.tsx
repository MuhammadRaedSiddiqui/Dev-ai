'use client'

import { useInterviewStore } from '@/store/interview'
import { DOMAINS } from '@/lib/interview/domains'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * PreviewPanel Component
 *
 * Shows live documentation preview as domains are completed.
 * Renders markdown content for each completed domain.
 */
export default function PreviewPanel() {
  const { domainContent, completedDomains } = useInterviewStore()

  if (completedDomains.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-2">
          <div className="text-4xl">📝</div>
          <h3 className="text-lg font-semibold">Documentation Preview</h3>
          <p className="text-sm text-muted-foreground">
            As you complete each domain, your documentation will appear here in real-time.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Documentation Bundle</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {completedDomains.length} of {DOMAINS.length} sections complete
          </p>
        </div>

        {DOMAINS.map((domain) => {
          const content = domainContent[domain.id]
          const isComplete = completedDomains.includes(domain.id)

          if (!isComplete || !content) {
            return null
          }

          return (
            <div key={domain.id} className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <h3 className="text-lg font-semibold">{domain.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {domain.outputFile}
                </span>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )
        })}

        {completedDomains.length === DOMAINS.length && (
          <div className="rounded-lg border border-green-600 bg-green-50 p-6 dark:bg-green-900/20">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎉</span>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Interview Complete!
                </h3>
                <p className="mt-1 text-sm text-green-800 dark:text-green-200">
                  All 10 domains completed. Your documentation bundle is ready for review and
                  export.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
