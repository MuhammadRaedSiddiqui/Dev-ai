import type { AIClient, StreamConfig, ValidationResult } from '../types'
import { detectDomainCompletion, extractMarkdownContent } from '@/lib/interview/completion'

/**
 * Ollama AI Provider
 * Connects to local Ollama instance via OpenAI-compatible API
 */
export class OllamaProvider implements AIClient {
  provider = 'ollama' as const
  private baseURL: string
  private model: string

  constructor(baseURL: string = 'http://localhost:11434', model: string = 'llama3.2:3b') {
    this.baseURL = baseURL
    this.model = model
  }

  /**
   * Stream a response from Ollama
   */
  async stream(config: StreamConfig): Promise<string> {
    let fullMessage = ''

    try {
      const response = await fetch(`${this.baseURL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: config.model || this.model,
          messages: [
            { role: 'system', content: config.systemPrompt },
            ...config.messages,
          ],
          stream: true,
          max_tokens: config.maxTokens || 4096,
        }),
      })

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
      }

      // Parse Server-Sent Events
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('Response body is not readable')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)

            if (data === '[DONE]') {
              break
            }

            try {
              const parsed = JSON.parse(data)
              const token = parsed.choices?.[0]?.delta?.content

              if (token) {
                fullMessage += token

                if (config.onToken) {
                  config.onToken(token)
                }
              }
            } catch (e) {
              // Skip invalid JSON
              continue
            }
          }
        }
      }

      // Check for domain completion signal
      const completion = detectDomainCompletion(fullMessage)

      if (completion.detected && completion.domainId && completion.content) {
        const markdownContent = extractMarkdownContent(
          completion.content,
          completion.domainId
        )

        if (config.onDomainComplete) {
          config.onDomainComplete(completion.domainId, markdownContent)
        }
      }

      if (config.onComplete) {
        config.onComplete(fullMessage)
      }

      return fullMessage
    } catch (error) {
      console.error('Ollama streaming error:', error)

      if (config.onError) {
        config.onError(error as Error)
      }

      throw error
    }
  }

  /**
   * Validate connection to Ollama
   */
  async validateConnection(): Promise<ValidationResult> {
    try {
      // Check if Ollama is running
      const response = await fetch(`${this.baseURL}/api/tags`)

      if (!response.ok) {
        return {
          valid: false,
          error: 'Cannot connect to Ollama',
          errorCode: 'CONNECTION_FAILED',
        }
      }

      const data = await response.json()
      const models = data.models || []

      // Check if the required model exists
      const modelExists = models.some((m: { name: string }) => m.name === this.model)

      if (!modelExists) {
        return {
          valid: false,
          error: `Model ${this.model} not found. Run: ollama pull ${this.model}`,
          errorCode: 'MODEL_NOT_FOUND',
        }
      }

      return { valid: true }
    } catch (error) {
      return {
        valid: false,
        error: 'Ollama is not running. Start with: ollama serve',
        errorCode: 'NOT_RUNNING',
      }
    }
  }
}
