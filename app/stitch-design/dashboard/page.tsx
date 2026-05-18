import Image from 'next/image'

export default function StitchDashboardPage() {
  return (
    <div className="bg-stitch-background text-stitch-ink-black font-stitch-body-md antialiased min-h-screen flex">
      {/* SideNavBar Component */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-stitch-vellum-white border-r border-stitch-parchment flex flex-col py-stitch-section-xl px-stitch-gap-xs z-20">
      {/* Header */}
      <div className="px-3 mb-stitch-gap-lg flex items-center gap-3">
      <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQbSeu3ADwVGl-LO_NFP466TLJsjQ7thdXyy6EMC-mU1uNDRo1hBLBg0VY0XSfg4EUIeVfYaEww-8RL2_yus-cuCoWACDWYrPwL98JoENrW9gNyQrg_WZ5auPuvPdRat-AXnnDCMScH5mX7nbW7z4Y8idA1NG0kdS-DukearScDUP0Gc8iOOnQ2xgTdanuUNXdPmpDSQqJp--he8Wd1d6zw9EdMfXbNsI6t8vNWrgLxPsvQjzUWemmWnZunRKXTxVwLA12rBmcVec" alt="" width={40} height={40} className="w-10 h-10 rounded-stitch-DEFAULT object-cover border border-stitch-parchment" />
      <div>
      <h2 className="font-stitch-display text-stitch-h4 text-stitch-ink-black">Project Alpha</h2>
      <p className="font-stitch-caption text-stitch-caption text-stitch-stone mt-0.5">V1.0.4</p>
      </div>
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1">
      {/* Active State: Overview */}
      <a className="flex items-center gap-3 px-3 py-2 text-stitch-ink-black font-bold bg-stitch-surface-container translate-x-1 transition-transform duration-200 rounded-none" href="#">
      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>dashboard</span>
      <span className="font-stitch-body-sm text-stitch-body-sm">Overview</span>
      </a>
      {/* Inactive States */}
      <a className="flex items-center gap-3 px-3 py-2 text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 rounded-none" href="#">
      <span className="material-symbols-outlined text-[20px]">vpn_key</span>
      <span className="font-stitch-body-sm text-stitch-body-sm">API Keys</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 rounded-none" href="#">
      <span className="material-symbols-outlined text-[20px]">description</span>
      <span className="font-stitch-body-sm text-stitch-body-sm">Drafts</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 rounded-none" href="#">
      <span className="material-symbols-outlined text-[20px]">rate_review</span>
      <span className="font-stitch-body-sm text-stitch-body-sm">Review</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 text-stitch-stone hover:bg-stitch-surface-container-low transition-colors duration-200 rounded-none" href="#">
      <span className="material-symbols-outlined text-[20px]">settings</span>
      <span className="font-stitch-body-sm text-stitch-body-sm">Settings</span>
      </a>
      </nav>
      {/* CTA */}
      <div className="px-3 mt-auto pt-stitch-gap-md border-t border-stitch-parchment">
      <button className="w-full py-2 px-4 border border-stitch-outline-variant bg-transparent text-stitch-ink-black hover:bg-stitch-surface-container-low transition-colors duration-200 rounded-stitch-DEFAULT font-stitch-label-caps text-stitch-label-caps uppercase tracking-wider flex items-center justify-center gap-2">
      <span className="material-symbols-outlined text-[16px]">add</span>
                      New Project
                  </button>
      </div>
      </aside>
      {/* Main Content Canvas */}
      <main className="ml-64 flex-1 p-stitch-section-xl max-w-stitch-container-max mx-auto">
      {/* Header Area */}
      <header className="flex justify-between items-end mb-stitch-gap-lg border-b border-stitch-parchment pb-stitch-gap-md">
      <div>
      <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black tracking-tight">Your Projects</h1>
      <p className="font-stitch-body-lg text-stitch-body-lg text-stitch-stone mt-2 max-w-2xl">Manage your active documentation repositories and editorial drafts.</p>
      </div>
      </header>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stitch-gap-md">
      {/* Project Card 1: In Progress */}
      <article className="group bg-stitch-vellum-white border border-stitch-parchment p-stitch-gap-md flex flex-col min-h-[220px] rounded-stitch-DEFAULT hover:border-stitch-outline transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
      <span className="inline-flex items-center px-2 py-1 bg-stitch-surface-container-high border border-stitch-parchment rounded-full font-stitch-label-caps text-stitch-label-caps text-stitch-ink-black uppercase">
                              Integration Guide
                          </span>
      <button className="text-stitch-stone hover:text-stitch-ink-black transition-colors rounded-stitch-DEFAULT">
      <span className="material-symbols-outlined">more_horiz</span>
      </button>
      </div>
      <div className="mb-6">
      <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mb-2">Core API Reference</h3>
      <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone line-clamp-2">Complete structural overhaul of the primary authentication endpoints and rate limiting documentation.</p>
      </div>
      <div className="mt-auto pt-4 border-t border-stitch-parchment flex justify-between items-center">
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-stitch-terra-cotta"></div>
      <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-terra-cotta uppercase tracking-wide">In Progress</span>
      </div>
      <span className="font-stitch-caption text-stitch-caption text-stitch-stone">Updated 4h ago</span>
      </div>
      </article>
      {/* Project Card 2: Complete */}
      <article className="group bg-stitch-vellum-white border border-stitch-parchment p-stitch-gap-md flex flex-col min-h-[220px] rounded-stitch-DEFAULT hover:border-stitch-outline transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
      <span className="inline-flex items-center px-2 py-1 bg-stitch-surface-container-high border border-stitch-parchment rounded-full font-stitch-label-caps text-stitch-label-caps text-stitch-ink-black uppercase">
                              SDK Manual
                          </span>
      <button className="text-stitch-stone hover:text-stitch-ink-black transition-colors rounded-stitch-DEFAULT">
      <span className="material-symbols-outlined">more_horiz</span>
      </button>
      </div>
      <div className="mb-6">
      <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mb-2">iOS Authentication</h3>
      <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone line-clamp-2">Step-by-step tutorial for implementing OAuth2 via the native Swift SDK with code samples.</p>
      </div>
      <div className="mt-auto pt-4 border-t border-stitch-parchment flex justify-between items-center">
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-stitch-outline"></div>
      <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-ink-black uppercase tracking-wide">Complete</span>
      </div>
      <span className="font-stitch-caption text-stitch-caption text-stitch-stone">Approved Oct 12</span>
      </div>
      </article>
      {/* Empty State / Create New Card (Bento Grid Style) */}
      <button className="bg-stitch-surface-container border border-dashed border-stitch-outline-variant p-stitch-gap-md flex flex-col items-center justify-center min-h-[220px] rounded-stitch-DEFAULT hover:bg-stitch-surface-container-high hover:border-stitch-outline transition-all duration-300 group text-center">
      <div className="w-16 h-16 bg-stitch-secondary-fixed/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
      <span className="material-symbols-outlined text-[32px] text-stitch-terra-cotta">post_add</span>
      </div>
      <h3 className="font-stitch-h4 text-stitch-h4 text-stitch-ink-black mb-1">Create Project</h3>
      <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone max-w-[200px]">Initialize a new academic structure for your documentation.</p>
      </button>
      </div>
      </main>
    </div>
  )
}
