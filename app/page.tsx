import { TopNavBar } from '@/components/stitch/organisms/TopNavBar'
import { Footer } from '@/components/stitch/organisms/Footer'
import { Button } from '@/components/stitch/atoms/Button'
import { Icon } from '@/components/stitch/atoms/Icon'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-stitch-vellum-white min-h-screen flex flex-col font-stitch-body-md text-stitch-body-md text-stitch-ink-black antialiased">
      <TopNavBar variant="marketing" />

      <main className="flex-grow flex flex-col items-center justify-center py-stitch-section-xl px-stitch-gap-lg w-full max-w-stitch-container-max mx-auto text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center border border-stitch-parchment bg-stitch-surface p-stitch-section-xl rounded-lg">
          {/* Core Typography Stack */}
          <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black mb-stitch-gap-md">
            DevDocs AI
          </h1>
          <p className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mb-stitch-gap-xs">
            AI-powered pre-build planning assistant for developers
          </p>
          <p className="font-stitch-body-lg text-stitch-body-lg text-stitch-on-surface-variant max-w-2xl mb-stitch-gap-lg">
            Interview with AI before you code. Get a complete 10-file
            documentation bundle.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-stitch-gap-md items-center justify-center mb-stitch-section-xl w-full">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full uppercase">
                Get Started
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full uppercase"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="flex flex-col gap-stitch-gap-xs text-left w-full max-w-md border-t border-stitch-parchment pt-stitch-gap-md">
            <div className="flex items-start gap-stitch-gap-xs">
              <Icon
                name="check_circle"
                filled
                size="md"
                className="text-stitch-terra-cotta mt-1"
              />
              <div>
                <span className="font-stitch-body-md text-stitch-body-md font-medium text-stitch-ink-black block">
                  Structured Requirements Gathering
                </span>
                <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone block">
                  Ensure no edge cases are missed through guided inquiry.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-stitch-gap-xs">
              <Icon
                name="check_circle"
                filled
                size="md"
                className="text-stitch-terra-cotta mt-1"
              />
              <div>
                <span className="font-stitch-body-md text-stitch-body-md font-medium text-stitch-ink-black block">
                  Automated Documentation Synthesis
                </span>
                <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone block">
                  Generate readmes, API specs, and component trees instantly.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-stitch-gap-xs">
              <Icon
                name="check_circle"
                filled
                size="md"
                className="text-stitch-terra-cotta mt-1"
              />
              <div>
                <span className="font-stitch-body-md text-stitch-body-md font-medium text-stitch-ink-black block">
                  Scholarly Output Formatting
                </span>
                <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone block">
                  Clean, highly readable artifacts ready for immediate
                  implementation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
