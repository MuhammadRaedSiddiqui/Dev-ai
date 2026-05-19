import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * API Route: POST /api/validate-key
 *
 * Validates an Anthropic API key by making a test call.
 * The key is sent from the client but never stored server-side.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key } = body

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

    console.error('API key validation error:', error)
    return NextResponse.json({
      valid: false,
      error: 'Network error. Please check your connection and try again.',
      errorCode: 'NETWORK_ERROR',
    })
  }
}
