'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/stitch/atoms/Button'
import { Icon } from '@/components/stitch/atoms/Icon'
import { useToast } from '@/components/stitch/organisms/ToastProvider'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

const DOCUMENTATION_FILES = [
  'PLANNING.md',
  'ARCHITECTURE.md',
  'DATABASE.md',
  'API-CONTRACTS.md',
  'ENV-STRATEGY.md',
  'AUTH.md',
  'TESTING.md',
  'MONITORING.md',
  'FRONTEND.md',
  'DEPLOYMENT.md',
]

export default function ReviewPage() {
  const params = useParams()
  const projectId = params.id as string
  const { showToast } = useToast()

  const [bundle, setBundle] = useState<any>(null)
  const [activeFile, setActiveFile] = useState('PLANNING.md')
  const [editedContent, setEditedContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [sharing, setSharing] = useState(false)

  // Load bundle
  useEffect(() => {
    const loadBundle = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/bundle`)
        if (response.ok) {
          const data = await response.json()
          setBundle(data)
          setEditedContent(data.files || {})
        } else {
          showToast({
            message: 'Failed to load documentation bundle',
            type: 'error',
          })
        }
      } catch (error) {
        console.error('Failed to load bundle:', error)
        showToast({
          message: 'Failed to load documentation bundle',
          type: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    loadBundle()
  }, [projectId, showToast])

  // Debounced save
  const debouncedSave = useMemo(
    () => {
      let timeoutId: NodeJS.Timeout
      return (files: Record<string, string>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
          try {
            await fetch(`/api/projects/${projectId}/bundle`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ files }),
            })
          } catch (error) {
            console.error('Failed to save bundle:', error)
          }
        }, 2000)
      }
    },
    [projectId]
  )

  // Handle file edit
  const handleFileChange = (filename: string, content: string) => {
    const updatedFiles = { ...editedContent, [filename]: content }
    setEditedContent(updatedFiles)
    debouncedSave(updatedFiles)
  }

  // Export ZIP
  const handleExport = async () => {
    setExporting(true)
    try {
      const response = await fetch(`/api/export/${projectId}`)
      if (!response.ok) {
        throw new Error('Export failed')
      }
      const blob = await response.blob()

      // Trigger download
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `devdocs-${projectId}.zip`
      a.click()
      window.URL.revokeObjectURL(url)

      showToast({
        message: 'Documentation exported successfully',
        type: 'success',
      })
    } catch (error) {
      console.error('Failed to export:', error)
      showToast({
        message: 'Failed to export documentation',
        type: 'error',
      })
    } finally {
      setExporting(false)
    }
  }

  // Create share link
  const handleShare = async () => {
    setSharing(true)
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundle_id: bundle.id }),
      })

      if (response.ok) {
        const { token } = await response.json()
        const shareUrl = `${window.location.origin}/share/${token}`

        // Copy to clipboard
        await navigator.clipboard.writeText(shareUrl)
        showToast({
          message: 'Share link copied to clipboard',
          type: 'success',
          duration: 3000,
        })
      } else {
        throw new Error('Failed to create share link')
      }
    } catch (error) {
      console.error('Failed to create share link:', error)
      showToast({
        message: 'Failed to create share link',
        type: 'error',
      })
    } finally {
      setSharing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="progress_activity" className="animate-spin text-stitch-stone" size="xl" />
      </div>
    )
  }

  const currentContent = editedContent[activeFile] || ''

  return (
    <div className="bg-stitch-vellum-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-stitch-parchment bg-stitch-surface px-stitch-gap-lg py-stitch-gap-md">
        <div className="flex justify-between items-center max-w-[1440px] mx-auto">
          <div>
            <h1 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black">
              Documentation Review
            </h1>
            <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone mt-1">
              Review and edit your generated documentation bundle
            </p>
          </div>
          <div className="flex gap-stitch-gap-md">
            <Button
              variant="secondary"
              size="md"
              onClick={handleShare}
              loading={sharing}
              icon="share"
            >
              Share
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleExport}
              loading={exporting}
              icon="download"
            >
              Export ZIP
            </Button>
          </div>
        </div>
      </header>

      {/* File Tabs */}
      <div className="border-b border-stitch-parchment bg-stitch-surface px-stitch-gap-lg overflow-x-auto">
        <div className="flex gap-2 max-w-[1440px] mx-auto">
          {DOCUMENTATION_FILES.map((filename) => (
            <button
              key={filename}
              onClick={() => setActiveFile(filename)}
              className={cn(
                'px-4 py-2 font-stitch-body-sm text-stitch-body-sm border-b-2 transition-colors whitespace-nowrap',
                activeFile === filename
                  ? 'border-stitch-ink-black text-stitch-ink-black font-medium'
                  : 'border-transparent text-stitch-stone hover:text-stitch-ink-black'
              )}
            >
              {filename}
            </button>
          ))}
        </div>
      </div>

      {/* Split Pane Editor */}
      <div className="flex-grow flex overflow-hidden max-w-[1440px] mx-auto w-full">
        {/* Left: Markdown Editor */}
        <div className="w-1/2 border-r border-stitch-parchment flex flex-col">
          <div className="px-stitch-gap-md py-stitch-unit border-b border-stitch-parchment bg-stitch-surface flex justify-between items-center">
            <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone uppercase">
              Markdown Editor
            </span>
            <Icon name="edit" size="sm" className="text-stitch-stone" />
          </div>
          <textarea
            value={currentContent}
            onChange={(e) => handleFileChange(activeFile, e.target.value)}
            className="flex-grow p-stitch-gap-md font-mono text-stitch-body-sm text-stitch-ink-black bg-stitch-snow-white resize-none focus:outline-none"
            placeholder="Start editing your documentation..."
          />
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 flex flex-col bg-stitch-vellum-white">
          <div className="px-stitch-gap-md py-stitch-unit border-b border-stitch-parchment bg-stitch-surface flex justify-between items-center">
            <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone uppercase">
              Preview
            </span>
            <Icon name="visibility" size="sm" className="text-stitch-stone" />
          </div>
          <div className="flex-grow overflow-y-auto p-stitch-gap-md">
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
                  p: ({ children }) => (
                    <p className="font-stitch-body-md text-stitch-body-md text-stitch-on-surface-variant mb-stitch-gap-md">
                      {children}
                    </p>
                  ),
                  code: ({ inline, children, ...props }: any) =>
                    inline ? (
                      <code
                        className="bg-stitch-surface-container-low border border-stitch-parchment px-1 py-0.5 rounded font-mono text-stitch-caption"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <div className="bg-stitch-surface-container-low border border-stitch-parchment p-stitch-gap-xs mb-stitch-gap-md font-mono text-stitch-caption overflow-x-auto rounded-[9.6px]">
                        <pre>
                          <code {...props}>{children}</code>
                        </pre>
                      </div>
                    ),
                }}
              >
                {currentContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
