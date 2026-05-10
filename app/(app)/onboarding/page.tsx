'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ApiKeyInput from '@/components/onboarding/ApiKeyInput'
import ProjectTypeSelect from '@/components/onboarding/ProjectTypeSelect'
import { getStoredApiKey } from '@/lib/anthropic/validation'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<'api-key' | 'project-type'>(() => {
    // Check if API key already exists
    if (typeof window !== 'undefined' && getStoredApiKey()) {
      return 'project-type'
    }
    return 'api-key'
  })
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApiKeySuccess = () => {
    setStep('project-type')
  }

  const handleProjectCreate = async (projectType: string, projectName: string) => {
    setCreating(true)
    setError(null)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          project_type: projectType,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create project')
      }

      const project = await response.json()

      // Redirect to interview screen
      router.push(`/project/${project.id}/interview`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
      setCreating(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to DevDocs AI</h1>
        <p className="mt-2 text-muted-foreground">
          Let's get you set up in just 2 steps
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center space-x-4">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            step === 'api-key'
              ? 'bg-primary text-primary-foreground'
              : 'bg-primary/20 text-primary'
          }`}
        >
          1
        </div>
        <div className="h-px w-16 bg-border" />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            step === 'project-type'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          2
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        {step === 'api-key' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 1: API Key Setup</h2>
            <ApiKeyInput onSuccess={handleApiKeySuccess} />
          </div>
        )}

        {step === 'project-type' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 2: Create Your First Project</h2>
            {error && (
              <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {creating ? (
              <div className="py-8 text-center">
                <div className="text-sm text-muted-foreground">Creating project...</div>
              </div>
            ) : (
              <ProjectTypeSelect onSelect={handleProjectCreate} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
