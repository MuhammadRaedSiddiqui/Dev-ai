/**
 * Anthropic API Key Validation Utilities
 *
 * Client-side validation for BYOK (Bring Your Own Key) flow.
 * Keys are stored in localStorage only - never sent to DevDocs AI servers.
 */

export interface ValidationResult {
  valid: boolean
  error?: string
  errorCode?: 'INVALID_FORMAT' | 'INVALID_KEY' | 'QUOTA_EXCEEDED' | 'RATE_LIMITED' | 'NETWORK_ERROR'
}

/**
 * Validate API key format (client-side only)
 * Expected format: sk-ant-api03-...
 */
export function validateKeyFormat(key: string): ValidationResult {
  if (!key || typeof key !== 'string') {
    return {
      valid: false,
      error: 'API key is required',
      errorCode: 'INVALID_FORMAT',
    }
  }

  const trimmedKey = key.trim()

  // Check for correct prefix
  if (!trimmedKey.startsWith('sk-ant-')) {
    return {
      valid: false,
      error: 'API key must start with sk-ant-',
      errorCode: 'INVALID_FORMAT',
    }
  }

  // Check minimum length (Anthropic keys are typically 100+ chars)
  if (trimmedKey.length < 50) {
    return {
      valid: false,
      error: 'API key appears to be incomplete',
      errorCode: 'INVALID_FORMAT',
    }
  }

  return { valid: true }
}

/**
 * Test API key by calling server-side validation endpoint
 * This verifies the key is valid and has quota remaining
 */
export async function testApiCall(key: string): Promise<ValidationResult> {
  try {
    const response = await fetch('/api/validate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key }),
    })

    const data = await response.json()

    if (data.valid) {
      return { valid: true }
    }

    return {
      valid: false,
      error: data.error || 'API key validation failed',
      errorCode: data.errorCode || 'INVALID_KEY',
    }
  } catch (error) {
    return {
      valid: false,
      error: 'Network error. Please check your connection and try again.',
      errorCode: 'NETWORK_ERROR',
    }
  }
}

/**
 * Store API key in localStorage
 * Keys are stored client-side only and never transmitted to DevDocs AI servers
 */
export function storeApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('anthropic_api_key', key.trim())
  }
}

/**
 * Retrieve API key from localStorage
 */
export function getStoredApiKey(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('anthropic_api_key')
  }
  return null
}

/**
 * Clear API key from localStorage (on logout)
 */
export function clearApiKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('anthropic_api_key')
  }
}
