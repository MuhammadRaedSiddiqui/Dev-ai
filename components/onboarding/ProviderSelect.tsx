'use client'

import { useState } from 'react'
import { Icon } from '@/components/stitch/atoms/Icon'
import type { AIProvider } from '@/lib/ai/types'

interface ProviderOption {
  id: AIProvider
  label: string
  description: string
  icon: string
  requiresApiKey: boolean
  badge?: string
}

const PROVIDER_OPTIONS: ProviderOption[] = [
  {
    id: 'anthropic',
    label: 'Anthropic Claude',
    description: 'Production-grade AI powered by Claude Sonnet 4.6. Requires your own API key (BYOK).',
    icon: 'psychology',
    requiresApiKey: true,
    badge: 'Recommended'
  },
  {
    id: 'ollama',
    label: 'Ollama (Local)',
    description: 'Run AI models locally on your machine. Requires Ollama installed and running.',
    icon: 'computer',
    requiresApiKey: false,
    badge: 'Development'
  },
  {
    id: 'mock',
    label: 'Mock Mode',
    description: 'Simulated AI responses for testing the UI without any API calls or local models.',
    icon: 'science',
    requiresApiKey: false,
    badge: 'Testing'
  }
]

interface ProviderSelectProps {
  onSelect: (provider: AIProvider) => void
  selectedProvider?: AIProvider
}

export default function ProviderSelect({ onSelect, selectedProvider }: ProviderSelectProps) {
  const [selected, setSelected] = useState<AIProvider>(selectedProvider || 'anthropic')

  const handleSelect = (provider: AIProvider) => {
    setSelected(provider)
    // Store in localStorage
    localStorage.setItem('devdocs_provider', provider)
    onSelect(provider)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {PROVIDER_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            className={`w-full flex items-start gap-4 p-5 bg-stitch-vellum-white border rounded-stitch-DEFAULT transition-all text-left group ${
              selected === option.id
                ? 'border-stitch-ink-black bg-stitch-surface shadow-sm'
                : 'border-stitch-parchment hover:border-stitch-graphite'
            }`}
          >
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              selected === option.id
                ? 'bg-stitch-ink-black text-stitch-vellum-white'
                : 'bg-stitch-surface text-stitch-stone group-hover:bg-stitch-surface-container'
            }`}>
              <Icon
                name={option.icon}
                size="md"
                filled={selected === option.id}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-stitch-body-md text-stitch-body-md font-medium text-stitch-ink-black">
                  {option.label}
                </span>
                {option.badge && (
                  <span className={`font-stitch-label-caps text-stitch-label-caps px-2 py-0.5 rounded-full ${
                    option.badge === 'Recommended'
                      ? 'bg-stitch-terra-cotta/10 text-stitch-terra-cotta'
                      : 'bg-stitch-stone/10 text-stitch-stone'
                  }`}>
                    {option.badge}
                  </span>
                )}
              </div>
              <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-on-surface-variant">
                {option.description}
              </p>
              {!option.requiresApiKey && (
                <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone mt-2">
                  ✓ No API key required
                </p>
              )}
            </div>

            {/* Radio indicator */}
            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected === option.id
                ? 'border-stitch-ink-black'
                : 'border-stitch-parchment group-hover:border-stitch-graphite'
            }`}>
              {selected === option.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-stitch-ink-black" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Info based on selection */}
      {selected === 'ollama' && (
        <div className="bg-stitch-surface-container-lowest border border-stitch-parchment p-4 flex items-start gap-3">
          <Icon
            name="info"
            filled
            size="sm"
            className="text-stitch-stone mt-0.5"
          />
          <div className="font-stitch-body-sm text-stitch-body-sm text-stitch-on-surface-variant space-y-1">
            <p className="font-medium text-stitch-ink-black">Ollama Setup Required</p>
            <p>Make sure Ollama is installed and running:</p>
            <code className="block bg-stitch-vellum-white border border-stitch-parchment px-2 py-1 rounded text-xs mt-2">
              ollama serve
            </code>
            <code className="block bg-stitch-vellum-white border border-stitch-parchment px-2 py-1 rounded text-xs">
              ollama pull llama3.2:3b
            </code>
          </div>
        </div>
      )}

      {selected === 'mock' && (
        <div className="bg-stitch-surface-container-lowest border border-stitch-parchment p-4 flex items-start gap-3">
          <Icon
            name="info"
            filled
            size="sm"
            className="text-stitch-stone mt-0.5"
          />
          <div className="font-stitch-body-sm text-stitch-body-sm text-stitch-on-surface-variant">
            <p className="font-medium text-stitch-ink-black mb-1">Mock Mode</p>
            <p>
              Mock mode provides pre-defined responses for all 10 documentation domains.
              Perfect for testing the UI without API costs or local model setup.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
