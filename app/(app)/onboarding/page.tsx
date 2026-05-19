'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/stitch/atoms/Button'
import { Input } from '@/components/stitch/atoms/Input'
import { FormField } from '@/components/stitch/molecules/FormField'
import { Icon } from '@/components/stitch/atoms/Icon'
import { useToast } from '@/components/stitch/organisms/ToastProvider'
import ProviderSelect from '@/components/onboarding/ProviderSelect'
import type { AIProvider } from '@/lib/ai/types'
import {
  validateApiKey,
  validateProjectName,
  sanitizeInput,
  RateLimiter,
} from '@/lib/validation'

const PROJECT_TYPES = [
  { id: 'saas', label: 'SaaS Application', icon: 'web' },
  { id: 'api', label: 'API Service', icon: 'api' },
  { id: 'internal_tool', label: 'Internal Tool', icon: 'build' },
  { id: 'mobile', label: 'Mobile App', icon: 'phone_android' },
  { id: 'landing_page', label: 'Landing Page', icon: 'web_asset' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [step, setStep] = useState(1)
  const [provider, setProvider] = useState<AIProvider>('anthropic')
  const [apiKey, setApiKey] = useState('')
  const [validating, setValidating] = useState(false)
  const [error, setError] = useState('')
  const rateLimiter = useRef(new RateLimiter(3000))

  // Project creation state
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const [creating, setCreating] = useState(false)

  // Calculate total steps based on provider
  const totalSteps = provider === 'anthropic' ? 3 : 2
  const requiresApiKey = provider === 'anthropic'

  const handleProviderSelect = (selectedProvider: AIProvider) => {
    setProvider(selectedProvider)
  }

  const handleProviderContinue = () => {
    // If provider doesn't require API key, skip to project creation
    if (!requiresApiKey) {
      setStep(2) // Go directly to project creation
    } else {
      setStep(2) // Go to API key input
    }
  }

  const handleValidateApiKey = async () => {
    setError('')

    // Rate limiting check
    if (!rateLimiter.current.canSubmit()) {
      const remaining = Math.ceil(rateLimiter.current.getRemainingTime() / 1000)
      setError(`Please wait ${remaining} seconds before trying again`)
      return
    }

    // Sanitize input
    const sanitizedKey = sanitizeInput(apiKey)

    // Validate API key format
    const validation = validateApiKey(sanitizedKey)
    if (!validation.isValid) {
      setError(validation.error || 'Invalid API key format')
      return
    }

    setValidating(true)

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: sanitizedKey }),
      })

      if (response.ok) {
        // Store in localStorage only
        localStorage.setItem('anthropic_api_key', sanitizedKey)
        showToast({
          message: 'API key validated successfully',
          type: 'success',
        })
        setStep(3) // Go to project creation
      } else {
        const data = await response.json()
        setError(data.error || 'Invalid API key. Please check your credentials and try again.')
      }
    } catch (err) {
      setError('Failed to validate API key. Please try again.')
    } finally {
      setValidating(false)
    }
  }

  const createProject = async () => {
    setError('')

    // Sanitize project name
    const sanitizedName = sanitizeInput(projectName)

    // Validate project name
    const nameValidation = validateProjectName(sanitizedName)
    if (!nameValidation.isValid) {
      setError(nameValidation.error || 'Invalid project name')
      return
    }

    // Validate project type
    if (!projectType) {
      setError('Please select a project type')
      return
    }

    // Validate project type is in allowed list
    const validTypes = PROJECT_TYPES.map((t) => t.id)
    if (!validTypes.includes(projectType)) {
      setError('Invalid project type selected')
      return
    }

    setCreating(true)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sanitizedName,
          project_type: projectType,
        }),
      })

      if (response.ok) {
        const { id } = await response.json()
        showToast({
          message: 'Project created successfully',
          type: 'success',
        })
        router.push(`/project/${id}/interview`)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create project')
      }
    } catch (err) {
      setError('Failed to create project. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="bg-stitch-vellum-white min-h-screen flex items-center justify-center p-stitch-gap-md font-stitch-body-md text-stitch-ink-black antialiased">
      <main className="w-full max-w-[600px] bg-stitch-vellum-white border border-stitch-parchment p-stitch-section-xl relative">
        {/* Decorative top line */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-stitch-parchment"></div>

        {step === 1 ? (
          /* Step 1: Provider Selection */
          <>
            <div className="mb-stitch-section-xl">
              <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone block mb-stitch-gap-xs">
                Step 1 of {totalSteps}
              </span>
              <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black tracking-tight mb-4">
                Select AI Provider
              </h1>
              <p className="font-stitch-body-lg text-stitch-body-lg text-stitch-on-surface-variant max-w-[480px]">
                Choose the AI provider that will power your documentation interview.
                Each option offers different capabilities and requirements.
              </p>
            </div>

            <div className="space-y-stitch-gap-lg">
              <ProviderSelect
                onSelect={handleProviderSelect}
                selectedProvider={provider}
              />

              {/* Actions */}
              <div className="pt-stitch-gap-md flex justify-end border-t border-stitch-parchment mt-stitch-section-xl">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleProviderContinue}
                  className="w-full sm:w-auto font-medium"
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        ) : step === 2 && requiresApiKey ? (
          /* Step 2: API Key Setup (Anthropic only) */
          <>
            <div className="mb-stitch-section-xl">
              <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone block mb-stitch-gap-xs">
                Step 2 of {totalSteps}
              </span>
              <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black tracking-tight mb-4">
                Initialize Session
              </h1>
              <p className="font-stitch-body-lg text-stitch-body-lg text-stitch-on-surface-variant max-w-[480px]">
                To commence scholarly analysis, please provide your Anthropic API
                credentials. This establishes the foundational reasoning engine for
                your project.
              </p>
            </div>

            <div className="space-y-stitch-gap-lg">
              {/* Input Field Group */}
              <FormField
                label="Anthropic API Key"
                error={error}
              >
                <Input
                  type="password"
                  placeholder="sk-ant-api03-..."
                  icon="key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  error={!!error}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleValidateApiKey()
                    }
                  }}
                  maxLength={200}
                />
              </FormField>

              {/* Info Card */}
              <div className="bg-stitch-surface-container-lowest border border-stitch-parchment p-6 flex items-start gap-4">
                <Icon
                  name="info"
                  filled
                  size="md"
                  className="text-stitch-terra-cotta mt-0.5"
                />
                <div className="font-stitch-body-sm text-stitch-body-sm text-stitch-on-surface-variant space-y-2">
                  <p>
                    Your key acts as a direct conduit to the language model. It
                    remains encrypted locally on your device and is never stored on
                    external servers.
                  </p>
                  <p>
                    For a comprehensive review of our security measures, please
                    consult the{' '}
                    <a
                      href="#"
                      className="text-stitch-terra-cotta hover:underline underline-offset-2"
                    >
                      Data Handling Protocol
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-stitch-gap-md flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-stitch-parchment mt-stitch-section-xl">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleValidateApiKey}
                  loading={validating}
                  disabled={!apiKey}
                  className="w-full sm:w-auto font-medium"
                >
                  Validate & Continue
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Step 3 (or 2 for non-Anthropic): Project Creation */
          <>
            <div className="mb-stitch-section-xl">
              <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone block mb-stitch-gap-xs">
                Step {requiresApiKey ? 3 : 2} of {totalSteps}
              </span>
              <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black tracking-tight mb-4">
                Create Your First Project
              </h1>
              <p className="font-stitch-body-lg text-stitch-body-lg text-stitch-on-surface-variant max-w-[480px]">
                Initialize a new scholarly documentation workspace for your
                repository.
              </p>
            </div>

            <div className="space-y-stitch-gap-lg">
              {/* Project Name */}
              <FormField label="Project Name" labelStyle="caps">
                <Input
                  type="text"
                  placeholder="e.g., Quantum Analysis Engine"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  maxLength={100}
                  error={!!error}
                />
              </FormField>

              {/* Project Type */}
              <div className="space-y-2">
                <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-dusty-gray uppercase block">
                  Project Type
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectType(type.id)}
                      className={`flex flex-col items-start p-4 bg-stitch-vellum-white border rounded hover:border-stitch-graphite transition-colors text-left group ${
                        projectType === type.id
                          ? 'border-stitch-ink-black bg-stitch-surface'
                          : 'border-stitch-parchment'
                      }`}
                    >
                      <Icon
                        name={type.icon}
                        size="md"
                        className="text-stitch-ink-black mb-2"
                      />
                      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black font-medium">
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-stitch-terra-cotta font-stitch-body-sm text-stitch-body-sm">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="pt-stitch-gap-md flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-stitch-parchment mt-stitch-section-xl">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setStep(requiresApiKey ? 2 : 1)}
                  className="w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={createProject}
                  loading={creating}
                  disabled={!projectName || !projectType}
                  className="w-full sm:w-auto font-medium"
                >
                  Create Project
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
