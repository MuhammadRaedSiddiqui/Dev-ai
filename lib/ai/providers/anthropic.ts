import type { AIClient, StreamConfig, ValidationResult } from '../types'
import { detectDomainCompletion, extractMarkdownContent } from '@/lib/interview/completion'

/**
 * Anthropic AI Provider
 * Calls server-side API route to avoid bundling Node.js SDK in browser
 */
export class AnthropicProvider implements AIClient {
  provider = 'anthropic' as const
  private apiKey: string

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Anthropic API key is required')
    }
    this.apiKey = apiKey
  }

  /**
   * Stream a response from Anthropic API via server-side route
   */
  async stream(config: StreamConfig): Promise<string> {
    let fullMessage = ''

    try {
      // Call server-side streaming endpoint
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'anthropic',
          apiKey: this.apiKey,
          model: config.model,
          systemPrompt: config.systemPrompt,
          messages: config.messages,
          maxTokens: config.maxTokens || 4096,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Stream request failed')
      }

      // Process Server-Sent Events
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Decode chunk and parse SSE format
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6))

            if (data.error) {
              throw new Error(data.error)
            }

            if (data.done) {
              // Stream complete
              break
            }

            if (data.token) {
              fullMessage += data.token

              // Call token callback for real-time UI updates
              if (config.onToken) {
                config.onToken(data.token)
              }
            }
          }
        }
      }

      // Check for domain completion signal
      const completion = detectDomainCompletion(fullMessage)

      if (completion.detected && completion.domainId && completion.content) {
        // Extract the markdown content for this domain
        const markdownContent = extractMarkdownContent(
          completion.content,
          completion.domainId
        )

        // Call domain completion callback
        if (config.onDomainComplete) {
          config.onDomainComplete(completion.domainId, markdownContent)
        }
      }

      // Call completion callback
      if (config.onComplete) {
        config.onComplete(fullMessage)
      }

      return fullMessage
    } catch (error) {
      console.error('Anthropic streaming error:', error)

      if (config.onError) {
        config.onError(error as Error)
      }

      throw error
    }
  }

  /**
   * Validate connection to Anthropic API via server-side route
   */
  async validateConnection(): Promise<ValidationResult> {
    try {
      // Make a minimal test call through the server
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'anthropic',
          apiKey: this.apiKey,
          model: 'claude-sonnet-4-6',
          systemPrompt: '',
          messages: [{ role: 'user', content: 'test' }],
          maxTokens: 10,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        return {
          valid: false,
          error: error.error || 'Connection failed',
          errorCode: this.getErrorCodeFromStatus(response.status),
        }
      }

      return { valid: true }
    } catch (error: unknown) {
      return {
        valid: false,
        error: 'Network error',
        errorCode: 'NETWORK_ERROR',
      }
    }
  }

  private getErrorCodeFromStatus(status: number): string {
    if (status === 401) return 'INVALID_KEY'
    if (status === 429) return 'RATE_LIMITED'
    if (status === 402 || status === 403) return 'QUOTA_EXCEEDED'
    return 'NETWORK_ERROR'
  }
}
