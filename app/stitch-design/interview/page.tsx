export default function StitchInterviewPage() {
  return (
    <div className="bg-stitch-background text-stitch-on-background font-stitch-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-stitch-surface dark:bg-stitch-ink-black docked full-width top-0 border-b border-stitch-parchment dark:border-stitch-graphite flat no shadows flex justify-between items-center w-full px-stitch-gap-lg max-w-stitch-container-max mx-auto h-16">
      <div className="flex items-center gap-stitch-gap-md">
      <span className="font-stitch-display text-stitch-h3 font-normal text-stitch-ink-black dark:text-stitch-snow-white">DevDocs AI</span>
      <nav className="hidden md:flex gap-stitch-gap-md ml-stitch-gap-lg">
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-stone dark:text-stitch-dusty-gray hover:text-stitch-terra-cotta transition-colors duration-200" href="#">Workspace</a>
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-ink-black dark:text-stitch-snow-white border-b border-stitch-ink-black dark:border-stitch-snow-white pb-1 opacity-80 transition-all duration-100" href="#">Documentation</a>
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-stone dark:text-stitch-dusty-gray hover:text-stitch-terra-cotta transition-colors duration-200" href="#">Project Hub</a>
      <a className="font-stitch-body-md text-stitch-body-md text-stitch-stone dark:text-stitch-dusty-gray hover:text-stitch-terra-cotta transition-colors duration-200" href="#">Resources</a>
      </nav>
      </div>
      <div className="flex items-center gap-stitch-gap-md">
      <button className="font-stitch-body-md text-stitch-body-md text-stitch-stone dark:text-stitch-dusty-gray hover:text-stitch-terra-cotta transition-colors duration-200">Sign In</button>
      <button className="bg-stitch-ink-black text-stitch-snow-white font-stitch-body-md text-stitch-body-md px-stitch-gap-md py-stitch-unit hover:bg-stitch-surface-tint transition-colors duration-200 rounded-[9.6px]">Get Started</button>
      </div>
      </header>
      {/* Main Content Layout (3 Columns) */}
      <main className="flex-grow flex flex-col md:flex-row w-full max-w-[1440px] mx-auto overflow-hidden">
      {/* Left Column: Domain Progress */}
      <aside className="w-full md:w-64 bg-stitch-vellum-white dark:bg-stitch-onyx border-r border-stitch-parchment dark:border-stitch-graphite flex flex-col h-full overflow-y-auto p-stitch-gap-md">
      <h2 className="font-stitch-h4 text-stitch-h4 text-stitch-ink-black dark:text-stitch-snow-white mb-stitch-gap-md">Domain Progress</h2>
      <div className="mb-stitch-gap-lg">
      <div className="flex justify-between items-center mb-stitch-unit">
      <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-stone">Overall Completion</span>
      <span className="font-stitch-caption text-stitch-caption text-stitch-ink-black font-semibold">45%</span>
      </div>
      <div className="w-full bg-stitch-surface-container rounded-full h-2">
      <div className="bg-stitch-ink-black h-2 rounded-full" style={{ width: '45%' }}></div>
      </div>
      </div>
      <nav className="flex flex-col gap-stitch-unit">
      <div className="flex items-center gap-stitch-unit p-stitch-unit bg-stitch-surface-container-low border border-stitch-parchment rounded-[9.6px]">
      <span className="material-symbols-outlined text-stitch-terra-cotta" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black line-through text-opacity-50">System Context</span>
      </div>
      <div className="flex items-center gap-stitch-unit p-stitch-unit bg-stitch-surface-container-low border border-stitch-parchment rounded-[9.6px]">
      <span className="material-symbols-outlined text-stitch-terra-cotta" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black line-through text-opacity-50">Data Models</span>
      </div>
      <div className="flex items-center gap-stitch-unit p-stitch-unit bg-stitch-surface border-l-2 border-l-ink-black rounded-[9.6px]">
      <span className="material-symbols-outlined text-stitch-ink-black">radio_button_unchecked</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black font-semibold">API Endpoints</span>
      </div>
      <div className="flex items-center gap-stitch-unit p-stitch-unit hover:bg-stitch-surface-container-low transition-colors rounded-[9.6px]">
      <span className="material-symbols-outlined text-stitch-stone">radio_button_unchecked</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone">Security Posture</span>
      </div>
      <div className="flex items-center gap-stitch-unit p-stitch-unit hover:bg-stitch-surface-container-low transition-colors rounded-[9.6px]">
      <span className="material-symbols-outlined text-stitch-stone">radio_button_unchecked</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone">Deployment Strats</span>
      </div>
      </nav>
      </aside>
      {/* Center Column: Chat Interface */}
      <section className="flex-grow flex flex-col bg-stitch-surface relative min-w-0 border-r border-stitch-parchment dark:border-stitch-graphite">
      {/* Chat Header */}
      <div className="px-stitch-gap-md py-stitch-unit border-b border-stitch-parchment bg-stitch-vellum-white flex justify-between items-center sticky top-0 z-10">
      <h1 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black">API Endpoints Review</h1>
      <button className="text-stitch-stone hover:text-stitch-ink-black transition-colors">
      <span className="material-symbols-outlined">more_vert</span>
      </button>
      </div>
      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto p-stitch-gap-md flex flex-col gap-stitch-gap-md">
      {/* AI Message */}
      <div className="flex gap-stitch-gap-xs max-w-[85%]">
      <div className="w-8 h-8 rounded-full bg-stitch-ink-black flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-stitch-snow-white text-[18px]">psychology</span>
      </div>
      <div className="bg-stitch-vellum-white border border-stitch-parchment rounded-lg rounded-tl-none p-stitch-gap-xs px-stitch-gap-md">
      <p className="font-stitch-body-md text-stitch-body-md text-stitch-ink-black">Let's move on to the API Endpoints. Can you outline the primary REST resources for the core application?</p>
      </div>
      </div>
      {/* User Message */}
      <div className="flex gap-stitch-gap-xs max-w-[85%] self-end flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-stitch-surface-container-high flex items-center justify-center flex-shrink-0 border border-stitch-parchment">
      <span className="material-symbols-outlined text-stitch-ink-black text-[18px]">person</span>
      </div>
      <div className="bg-stitch-surface-container-low border border-stitch-parchment rounded-lg rounded-tr-none p-stitch-gap-xs px-stitch-gap-md">
      <p className="font-stitch-body-md text-stitch-body-md text-stitch-ink-black">Sure. The main ones are `/users`, `/projects`, and `/deployments`. Users can have many projects.</p>
      </div>
      </div>
      {/* AI Message (Streaming effect simulated) */}
      <div className="flex gap-stitch-gap-xs max-w-[85%]">
      <div className="w-8 h-8 rounded-full bg-stitch-ink-black flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-stitch-snow-white text-[18px]">psychology</span>
      </div>
      <div className="bg-stitch-vellum-white border border-stitch-parchment rounded-lg rounded-tl-none p-stitch-gap-xs px-stitch-gap-md">
      <p className="font-stitch-body-md text-stitch-body-md text-stitch-ink-black animate-fadeIn">Excellent. For `/projects`, what are the supported HTTP methods, and are there any nested routes we should document? <span className="inline-block w-[2px] h-[16px] bg-[#141413] animate-blink align-middle ml-1"></span></p>
      </div>
      </div>
      </div>
      {/* Chat Input Area */}
      <div className="p-stitch-gap-md border-t border-stitch-parchment bg-stitch-surface sticky bottom-0">
      <div className="relative flex items-end bg-stitch-snow-white border border-stitch-parchment p-stitch-unit focus-within:border-stitch-outline transition-colors rounded-[9.6px]">
      <textarea className="w-full bg-stitch-snow-white border-none focus:ring-0 resize-none font-stitch-body-md text-stitch-body-md text-stitch-ink-black placeholder:text-stitch-stone min-h-[44px] max-h-[120px]" placeholder="Describe the API endpoints..."></textarea>
      <button className="bg-stitch-ink-black text-stitch-snow-white p-stitch-unit ml-stitch-unit hover:bg-stitch-surface-tint transition-colors flex items-center justify-center flex-shrink-0 rounded-[9.6px]">
      <span className="material-symbols-outlined text-[20px]">send</span>
      </button>
      </div>
      <p className="font-stitch-caption text-stitch-caption text-stitch-stone text-center mt-stitch-unit">Press Enter to send, Shift+Enter for new line.</p>
      </div>
      </section>
      {/* Right Column: Documentation Preview */}
      <aside className="w-full md:w-[400px] bg-stitch-vellum-white border-l border-stitch-parchment flex flex-col h-full overflow-hidden" style={{ transition: 'transform 400ms cubic-bezier(0.4, 0, 0.1, 1)' }}>
      <div className="px-stitch-gap-md py-stitch-unit border-b border-stitch-parchment flex justify-between items-center bg-stitch-surface sticky top-0 z-10">
      <h2 className="font-stitch-h4 text-stitch-h4 text-stitch-ink-black flex items-center gap-stitch-unit">
      <span className="material-symbols-outlined text-stitch-stone">description</span>
                          Live Document
                      </h2>
      <div className="flex gap-stitch-unit">
      <button className="text-stitch-stone hover:text-stitch-ink-black transition-colors" title="Copy Markdown">
      <span className="material-symbols-outlined text-[20px]">content_copy</span>
      </button>
      <button className="text-stitch-stone hover:text-stitch-ink-black transition-colors" title="Expand Preview">
      <span className="material-symbols-outlined text-[20px]">open_in_full</span>
      </button>
      </div>
      </div>
      <div className="flex-grow overflow-y-auto p-stitch-gap-md prose prose-sm max-w-none">
      <h1 className="font-stitch-h2 text-stitch-h2 font-stitch-display text-stitch-ink-black mb-stitch-gap-md border-b border-stitch-parchment pb-stitch-unit">System Architecture</h1>
      <h2 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mt-stitch-gap-md mb-stitch-unit">1. System Context</h2>
      <p className="font-stitch-body-md text-stitch-body-md text-stitch-on-surface-variant mb-stitch-gap-md">The core system orchestrates interactions between the user dashboard, the analysis engine, and the primary data store.</p>
      <h2 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mt-stitch-gap-md mb-stitch-unit">2. Data Models</h2>
      <ul className="list-disc pl-stitch-gap-md mb-stitch-gap-md font-stitch-body-sm text-stitch-body-sm text-stitch-on-surface-variant space-y-1">
      <li><strong>User:</strong> Core identity entity.</li>
      <li><strong>Project:</strong> Represents a documentation workspace.</li>
      </ul>
      <h2 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mt-stitch-gap-md mb-stitch-unit">3. API Endpoints (Draft)</h2>
      <div className="bg-stitch-surface-container-low border border-stitch-parchment p-stitch-gap-xs mb-stitch-gap-md font-mono text-stitch-caption text-stitch-ink-black overflow-x-auto rounded-[9.6px]">
      <pre><code>GET    /api/v1/users
      GET    /api/v1/projects
      POST   /api/v1/projects
      GET    /api/v1/deployments</code></pre>
      </div>
      <p className="font-stitch-caption text-stitch-caption text-stitch-stone italic mt-stitch-unit border-l-2 border-stitch-parchment pl-stitch-unit">AI note: Awaiting details on supported methods for nested routes.</p>
      </div>
      </aside>
      </main>
    </div>
  )
}
