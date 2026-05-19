'use client'

import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '../molecules/ChatMessage'
import { Textarea } from '../atoms/Textarea'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isStreaming?: boolean
  streamingContent?: string
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function ChatInterface({
  messages,
  onSendMessage,
  isStreaming = false,
  streamingContent = '',
  disabled = false,
  placeholder = 'Describe your project requirements...',
  className,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingContent])

  const handleSubmit = () => {
    if (!input.trim() || disabled || isStreaming) return

    onSendMessage(input.trim())
    setInput('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
  }

  return (
    <section
      className={cn(
        'flex-grow flex flex-col bg-stitch-surface relative min-w-0',
        className
      )}
    >
      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto p-stitch-gap-md flex flex-col gap-stitch-gap-md">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {/* Streaming message */}
        {isStreaming && streamingContent && (
          <ChatMessage
            role="assistant"
            content={streamingContent}
            streaming={true}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="p-stitch-gap-md border-t border-stitch-parchment bg-stitch-surface sticky bottom-0">
        <div className="relative flex items-end bg-stitch-snow-white border border-stitch-parchment p-stitch-unit focus-within:border-stitch-outline transition-colors rounded-[9.6px]">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isStreaming}
            className="w-full bg-stitch-snow-white border-none focus:ring-0 resize-none font-stitch-body-md text-stitch-body-md text-stitch-ink-black placeholder:text-stitch-stone min-h-[44px] max-h-[120px] outline-none"
            rows={1}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!input.trim() || disabled || isStreaming}
            className="ml-stitch-unit flex-shrink-0"
          >
            <Icon name="send" size="md" />
          </Button>
        </div>
        <p className="font-stitch-caption text-stitch-caption text-stitch-stone text-center mt-stitch-unit">
          Press Enter to send, Shift+Enter for new line.
        </p>
      </div>
    </section>
  )
}
