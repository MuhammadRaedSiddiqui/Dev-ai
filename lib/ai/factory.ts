import type { AIClient, AIProvider, ProviderConfig } from './types'
import { AnthropicProvider } from './providers/anthropic'
import { OllamaProvider } from './providers/ollama'
import { MockProvider } from './providers/mock'

/**
 * Get the configured AI provider from environment or localStorage
 */
export function getConfiguredProvider(): AIProvider {
  // Priority: env var > localStorage > default
  if (typeof window !== 'undefined') {
    const envProvider = process.env.NEXT_PUBLIC_AI_PROVIDER as AIProvider
    if (envProvider && ['anthropic', 'ollama', 'mock'].includes(envProvider)) {
      return envProvider
    }

    const storedProvider = localStorage.getItem('devdocs_provider') as AIProvider
    if (storedProvider && ['anthropic', 'ollama', 'mock'].includes(storedProvider)) {
      return storedProvider
    }

    // Check legacy mock mode flag
    if (localStorage.getItem('devdocs_mock_mode') === 'true') {
      return 'mock'
    }
  }

  return 'anthropic' // Default
}

/**
 * Create an AI client based on configuration
 */
export async function createAIClient(config?: ProviderConfig): Promise<AIClient> {
  const provider = config?.provider || getConfiguredProvider()

  switch (provider) {
    case 'anthropic': {
      const apiKey = config?.apiKey ||
        (typeof window !== 'undefined' ? localStorage.getItem('anthropic_api_key') : null)

      if (!apiKey) {
        throw new Error('Anthropic API key not found. Please configure your API key.')
      }

      return new AnthropicProvider(apiKey)
    }

    case 'ollama': {
      const baseURL = config?.baseURL ||
        process.env.NEXT_PUBLIC_OLLAMA_URL ||
        'http://localhost:11434'

      const model = config?.model ||
        process.env.NEXT_PUBLIC_OLLAMA_MODEL ||
        'llama3.2:3b'

      return new OllamaProvider(baseURL, model)
    }

    case 'mock': {
      return new MockProvider()
    }

    default: {
      throw new Error(`Unknown provider: ${provider}`)
    }
  }
}

/**
 * Get the default model for the configured provider
 */
export function getDefaultModel(provider?: AIProvider): string {
  const activeProvider = provider || getConfiguredProvider()

  switch (activeProvider) {
    case 'anthropic':
      return 'claude-sonnet-4-6'
    case 'ollama':
      return process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'llama3.2:3b'
    case 'mock':
      return 'mock-model'
    default:
      return 'claude-sonnet-4-6'
  }
}
