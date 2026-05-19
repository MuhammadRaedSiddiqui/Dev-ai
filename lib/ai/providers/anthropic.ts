import type Anthropic from '@anthropic-ai/sdk'
import type { AIClient, StreamConfig, ValidationResult } from '../types'
import { detectDomainCompletion, extractMarkdownContent } from '@/lib/interview/completion'

/**
 * Anthropic AI Provider
 * Wraps the Anthropic SDK with the unified AIClient interface
 */
export class AnthropicProvider implements AIClient {
  provider = 'anthropic' as const
  private client: Anthropic

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Anthropic API key is required')
    }

    // Dynamic import to avoid bundling issues
    const AnthropicSDK = require('@anthropic-ai/sdk').default
    this.client = new AnthropicSDK({
      apiKey,
      dangerouslyAllowBrowser: true,
    })
  }

  /**
   * Stream a response from Anthropic API
   */
  async stream(config: StreamConfig): Promise<string> {
    let fullMessage = ''

    try {
      const stream = await this.client.messages.stream({
        model: config.model,
        max_tokens: config.maxTokens || 4096,
        system: config.systemPrompt,
        messages: config.messages,
      })

      // Process streaming tokens
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          const token = chunk.delta.text
          fullMessage += token

          // Call token callback for real-time UI updates
          if (config.onToken) {
            config.onToken(token)
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
   * Validate connection to Anthropic API
   */
  async validateConnection(): Promise<ValidationResult> {
    try {
      // Make a minimal test call
      await this.client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'test' }],
      })

      return { valid: true }
    } catch (error: unknown) {
      return {
        valid: false,
        error: this.getErrorMessage(error),
        errorCode: this.getErrorCode(error),
      }
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status
      if (status === 401) return 'Invalid API key'
      if (status === 429) return 'Rate limit exceeded'
      if (status === 402 || status === 403) return 'Quota exceeded'
      if (status >= 500) return 'Anthropic API error'
    }
    return 'Connection failed'
  }

  private getErrorCode(error: unknown): string {
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status
      if (status === 401) return 'INVALID_KEY'
      if (status === 429) return 'RATE_LIMITED'
      if (status === 402 || status === 403) return 'QUOTA_EXCEEDED'
    }
    return 'NETWORK_ERROR'
  }
}
