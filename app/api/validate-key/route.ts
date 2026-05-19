import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { AIProvider } from '@/lib/ai/types'

/**
 * API Route: POST /api/validate-key
 *
 * Validates AI provider credentials or connection.
 * Supports Anthropic (API key), Ollama (connection check), and Mock (always valid).
 * The key is sent from the client but never stored server-side.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, provider = 'anthropic' } = body as { key?: string; provider?: AIProvider }

    // Route to appropriate validation based on provider
    switch (provider) {
      case 'anthropic':
        return await validateAnthropicKey(key)

      case 'ollama':
        return await validateOllamaConnection()

      case 'mock':
        return NextResponse.json({ valid: true })

      default:
        return NextResponse.json(
          { valid: false, error: 'Unknown provider', errorCode: 'INVALID_PROVIDER' },
          { status: 400 }
        )
    }
  } catch (error: unknown) {
    console.error('Validation error:', error)
    return NextResponse.json({
      valid: false,
      error: 'Validation failed. Please try again.',
      errorCode: 'NETWORK_ERROR',
    })
  }
}

/**
 * Validate Anthropic API key
 */
async function validateAnthropicKey(key?: string) {
  // Validate input exists and is a string
  if (!key || typeof key !== 'string') {
    return NextResponse.json(
      { valid: false, error: 'API key is required', errorCode: 'INVALID_FORMAT' },
      { status: 400 }
    )
  }

  // Sanitize and validate format
  const sanitizedKey = key.trim()

  // Check key format
  if (!sanitizedKey.startsWith('sk-ant-')) {
    return NextResponse.json(
      { valid: false, error: 'Invalid API key format', errorCode: 'INVALID_FORMAT' },
      { status: 400 }
    )
  }

  // Check length constraints
  if (sanitizedKey.length < 40 || sanitizedKey.length > 200) {
    return NextResponse.json(
      { valid: false, error: 'Invalid API key length', errorCode: 'INVALID_FORMAT' },
      { status: 400 }
    )
  }

  // Check for valid characters only
  if (!/^[a-zA-Z0-9-]+$/.test(sanitizedKey)) {
    return NextResponse.json(
      { valid: false, error: 'API key contains invalid characters', errorCode: 'INVALID_FORMAT' },
      { status: 400 }
    )
  }

  try {
    // Import Anthropic SDK (server-side only)
    const { default: Anthropic } = await import('@anthropic-ai/sdk')

    const client = new Anthropic({
      apiKey: sanitizedKey,
    })

    // Make a minimal test call
    const response = await client.messages.countTokens({
      model: 'claude-sonnet-4-6',
      messages: [{ role: 'user', content: 'test' }],
    })

    if (response.input_tokens !== undefined) {
      return NextResponse.json({ valid: true })
    }

    return NextResponse.json({
      valid: false,
      error: 'Unexpected API response',
      errorCode: 'INVALID_KEY',
    })
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status

      if (status === 401) {
        return NextResponse.json({
          valid: false,
          error: 'Invalid API key. Please check your key and try again.',
          errorCode: 'INVALID_KEY',
        })
      }

      if (status === 429) {
        return NextResponse.json({
          valid: false,
          error: 'Rate limit exceeded. Please wait a moment and try again.',
          errorCode: 'RATE_LIMITED',
        })
      }

      if (status === 402 || status === 403) {
        return NextResponse.json({
          valid: false,
          error:
            'Your API key is valid but has no quota remaining. Please add credits to your Anthropic account.',
          errorCode: 'QUOTA_EXCEEDED',
        })
      }
    }

    throw error
  }
}

/**
 * Validate Ollama connection
 */
async function validateOllamaConnection() {
  const baseURL = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434'
  const model = process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'llama3.2:3b'

  try {
    // Check if Ollama is running
    const response = await fetch(`${baseURL}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    if (!response.ok) {
      return NextResponse.json({
        valid: false,
        error: 'Cannot connect to Ollama. Make sure Ollama is running (ollama serve).',
        errorCode: 'CONNECTION_FAILED',
      })
    }

    const data = await response.json()
    const models = data.models || []

    // Check if the required model exists
    const modelExists = models.some((m: { name: string }) => m.name === model)

    if (!modelExists) {
      return NextResponse.json({
        valid: false,
        error: `Model ${model} not found. Run: ollama pull ${model}`,
        errorCode: 'MODEL_NOT_FOUND',
      })
    }

    return NextResponse.json({ valid: true })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json({
        valid: false,
        error: 'Ollama connection timeout. Make sure Ollama is running.',
        errorCode: 'TIMEOUT',
      })
    }

    return NextResponse.json({
      valid: false,
      error: 'Ollama is not running. Start with: ollama serve',
      errorCode: 'NOT_RUNNING',
    })
  }
}
