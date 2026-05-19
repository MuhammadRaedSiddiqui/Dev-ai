'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useInterviewStore } from '@/store/interview'
import { createAIClient, getDefaultModel, getConfiguredProvider } from '@/lib/ai/factory'
import { getStreamErrorMessage } from '@/lib/ai/streaming'
import { DomainProgressPanel } from '@/components/stitch/organisms/DomainProgressPanel'
import { ChatInterface } from '@/components/stitch/organisms/ChatInterface'
import { PreviewPanel } from '@/components/stitch/organisms/PreviewPanel'
import { useToast } from '@/components/stitch/organisms/ToastProvider'
import { validateTextInput, sanitizeInput, RateLimiter } from '@/lib/validation'

export default function InterviewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const { showToast } = useToast()

  const interviewStore = useInterviewStore()
  const [error, setError] = useState('')
  const [initialized, setInitialized] = useState(false)
  const rateLimiter = useRef(new RateLimiter(1000))

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        // Fetch system prompt from server
        const sessionResponse = await fetch('/api/session/init')
        if (!sessionResponse.ok) {
          throw new Error('Failed to fetch system prompt')
        }
        const { systemPrompt } = await sessionResponse.json()

        // Load saved interview data
        const projectResponse = await fetch(`/api/projects/${projectId}`)
        if (!projectResponse.ok) {
          throw new Error('Failed to load project')
        }
        const project = await projectResponse.json()

        // Initialize or resume interview
        if (
          project.interview_data?.conversationHistory &&
          project.interview_data.conversationHistory.length > 0
        ) {
          interviewStore.resumeFromSaved(project.interview_data)
        } else {
          interviewStore.initializeSession(projectId, systemPrompt)
        }

        setInitialized(true)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to initialize session'
        )
      }
    }

    initSession()
  }, [projectId])

  // Send message
  const handleSendMessage = async (content: string) => {
    setError('')

    // Rate limiting check
    if (!rateLimiter.current.canSubmit()) {
      showToast({
        message: 'Please wait a moment before sending another message',
        type: 'error',
      })
      return
    }

    // Sanitize input
    const sanitizedContent = sanitizeInput(content)

    // Validate message content
    const validation = validateTextInput(sanitizedContent, 1, 5000)
    if (!validation.isValid) {
      showToast({
        message: validation.error || 'Invalid message',
        type: 'error',
      })
      return
    }

    // Add user message with sanitized content
    interviewStore.addUserMessage(sanitizedContent)

    // Start streaming
    interviewStore.startStreaming()

    try {
      // Create AI client using factory (supports Anthropic, Ollama, Mock)
      const client = await createAIClient()
      const provider = getConfiguredProvider()

      // Stream response using unified interface
      await client.stream({
        model: getDefaultModel(provider),
        systemPrompt: interviewStore.systemPrompt || '',
        messages: interviewStore.conversationHistory,
        maxTokens: 4096,
        onToken: (token) => {
          // Update streaming content in real-time
          const currentContent = interviewStore.streamingContent + token
          interviewStore.setStreamingContent(currentContent)
        },
        onComplete: (fullResponse) => {
          // Add assistant message
          interviewStore.addAssistantMessage(fullResponse)
          interviewStore.stopStreaming()
        },
        onDomainComplete: async (domainId, content) => {
          // Extract domain content
          interviewStore.completeDomain(domainId, content)

          // Auto-save to Supabase
          await saveInterviewData()

          showToast({
            message: `${domainId} section completed`,
            type: 'success',
            duration: 3000,
          })
        },
        onError: (error) => {
          interviewStore.stopStreaming()
          handleApiError(error, provider)
        }
      })
    } catch (err: any) {
      interviewStore.stopStreaming()
      const provider = getConfiguredProvider()
      handleApiError(err, provider)
    }
  }

  // Auto-save interview data
  const saveInterviewData = async () => {
    const data = interviewStore.toJSON()

    await fetch(`/api/projects/${projectId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interview_data: data,
        status: data.status === 'complete' ? 'complete' : 'in_progress',
      }),
    })
  }

  // Handle API errors
  const handleApiError = (error: any, provider: string) => {
    const message = getStreamErrorMessage(error, provider)

    setError(message)
    showToast({
      message,
      type: 'error',
      duration: 5000,
    })
  }

  // Get combined preview content
  const getPreviewContent = () => {
    const completedContent = Object.entries(interviewStore.domainContent)
      .map(([domain, content]) => content)
      .join('\n\n---\n\n')

    return completedContent
  }

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-stitch-stone">Loading interview...</div>
      </div>
    )
  }

  return (
    <div className="bg-stitch-background text-stitch-on-background font-stitch-body-md min-h-screen flex flex-col">
      {/* Main Content Layout (3 Columns) */}
      <main className="flex-grow flex flex-col md:flex-row w-full max-w-[1440px] mx-auto overflow-hidden">
        {/* Left Column: Domain Progress */}
        <DomainProgressPanel
          completedDomains={interviewStore.completedDomains}
          currentDomain={interviewStore.currentDomain}
        />

        {/* Center Column: Chat Interface */}
        <ChatInterface
          messages={interviewStore.conversationHistory}
          onSendMessage={handleSendMessage}
          isStreaming={interviewStore.isStreaming}
          streamingContent={interviewStore.streamingContent}
          disabled={!!error}
          className="border-r border-stitch-parchment"
        />

        {/* Right Column: Documentation Preview */}
        <PreviewPanel
          content={getPreviewContent()}
          onCopy={() => {
            navigator.clipboard.writeText(getPreviewContent())
          }}
        />
      </main>

    </div>
  )
}
