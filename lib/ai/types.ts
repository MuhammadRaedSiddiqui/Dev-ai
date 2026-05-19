import type { DomainId } from '@/lib/interview/domains'

/**
 * Supported AI providers
 */
export type AIProvider = 'anthropic' | 'ollama' | 'mock'

/**
 * Unified AI client interface
 * All providers must implement this interface
 */
export interface AIClient {
  provider: AIProvider
  stream(config: StreamConfig): Promise<string>
  validateConnection(): Promise<ValidationResult>
}

/**
 * Configuration for streaming AI responses
 */
export interface StreamConfig {
  model: string
  systemPrompt: string
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  maxTokens?: number
  onToken?: (token: string) => void
  onComplete?: (fullMessage: string) => void
  onDomainComplete?: (domainId: DomainId, content: string) => void
  onError?: (error: Error) => void
}

/**
 * Result of connection validation
 */
export interface ValidationResult {
  valid: boolean
  error?: string
  errorCode?: string
}

/**
 * Provider-specific configuration
 */
export interface ProviderConfig {
  provider?: AIProvider
  apiKey?: string // For Anthropic
  baseURL?: string // For Ollama
  model?: string // Override default model
}
