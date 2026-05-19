'use client'

import { cn } from '@/lib/utils'
import { Icon } from '../atoms/Icon'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface PreviewPanelProps {
  content: string
  title?: string
  onCopy?: () => void
  onExpand?: () => void
  className?: string
}

export function PreviewPanel({
  content,
  title = 'Live Document',
  onCopy,
  onExpand,
  className,
}: PreviewPanelProps) {
  return (
    <aside
      className={cn(
        'w-full md:w-[400px] bg-stitch-vellum-white border-l border-stitch-parchment flex flex-col h-full overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="px-stitch-gap-md py-stitch-unit border-b border-stitch-parchment flex justify-between items-center bg-stitch-surface sticky top-0 z-10">
        <h2 className="font-stitch-h4 text-stitch-h4 text-stitch-ink-black flex items-center gap-stitch-unit">
          <Icon name="description" size="md" className="text-stitch-stone" />
          {title}
        </h2>
        <div className="flex gap-stitch-unit">
          {onCopy && (
            <button
              onClick={onCopy}
              className="text-stitch-stone hover:text-stitch-ink-black transition-colors"
              title="Copy Markdown"
            >
              <Icon name="content_copy" size="md" />
            </button>
          )}
          {onExpand && (
            <button
              onClick={onExpand}
              className="text-stitch-stone hover:text-stitch-ink-black transition-colors"
              title="Expand Preview"
            >
              <Icon name="open_in_full" size="md" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-stitch-gap-md">
        {content ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-stitch-h2 text-stitch-h2 font-stitch-display text-stitch-ink-black mb-stitch-gap-md border-b border-stitch-parchment pb-stitch-unit">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mt-stitch-gap-md mb-stitch-unit">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-stitch-h4 text-stitch-h4 text-stitch-ink-black mt-stitch-gap-md mb-stitch-unit">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="font-stitch-body-md text-stitch-body-md text-stitch-on-surface-variant mb-stitch-gap-md">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-stitch-gap-md mb-stitch-gap-md font-stitch-body-sm text-stitch-body-sm text-stitch-on-surface-variant space-y-1">
                    {children}
                  </ul>
                ),
                code: ({ inline, children, ...props }: any) =>
                  inline ? (
                    <code
                      className="bg-stitch-surface-container-low border border-stitch-parchment px-1 py-0.5 rounded font-mono text-stitch-caption text-stitch-ink-black"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <div className="bg-stitch-surface-container-low border border-stitch-parchment p-stitch-gap-xs mb-stitch-gap-md font-mono text-stitch-caption text-stitch-ink-black overflow-x-auto rounded-[9.6px]">
                      <pre>
                        <code {...props}>{children}</code>
                      </pre>
                    </div>
                  ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-stitch-gap-lg">
            <Icon
              name="description"
              size="xl"
              className="text-stitch-stone mb-stitch-gap-md"
            />
            <p className="font-stitch-body-md text-stitch-body-md text-stitch-stone">
              Documentation will appear here as you complete each domain.
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
