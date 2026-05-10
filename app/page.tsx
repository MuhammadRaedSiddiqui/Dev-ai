import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">DevDocs AI</h1>
          <p className="text-lg text-muted-foreground">
            AI-powered pre-build planning assistant for developers
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
            Interview with AI before you code. Get a complete 10-file documentation bundle
            covering architecture, database, API contracts, testing, and deployment.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-12 text-xs text-muted-foreground">
          <p>✓ Bring Your Own API Key (BYOK)</p>
          <p>✓ Your key never leaves your browser</p>
          <p>✓ Free tier: 3 projects</p>
        </div>
      </div>
    </main>
  )
}
