export default function StitchOnboardingPage() {
  return (
    <div className="bg-stitch-vellum-white min-h-screen flex items-center justify-center p-stitch-gap-md font-stitch-body-md text-stitch-ink-black antialiased">
      {/* Main Container - Suppressing navigation per onboarding rules */}
      <main className="w-full max-w-[600px] bg-stitch-vellum-white border border-stitch-parchment p-stitch-section-xl relative">
      {/* Subtle decorative top line referencing a printed page header */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-stitch-parchment"></div>
      <div className="mb-stitch-section-xl">
      <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone block mb-stitch-gap-xs">Step 1 of 2</span>
      <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black tracking-tight mb-4">Initialize Session</h1>
      <p className="font-stitch-body-lg text-stitch-body-lg text-stitch-on-surface-variant max-w-[480px]">
                      To commence scholarly analysis, please provide your Anthropic API credentials. This establishes the foundational reasoning engine for your project.
                  </p>
      </div>
      <form className="space-y-stitch-gap-lg">
      {/* Input Field Group */}
      <div>
      <label className="font-stitch-body-md text-stitch-body-md text-stitch-ink-black block mb-2" htmlFor="api-key">Anthropic API Key</label>
      <div className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stitch-stone text-lg select-none">key</span>
      <input className="w-full bg-stitch-snow-white border border-stitch-parchment rounded-stitch-DEFAULT py-3 pl-10 pr-4 font-stitch-body-md text-stitch-ink-black placeholder-stitch-stone focus:outline-none focus:border-stitch-outline focus:ring-1 focus:ring-stitch-outline transition-colors shadow-sm !border-stitch-error" id="api-key" placeholder="sk-ant-api03-..." style={{ borderRadius: '9.6px' }} type="password"/><p className="text-stitch-terra-cotta text-stitch-caption mt-2">Invalid API key. Please check your credentials and try again.</p>
      </div>
      </div>
      {/* Info Card */}
      <div className="bg-stitch-surface-container-lowest border border-stitch-parchment p-6 flex items-start gap-4">
      <span className="material-symbols-outlined text-stitch-terra-cotta mt-0.5 select-none" data-weight="fill" style={{ fontVariationSettings: '\'FILL\' 1' }}>info</span>
      <div className="font-stitch-body-sm text-stitch-body-sm text-stitch-on-surface-variant space-y-2">
      <p>
                              Your key acts as a direct conduit to the language model. It remains encrypted locally on your device and is never stored on external servers.
                          </p>
      <p>
                              For a comprehensive review of our security measures, please consult the <a className="text-stitch-terra-cotta hover:underline underline-offset-2" href="#">Data Handling Protocol</a>.
                          </p>
      </div>
      </div>
      {/* Actions */}
      <div className="pt-stitch-gap-md flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-stitch-parchment mt-stitch-section-xl">
      <button className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone hover:text-stitch-ink-black transition-colors px-4 py-2 border border-transparent hover:border-stitch-parchment rounded-stitch-DEFAULT w-full sm:w-auto text-center" style={{ borderRadius: '9.6px' }} type="button">
                          Proceed in Mock Mode
                      </button>
      <button className="bg-stitch-ink-black text-stitch-snow-white font-stitch-body-md text-stitch-body-md px-8 py-3 rounded-stitch-DEFAULT hover:bg-stitch-onyx transition-colors w-full sm:w-auto flex items-center justify-center gap-2 font-medium opacity-90" disabled style={{ borderRadius: '9.6px' }} type="submit"><span className="material-symbols-outlined animate-spin">progress_activity</span></button>
      </div>
      </form>
      </main>
    </div>
  )
}
