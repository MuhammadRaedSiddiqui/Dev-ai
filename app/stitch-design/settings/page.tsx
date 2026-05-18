export default function StitchSettingsPage() {
  return (
    <div className="bg-stitch-vellum-white text-stitch-ink-black flex h-screen overflow-hidden antialiased font-stitch-body-md text-stitch-body-md">
      {/* SideNavBar */}
      <aside className="flex flex-col h-screen py-stitch-section-xl px-stitch-gap-xs bg-stitch-vellum-white text-stitch-ink-black font-stitch-body-sm text-stitch-body-sm docked left-0 h-full w-64 border-r border-stitch-parchment flat no shadows hidden md:flex shrink-0">
      <div className="mb-stitch-gap-lg px-stitch-gap-xs">
      <h1 className="font-stitch-display text-stitch-h4 text-stitch-ink-black">Project Alpha</h1>
      <p className="text-stitch-stone font-stitch-caption text-stitch-caption">V1.0.4</p>
      </div>
      <nav className="flex-1 space-y-1">
      <a className="flex items-center gap-3 px-3 py-2 rounded-stitch-DEFAULT text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 group" href="#">
      <span className="material-symbols-outlined text-xl">dashboard</span>
      <span>Overview</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 rounded-stitch-DEFAULT text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 group" href="#">
      <span className="material-symbols-outlined text-xl">vpn_key</span>
      <span>API Keys</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 rounded-stitch-DEFAULT text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 group" href="#">
      <span className="material-symbols-outlined text-xl">description</span>
      <span>Drafts</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 rounded-stitch-DEFAULT text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 group" href="#">
      <span className="material-symbols-outlined text-xl">rate_review</span>
      <span>Review</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 rounded-stitch-DEFAULT text-stitch-ink-black font-bold bg-stitch-surface-container translate-x-1 transition-transform duration-200" href="#">
      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '\'FILL\' 1' }}>settings</span>
      <span>Settings</span>
      </a>
      </nav>
      <div className="mt-auto px-stitch-gap-xs pt-stitch-gap-lg">
      <button className="w-full py-3 bg-stitch-ink-black text-stitch-snow-white rounded-stitch-input font-stitch-body-sm text-stitch-body-sm hover:bg-stitch-graphite transition-colors duration-200">
                      New Project
                  </button>
      </div>
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-stitch-vellum-white relative">
      {/* TopAppBar (Breadcrumb) */}
      <header className="sticky top-0 z-10 bg-stitch-vellum-white/95 backdrop-blur-sm border-b border-stitch-parchment h-16 flex items-center px-stitch-gap-lg w-full">
      <nav aria-label="Breadcrumb" className="font-stitch-caption text-stitch-caption text-stitch-dusty-gray">
      <ol className="flex items-center space-x-2">
      <li><a className="hover:text-stitch-ink-black transition-colors" href="#">Projects</a></li>
      <li><span className="text-stitch-parchment">/</span></li>
      <li><a className="hover:text-stitch-ink-black transition-colors" href="#">Project Alpha</a></li>
      <li><span className="text-stitch-parchment">/</span></li>
      <li aria-current="page" className="text-stitch-ink-black">Settings</li>
      </ol>
      </nav>
      </header>
      {/* Canvas */}
      <main className="w-full max-w-[800px] mx-auto px-stitch-gap-lg py-stitch-section-xl space-y-stitch-section-xl">
      {/* Page Header */}
      <section>
      <h2 className="font-stitch-h2 text-stitch-h2 text-stitch-ink-black mb-2">Settings</h2>
      <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-dusty-gray">Manage your account configuration and project defaults.</p>
      </section>
      {/* API Configuration */}
      <section className="space-y-6">
      <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black border-b border-stitch-parchment pb-2">API Credentials</h3>
      <div className="space-y-3 max-w-md">
      <label className="block font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black" htmlFor="api_key">Anthropic API Key</label>
      <div className="relative">
      <input className="block w-full bg-stitch-snow-white border border-stitch-parchment rounded-stitch-input px-3 py-2 text-stitch-ink-black font-stitch-body-md text-stitch-body-md placeholder:text-stitch-stone focus:outline-none focus:border-stitch-ink-black focus:ring-1 focus:ring-stitch-ink-black transition-colors" id="api_key" name="api_key" readOnly type="password" value="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxx"/>
      </div>
      <p className="font-stitch-caption text-stitch-caption text-stitch-dusty-gray">Your key is stored locally and never leaves your browser.</p>
      <button className="mt-4 px-6 py-2 border border-stitch-parchment bg-transparent text-stitch-ink-black rounded-stitch-input font-stitch-body-sm text-stitch-body-sm hover:bg-stitch-surface-container-low transition-colors duration-200 inline-block">
                              Update Key
                          </button>
      </div>
      </section>
      {/* Project Preferences */}
      <section className="space-y-6">
      <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black border-b border-stitch-parchment pb-2">Project Defaults</h3>
      <div className="space-y-6 max-w-md">
      <div className="space-y-2">
      <label className="block font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black" htmlFor="doc_format">Default Documentation Format</label>
      <select className="block w-full bg-stitch-snow-white border border-stitch-parchment rounded-stitch-input px-3 py-2.5 text-stitch-ink-black font-stitch-body-md text-stitch-body-md focus:outline-none focus:border-stitch-ink-black focus:ring-1 focus:ring-stitch-ink-black appearance-none cursor-pointer" id="doc_format" name="doc_format">
      <option selected value="markdown">Markdown</option>
      <option value="latex">LaTeX</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stitch-ink-black">
      {/* Dropdown arrow via CSS background or position absolute next to select if needed, handled by appearance-none generally requiring custom arrow if strictly styled, sticking to minimal */}
      </div>
      </div>
      <div className="flex items-center justify-between">
      <div>
      <span className="block font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black">Auto-save Drafts</span>
      <span className="font-stitch-caption text-stitch-caption text-stitch-dusty-gray">Automatically save your work locally.</span>
      </div>
      {/* Toggle */}
      <label className="relative inline-flex items-center cursor-pointer">
      <input checked className="sr-only peer" type="checkbox" value=""/>
      <div className="w-11 h-6 bg-stitch-parchment peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stitch-snow-white after:border-stitch-parchment after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stitch-ink-black"></div>
      </label>
      </div>
      </div>
      </section>
      {/* Account Actions (Danger Zone) */}
      <section className="space-y-6 pt-stitch-gap-lg">
      <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-terra-cotta border-b border-stitch-parchment pb-2">Danger Zone</h3>
      <div className="space-y-4">
      <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-graphite">Permanently delete your local data and reset the session.</p>
      <button className="px-6 py-2 border border-stitch-terra-cotta bg-transparent text-stitch-terra-cotta rounded-stitch-input font-stitch-body-sm text-stitch-body-sm hover:bg-stitch-error-container/20 transition-colors duration-200">
                              Reset Local Storage
                          </button>
      </div>
      </section>
      </main>
      </div>
    </div>
  )
}
