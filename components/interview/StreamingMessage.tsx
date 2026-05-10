'use client'

import { useEffect, useRef } from 'react'

interface StreamingMessageProps {
  content: string
  isStreaming: boolean
}

/**
 * StreamingMessage Component
 *
 * Renders a message with streaming tokens appearing in real-time.
 * Shows a typing indicator while streaming is active.
 */
export default function StreamingMessage({ content, isStreaming }: StreamingMessageProps) {
  const endRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom as new tokens arrive
  useEffect(() => {
    if (isStreaming && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [content, isStreaming])

  return (
    <div className="rounded-lg bg-muted p-4">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div className="whitespace-pre-wrap">{content}</div>
        {isStreaming && (
          <span className="inline-block h-4 w-1 animate-pulse bg-primary" />
        )}
      </div>
      <div ref={endRef} />
    </div>
  )
}
