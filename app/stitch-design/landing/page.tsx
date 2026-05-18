export default function StitchLandingPage() {
  return (
    <div className="bg-stitch-vellum-white min-h-screen flex flex-col font-stitch-body-md text-stitch-body-md text-stitch-ink-black antialiased">
      {/* TopNavBar */}
      <header className="bg-stitch-surface border-b border-stitch-parchment w-full top-0 sticky z-50">
      <div className="flex justify-between items-center w-full px-stitch-gap-lg max-w-stitch-container-max mx-auto h-16">
      <div className="font-stitch-display text-stitch-h3 font-normal text-stitch-ink-black">
                      DevDocs AI
                  </div>
      <nav className="hidden md:flex items-center gap-stitch-gap-md">
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200" href="#">Workspace</a>
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200" href="#">Documentation</a>
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200" href="#">Project Hub</a>
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200" href="#">Resources</a>
      </nav>
      <div className="flex items-center gap-stitch-gap-md">
      <a className="hidden md:inline-block font-stitch-label-caps text-stitch-label-caps text-stitch-ink-black hover:text-stitch-terra-cotta transition-colors duration-200 uppercase" href="#">Sign In</a>
      <a className="bg-stitch-ink-black text-stitch-on-primary font-stitch-label-caps text-stitch-label-caps py-2 px-4 rounded DEFAULT uppercase hover:opacity-90 transition-opacity font-medium" href="#">Get Started</a>
      </div>
      </div>
      </header>
      {/* Main Content Canvas */}
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
                      Interview with AI before you code. Get a complete 10-file documentation bundle.
                  </p>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-stitch-gap-md items-center justify-center mb-stitch-section-xl w-full">
      <button className="w-full sm:w-auto bg-stitch-ink-black text-stitch-on-primary font-stitch-label-caps text-stitch-label-caps py-3 px-8 rounded DEFAULT uppercase transition-opacity hover:opacity-90 font-medium">
                          Get Started
                      </button>
      <button className="w-full sm:w-auto bg-transparent border text-stitch-ink-black font-stitch-label-caps text-stitch-label-caps py-3 px-8 rounded DEFAULT uppercase hover:bg-stitch-surface-container transition-colors border-stitch-parchment font-normal">
                          Sign In
                      </button>
      </div>
      {/* Features Grid */}
      <div className="flex flex-col gap-stitch-gap-xs text-left w-full max-w-md border-t border-stitch-parchment pt-stitch-gap-md">
      <div className="flex items-start gap-stitch-gap-xs">
      <span className="material-symbols-outlined text-stitch-terra-cotta mt-1" data-icon="check_circle" data-weight="fill" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
      <div>
      <span className="font-stitch-body-md text-stitch-body-md font-medium text-stitch-ink-black block">Structured Requirements Gathering</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone block">Ensure no edge cases are missed through guided inquiry.</span>
      </div>
      </div>
      <div className="flex items-start gap-stitch-gap-xs">
      <span className="material-symbols-outlined text-stitch-terra-cotta mt-1" data-icon="check_circle" data-weight="fill" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
      <div>
      <span className="font-stitch-body-md text-stitch-body-md font-medium text-stitch-ink-black block">Automated Documentation Synthesis</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone block">Generate readmes, API specs, and component trees instantly.</span>
      </div>
      </div>
      <div className="flex items-start gap-stitch-gap-xs">
      <span className="material-symbols-outlined text-stitch-terra-cotta mt-1" data-icon="check_circle" data-weight="fill" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
      <div>
      <span className="font-stitch-body-md text-stitch-body-md font-medium text-stitch-ink-black block">Scholarly Output Formatting</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone block">Clean, highly readable artifacts ready for immediate implementation.</span>
      </div>
      </div>
      </div>
      </div>
      </main>
      {/* Footer */}
      <footer className="bg-stitch-surface border-t border-stitch-parchment w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-stitch-gap-lg py-stitch-gap-md max-w-stitch-container-max mx-auto gap-stitch-gap-md text-center md:text-left">
      <div className="font-stitch-caption text-stitch-caption text-stitch-stone">
                      © 2024 DevDocs AI. Scholarly Rigor for Modern Code.
                  </div>
      <div className="flex flex-wrap justify-center gap-stitch-gap-md">
      <a className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200" href="#">Privacy Policy</a>
      <a className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200" href="#">Terms of Service</a>
      <a className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200" href="#">Documentation Guide</a>
      <a className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200" href="#">Support</a>
      </div>
      </div>
      </footer>
    </div>
  )
}
