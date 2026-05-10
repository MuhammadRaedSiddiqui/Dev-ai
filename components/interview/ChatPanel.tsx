'use client'

import { useState, useRef, useEffect } from 'react'
import { useInterviewStore } from '@/store/interview'
import StreamingMessage from './StreamingMessage'

interface ChatPanelProps {
  onSendMessage: (message: string) => Promise<void>
}

/**
 * ChatPanel Component
 *
 * The conversation thread for the AI interview.
 * Shows message history and allows user to send new messages.
 */
export default function ChatPanel({ onSendMessage }: ChatPanelProps) {
  const { conversationHistory, isStreaming } = useInterviewStore()
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversationHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || sending || isStreaming) {
      return
    }

    setSending(true)

    try {
      await onSendMessage(input.trim())
      setInput('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {conversationHistory.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-md space-y-2">
              <p className="text-sm text-muted-foreground">
                Start the interview by describing your project.
              </p>
              <p className="text-xs text-muted-foreground">
                The AI will guide you through 10 technical domains to create your documentation
                bundle.
              </p>
            </div>
          </div>
        )}

        {conversationHistory.map((message, index) => {
          const isLastMessage = index === conversationHistory.length - 1
          const isStreamingThisMessage = isLastMessage && isStreaming

          return (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  message.role === 'user'
                    ? 'rounded-lg bg-primary px-4 py-2 text-primary-foreground'
                    : ''
                }`}
              >
                {message.role === 'user' ? (
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                ) : (
                  <StreamingMessage
                    content={message.content}
                    isStreaming={isStreamingThisMessage}
                  />
                )}
              </div>
            </div>
          )
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            placeholder="Type your message... (Shift+Enter for new line)"
            disabled={sending || isStreaming}
            rows={3}
            className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending || isStreaming}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {sending || isStreaming ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
