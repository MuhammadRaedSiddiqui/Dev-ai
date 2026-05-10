import { getStoredApiKey } from '@/lib/anthropic/validation'

/**
 * Anthropic Client Factory
 *
 * Creates an Anthropic SDK client using the user's BYOK API key from localStorage.
 * This is used for client-side AI calls during the interview.
 *
 * IMPORTANT: This module should only be imported in client components with 'use client'
 * and the SDK should only be loaded at runtime, not during build.
 */

export interface AnthropicClientConfig {
  apiKey: string
  model?: string
  useMockMode?: boolean
}

/**
 * Check if mock mode is enabled
 */
export function isMockModeEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('devdocs_mock_mode') === 'true'
}

/**
 * Enable or disable mock mode
 */
export function setMockMode(enabled: boolean): void {
  if (typeof window === 'undefined') return
  if (enabled) {
    localStorage.setItem('devdocs_mock_mode', 'true')
  } else {
    localStorage.removeItem('devdocs_mock_mode')
  }
}

/**
 * Create an Anthropic client with the user's BYOK key
 *
 * Note: This function should only be called in browser context
 * The dynamic import ensures the SDK is not bundled during build
 *
 * Returns null if mock mode is enabled
 */
export async function createAnthropicClient(config?: Partial<AnthropicClientConfig>) {
  // Only run in browser
  if (typeof window === 'undefined') {
    throw new Error('Anthropic client can only be created in browser context')
  }

  // Check if mock mode is enabled
  if (config?.useMockMode || isMockModeEnabled()) {
    return null // Return null to signal mock mode
  }

  // Get API key from localStorage or config
  const apiKey = config?.apiKey || getStoredApiKey()

  if (!apiKey) {
    throw new Error('No API key found. Please configure your Anthropic API key.')
  }

  // Dynamic import to avoid bundling issues
  // This ensures the SDK is only loaded at runtime in the browser
  const { default: Anthropic } = await import(
    /* webpackIgnore: true */ '@anthropic-ai/sdk'
  )

  return new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true, // BYOK model - client-side calls are intentional
  })
}

/**
 * Get the default model for interviews
 */
export function getDefaultModel(): string {
  return 'claude-sonnet-4-6'
}
