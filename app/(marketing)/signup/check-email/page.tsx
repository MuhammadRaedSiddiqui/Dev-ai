import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Check Your Email — DevDocs AI',
  description: 'Verify your email address',
  robots: 'noindex, nofollow',
}

export default function CheckEmailPage() {
  return (
    <div className="bg-stitch-surface text-stitch-on-surface min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-[448px] mx-auto text-center">
        {/* Header / Logo */}
        <div className="mb-8">
          <h1 className="font-stitch-display text-stitch-h3 font-normal text-stitch-ink-black mb-2">
            DevDocs AI
          </h1>
          <p className="font-stitch-body-md text-stitch-body-md text-stitch-stone">
            Scholarly Rigor for Modern Code.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-stitch-vellum-white border border-stitch-parchment p-8 rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-stitch-secondary-fixed/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span
              className="material-symbols-outlined text-stitch-terra-cotta text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mail
            </span>
          </div>

          <h2 className="font-stitch-h2 text-stitch-h2 text-stitch-ink-black mb-4">
            Check your email
          </h2>

          <p className="font-stitch-body-md text-stitch-body-md text-stitch-on-surface-variant mb-6">
            We've sent you a verification link. Please check your email and click
            the link to activate your account.
          </p>

          <div className="bg-stitch-surface-container-lowest border border-stitch-parchment p-4 rounded-lg text-left">
            <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone">
              <strong className="text-stitch-ink-black">Didn't receive the email?</strong>
              <br />
              Check your spam folder or wait a few minutes and try again.
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-8 font-stitch-body-sm text-stitch-body-sm text-stitch-stone">
          <a
            href="/login"
            className="text-stitch-ink-black hover:text-stitch-terra-cotta transition-colors underline"
          >
            Return to sign in
          </a>
        </p>
      </main>
    </div>
  )
}
