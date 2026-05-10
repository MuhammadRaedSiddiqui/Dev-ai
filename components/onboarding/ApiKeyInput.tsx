'use client'

import { useState } from 'react'
import { validateKeyFormat, testApiCall, storeApiKey } from '@/lib/anthropic/validation'
import { setMockMode } from '@/lib/anthropic/client'

interface ApiKeyInputProps {
  onSuccess: () => void
}

export default function ApiKeyInput({ onSuccess }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleVerify = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Client-side format validation
    const formatCheck = validateKeyFormat(apiKey)
    if (!formatCheck.valid) {
      setError(formatCheck.error || 'Invalid API key format')
      setLoading(false)
      return
    }

    // Test API call to verify key works
    const testResult = await testApiCall(apiKey)

    if (testResult.valid) {
      // Store key in localStorage (never sent to server)
      storeApiKey(apiKey)
      setSuccess(true)
      setLoading(false)

      // Proceed to next step after brief success display
      setTimeout(() => {
        onSuccess()
      }, 1000)
    } else {
      setError(testResult.error || 'API key validation failed')
      setLoading(false)
    }
  }

  const handleUseMockMode = () => {
    // Enable mock mode
    setMockMode(true)
    setSuccess(true)

    // Proceed to next step
    setTimeout(() => {
      onSuccess()
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="api-key" className="block text-sm font-medium">
          Anthropic API Key
        </label>
        <input
          id="api-key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-ant-api03-..."
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          disabled={loading || success}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Your API key is stored locally in your browser and never sent to our servers.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
          {error.includes('quota') && (
            <a
              href="https://console.anthropic.com/settings/billing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 underline"
            >
              Add credits →
            </a>
          )}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
          ✓ {apiKey ? 'API key verified successfully' : 'Mock mode enabled'}
        </div>
      )}

      <div className="rounded-md border border-border bg-muted/50 p-4">
        <h3 className="text-sm font-medium">Why do I need an API key?</h3>
        <p className="mt-2 text-xs text-muted-foreground">
          DevDocs AI uses your own Anthropic API key (BYOK - Bring Your Own Key) to power the
          interview. This means:
        </p>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          <li>• You pay Anthropic directly for API usage</li>
          <li>• Your key never leaves your browser</li>
          <li>• No DevDocs AI subscription required for MVP</li>
        </ul>
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
        >
          Get your API key from Anthropic →
        </a>
      </div>

      <button
        onClick={handleVerify}
        disabled={loading || success || !apiKey}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : success ? 'Verified ✓' : 'Verify Key'}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or for testing
          </span>
        </div>
      </div>

      <button
        onClick={handleUseMockMode}
        disabled={loading || success}
        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
      >
        Use Mock Mode (No API Key Required)
      </button>

      <p className="text-xs text-center text-muted-foreground">
        Mock mode simulates AI responses for testing the UI
      </p>
    </div>
  )
}
