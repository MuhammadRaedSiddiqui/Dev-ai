import type { AIClient, StreamConfig } from './types'

/**
 * Stream an AI response using any provider
 * This is a convenience wrapper around AIClient.stream()
 */
export async function streamAIResponse(
  client: AIClient,
  config: StreamConfig
): Promise<string> {
  return client.stream(config)
}

/**
 * Get user-friendly error message for streaming errors
 */
export function getStreamErrorMessage(error: unknown, provider: string): string {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status

    if (provider === 'anthropic') {
      if (status === 401) return 'Invalid API key. Please check your key in settings.'
      if (status === 429) return 'Rate limit exceeded. Please wait a moment and try again.'
      if (status === 402 || status === 403) {
        return 'Your API key has no quota remaining. Please add credits to your Anthropic account.'
      }
      if (status >= 500) {
        return 'Anthropic API is experiencing issues. Please try again in a moment.'
      }
    }

    if (provider === 'ollama') {
      return 'Ollama connection failed. Make sure Ollama is running (ollama serve).'
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('MODEL_NOT_FOUND')) {
      return 'Ollama model not found. Run: ollama pull llama3.2:3b'
    }
    if (error.message.includes('NOT_RUNNING')) {
      return 'Ollama is not running. Start with: ollama serve'
    }
  }

  return 'An error occurred while streaming the response. Please try again.'
}
