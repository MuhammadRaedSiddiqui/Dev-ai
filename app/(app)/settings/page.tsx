'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SideNavBar } from '@/components/stitch/organisms/SideNavBar'
import { Button } from '@/components/stitch/atoms/Button'
import { Input } from '@/components/stitch/atoms/Input'
import { Toggle } from '@/components/stitch/atoms/Toggle'
import { FormField } from '@/components/stitch/molecules/FormField'
import { Breadcrumb } from '@/components/stitch/molecules/Breadcrumb'
import { useToast } from '@/components/stitch/organisms/ToastProvider'
import { validateApiKey, sanitizeInput, RateLimiter } from '@/lib/validation'

export default function SettingsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const rateLimiter = useRef(new RateLimiter(3000))

  // Load settings on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('anthropic_api_key')
    if (storedKey) {
      setApiKey(storedKey)
    }

    const storedAutoSave = localStorage.getItem('auto_save')
    if (storedAutoSave !== null) {
      setAutoSave(storedAutoSave === 'true')
    }
  }, [])

  const handleUpdateApiKey = async () => {
    setError('')
    setSuccess('')

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
      setError(validation.error || 'Invalid API key')
      return
    }

    setUpdating(true)

    try {
      // Validate the key with the API
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: sanitizedKey }),
      })

      if (response.ok) {
        localStorage.setItem('anthropic_api_key', sanitizedKey)
        setSuccess('API key updated successfully')
        showToast({
          message: 'API key updated successfully',
          type: 'success',
        })
      } else {
        setError('Invalid API key or API validation failed')
        showToast({
          message: 'Invalid API key',
          type: 'error',
        })
      }
    } catch (err) {
      setError('Failed to validate API key. Please try again.')
      showToast({
        message: 'Failed to validate API key',
        type: 'error',
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleAutoSaveToggle = (checked: boolean) => {
    setAutoSave(checked)
    localStorage.setItem('auto_save', checked.toString())
    showToast({
      message: `Auto-save ${checked ? 'enabled' : 'disabled'}`,
      type: 'info',
      duration: 2000,
    })
  }

  const handleResetLocalStorage = () => {
    if (
      confirm(
        'This will delete all local data including your API key. Continue?'
      )
    ) {
      localStorage.clear()
      router.push('/onboarding')
    }
  }

  return (
    <div className="bg-stitch-vellum-white text-stitch-ink-black flex h-screen overflow-hidden antialiased font-stitch-body-md text-stitch-body-md">
      <SideNavBar currentPath="/settings" onNewProject={() => router.push('/onboarding')} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-stitch-vellum-white relative ml-64">
        {/* TopAppBar (Breadcrumb) */}
        <header className="sticky top-0 z-10 bg-stitch-vellum-white/95 backdrop-blur-sm border-b border-stitch-parchment h-16 flex items-center px-stitch-gap-lg w-full">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Settings' },
            ]}
          />
        </header>

        {/* Canvas */}
        <main className="w-full max-w-[800px] mx-auto px-stitch-gap-lg py-stitch-section-xl space-y-stitch-section-xl">
          {/* Page Header */}
          <section>
            <h2 className="font-stitch-h2 text-stitch-h2 text-stitch-ink-black mb-2">
              Settings
            </h2>
            <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-dusty-gray">
              Manage your account configuration and project defaults.
            </p>
          </section>

          {/* API Configuration */}
          <section className="space-y-6">
            <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black border-b border-stitch-parchment pb-2">
              API Credentials
            </h3>
            <div className="space-y-3 max-w-md">
              <FormField
                label="Anthropic API Key"
                hint="Your key is stored locally and never leaves your browser."
              >
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  icon="key"
                  error={!!error}
                  maxLength={200}
                />
              </FormField>

              {error && (
                <p className="text-stitch-terra-cotta font-stitch-caption text-stitch-caption">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-stitch-ink-black font-stitch-caption text-stitch-caption">
                  {success}
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleUpdateApiKey}
                  loading={updating}
                >
                  Update Key
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
          </section>

          {/* Project Preferences */}
          <section className="space-y-6">
            <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black border-b border-stitch-parchment pb-2">
              Project Defaults
            </h3>
            <div className="space-y-6 max-w-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black">
                    Auto-save Drafts
                  </span>
                  <span className="font-stitch-caption text-stitch-caption text-stitch-dusty-gray">
                    Automatically save your work locally.
                  </span>
                </div>
                <Toggle checked={autoSave} onChange={handleAutoSaveToggle} />
              </div>
            </div>
          </section>

          {/* Account Actions (Danger Zone) */}
          <section className="space-y-6 pt-stitch-gap-lg">
            <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-terra-cotta border-b border-stitch-parchment pb-2">
              Danger Zone
            </h3>
            <div className="space-y-4">
              <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-graphite">
                Permanently delete your local data and reset the session.
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={handleResetLocalStorage}
              >
                Reset Local Storage
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
