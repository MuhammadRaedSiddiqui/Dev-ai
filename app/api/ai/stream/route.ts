import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

/**
 * Server-side streaming endpoint for AI providers
 * Handles Anthropic API calls to avoid bundling Node.js SDK in browser
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, apiKey, model, systemPrompt, messages, maxTokens } = body

    // Validate required fields
    if (!provider || !messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Handle different providers
    if (provider === 'anthropic') {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: 'API key required for Anthropic' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }

      return handleAnthropicStream(apiKey, model, systemPrompt, messages, maxTokens)
    }

    if (provider === 'ollama') {
      // Ollama can be called directly from client since it's a local HTTP API
      return new Response(
        JSON.stringify({ error: 'Ollama should be called directly from client' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (provider === 'mock') {
      return handleMockStream(messages)
    }

    return new Response(
      JSON.stringify({ error: `Unknown provider: ${provider}` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('AI stream error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * Handle Anthropic streaming with Server-Sent Events
 */
async function handleAnthropicStream(
  apiKey: string,
  model: string,
  systemPrompt: string,
  messages: any[],
  maxTokens: number
) {
  const client = new Anthropic({
    apiKey,
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = await client.messages.stream({
          model: model || 'claude-sonnet-4-6',
          max_tokens: maxTokens || 4096,
          system: systemPrompt,
          messages,
        })

        for await (const chunk of anthropicStream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            const token = chunk.delta.text
            // Send as Server-Sent Event
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ token })}\n\n`)
            )
          }
        }

        // Send completion signal
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`)
        )
        controller.close()
      } catch (error: any) {
        console.error('Anthropic stream error:', error)
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              error: error.message || 'Stream error',
              status: error.status
            })}\n\n`
          )
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

/**
 * Handle mock streaming for testing
 */
async function handleMockStream(messages: any[]) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const mockResponse = `Thank you for sharing that information. Let me help you plan your project.

## Project Overview
Based on what you've told me, here's what I understand about your project...

[Mock response continues...]`

      // Simulate streaming by sending chunks
      const words = mockResponse.split(' ')
      for (const word of words) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ token: word + ' ' })}\n\n`)
        )
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`)
      )
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
