'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useInterviewStore } from '@/store/interview'
import { createClient as createAnthropicClient } from '@anthropic-ai/sdk'
import { DomainProgressPanel } from '@/components/stitch/organisms/DomainProgressPanel'
import { ChatInterface } from '@/components/stitch/organisms/ChatInterface'
import { PreviewPanel } from '@/components/stitch/organisms/PreviewPanel'
import { detectDomainCompletion } from '@/lib/interview/completion'

export default function InterviewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const interviewStore = useInterviewStore()
  const [error, setError] = useState('')
  const [initialized, setInitialized] = useState(false)

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

    // Add user message
    interviewStore.addUserMessage(content)

    // Get API key from localStorage
    const apiKey = localStorage.getItem('anthropic_api_key')
    if (!apiKey) {
      setError('API key not found. Please set up your API key in settings.')
      return
    }

    // Start streaming
    interviewStore.startStreaming()

    try {
      const client = createAnthropicClient({ apiKey })

      const stream = client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: interviewStore.systemPrompt || '',
        messages: interviewStore.conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      })

      let fullResponse = ''

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          fullResponse += chunk.delta.text
          // Update streaming content in real-time
          interviewStore.setStreamingContent(fullResponse)
        }
      }

      // Add assistant message
      interviewStore.addAssistantMessage(fullResponse)
      interviewStore.stopStreaming()

      // Check for domain completion
      const currentDomain = interviewStore.currentDomain
      if (currentDomain && detectDomainCompletion(fullResponse, currentDomain)) {
        // Extract domain content (simplified - in production, parse properly)
        interviewStore.completeDomain(currentDomain, fullResponse)

        // Auto-save to Supabase
        await saveInterviewData()
      }
    } catch (err: any) {
      interviewStore.stopStreaming()
      handleApiError(err)
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
  const handleApiError = (error: any) => {
    if (error.status === 401) {
      setError('Invalid API key. Please update your key in settings.')
    } else if (error.status === 429) {
      setError('Rate limit exceeded. Please wait and try again.')
    } else if (error.status === 402) {
      setError('Quota exceeded. Please check your Anthropic account.')
    } else {
      setError('An error occurred. Please try again.')
    }
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

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-stitch-error-container border border-stitch-terra-cotta p-4 rounded-stitch-DEFAULT max-w-md">
          <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-terra-cotta">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
