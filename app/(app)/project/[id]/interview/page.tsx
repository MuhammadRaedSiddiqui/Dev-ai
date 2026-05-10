'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useInterviewStore } from '@/store/interview'
import { createAnthropicClient } from '@/lib/anthropic/client'
import { streamInterviewResponse, getStreamErrorMessage } from '@/lib/anthropic/streaming'
import ChatPanel from '@/components/interview/ChatPanel'
import PreviewPanel from '@/components/interview/PreviewPanel'
import DomainProgress from '@/components/interview/DomainProgress'

/**
 * Interview Page
 *
 * Main interview screen with split-pane layout:
 * - Left: Chat conversation with AI
 * - Right: Live documentation preview
 * - Sidebar: Domain progress tracker
 */
export default function InterviewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const {
    initializeSession,
    addUserMessage,
    addAssistantMessage,
    startStreaming,
    stopStreaming,
    completeDomain,
    resumeFromSaved,
    toJSON,
  } = useInterviewStore()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null)
  const [anthropicClient, setAnthropicClient] = useState<any>(null)

  // Initialize session on mount
  useEffect(() => {
    async function initialize() {
      try {
        // Fetch session init data (system prompt)
        const response = await fetch('/api/session/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId }),
        })

        if (!response.ok) {
          throw new Error('Failed to initialize session')
        }

        const data = await response.json()
        setSystemPrompt(data.systemPrompt)

        // Create Anthropic client
        const client = await createAnthropicClient()
        setAnthropicClient(client)

        // Fetch existing project data to check for saved interview
        const projectResponse = await fetch(`/api/projects/${projectId}`)
        if (projectResponse.ok) {
          const project = await projectResponse.json()

          if (project.interview_data && Object.keys(project.interview_data).length > 0) {
            // Resume from saved state
            resumeFromSaved(project.interview_data)
          } else {
            // Initialize new session
            initializeSession(projectId, data.systemPrompt)
          }
        } else {
          // Initialize new session
          initializeSession(projectId, data.systemPrompt)
        }

        setLoading(false)
      } catch (err) {
        console.error('Initialization error:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize interview')
        setLoading(false)
      }
    }

    initialize()
  }, [projectId, initializeSession, resumeFromSaved])

  // Auto-save interview data when domains complete
  useEffect(() => {
    const saveInterviewData = async () => {
      try {
        const interviewData = toJSON()

        await fetch(`/api/projects/${projectId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interview_data: interviewData }),
        })
      } catch (err) {
        console.error('Failed to save interview data:', err)
      }
    }

    // Debounce saves
    const timeoutId = setTimeout(saveInterviewData, 2000)
    return () => clearTimeout(timeoutId)
  }, [projectId, toJSON])

  const handleSendMessage = async (message: string) => {
    if (!systemPrompt) {
      setError('Interview session not initialized')
      return
    }

    // Add user message to history
    addUserMessage(message)

    // Build messages array for API
    const interviewState = useInterviewStore.getState()
    const messages = interviewState.conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Add the new user message
    messages.push({ role: 'user', content: message })

    try {
      startStreaming()

      let streamedContent = ''

      // Stream response from Anthropic (or mock mode)
      await streamInterviewResponse(anthropicClient, {
        model: 'claude-sonnet-4-6',
        systemPrompt,
        messages,
        useMockMode: !anthropicClient, // Use mock mode if no client (null)
        onToken: (token) => {
          streamedContent += token
          // Update the last assistant message in real-time
          // (This is handled by the streaming state in the store)
        },
        onComplete: (fullMessage) => {
          addAssistantMessage(fullMessage)
          stopStreaming()
        },
        onDomainComplete: (domainId, content) => {
          completeDomain(domainId, content)
        },
        onError: (err) => {
          const errorMessage = getStreamErrorMessage(err)
          setError(errorMessage)
          stopStreaming()
        },
      })
    } catch (err) {
      const errorMessage = getStreamErrorMessage(err)
      setError(errorMessage)
      stopStreaming()
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Initializing interview...</div>
        </div>
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

  return (
    <div className="flex h-screen">
      {/* Sidebar - Domain Progress */}
      <div className="w-64 border-r border-border bg-muted/30 p-4">
        <DomainProgress />
      </div>

      {/* Main Content - Split Pane */}
      <div className="flex flex-1">
        {/* Left - Chat */}
        <div className="w-1/2 border-r border-border">
          <ChatPanel onSendMessage={handleSendMessage} />
        </div>

        {/* Right - Preview */}
        <div className="w-1/2 bg-muted/10">
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}
