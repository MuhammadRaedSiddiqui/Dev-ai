export default function StitchNewProjectModalPage() {
  return (
    <div className="bg-stitch-background min-h-screen flex items-center justify-center font-stitch-body-lg text-stitch-body-lg text-stitch-on-background relative">
      {/* Backdrop Blur */}
      <div className="fixed inset-0 bg-stitch-surface/30 backdrop-blur-[4px] z-40"></div>
      {/* Modal Container */}
      <div className="relative z-50 w-full max-w-[600px] bg-stitch-vellum-white border border-stitch-parchment rounded p-stitch-gap-md mx-4 shadow-none">
      {/* Header */}
      <div className="mb-stitch-gap-md">
      <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mb-1">Create New Project</h3>
      <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-dusty-gray">Initialize a new scholarly documentation workspace for your repository.</p>
      </div>
      {/* Input Section */}
      <div className="mb-stitch-gap-md flex flex-col gap-2">
      <label className="font-stitch-label-caps text-stitch-label-caps text-stitch-dusty-gray uppercase" htmlFor="projectName">PROJECT NAME</label>
      <input className="w-full bg-stitch-snow-white border border-[rgba(31,30,29,0.15)] rounded px-3 py-2 font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black placeholder:text-stitch-stone focus:outline-none focus:ring-1 focus:ring-stitch-ink-black focus:border-stitch-ink-black shadow-none transition-colors" id="projectName" placeholder="e.g., Quantum Analysis Engine" type="text"/>
      </div>
      {/* Project Type Section */}
      <div className="mb-stitch-gap-md flex flex-col gap-2">
      <span className="font-stitch-label-caps text-stitch-label-caps text-stitch-dusty-gray uppercase">PROJECT TYPE</span>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Option 1 */}
      <button className="flex flex-col items-start p-4 bg-stitch-vellum-white border border-stitch-parchment rounded hover:border-stitch-graphite transition-colors text-left group" type="button">
      <span className="material-symbols-outlined text-stitch-ink-black mb-2" data-icon="web">web</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black font-medium">SaaS Application</span>
      </button>
      {/* Option 2 */}
      <button className="flex flex-col items-start p-4 bg-stitch-vellum-white border border-stitch-parchment rounded hover:border-stitch-graphite transition-colors text-left group" type="button">
      <span className="material-symbols-outlined text-stitch-ink-black mb-2" data-icon="api">api</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black font-medium">API Service</span>
      </button>
      {/* Option 3 */}
      <button className="flex flex-col items-start p-4 bg-stitch-vellum-white border border-stitch-parchment rounded hover:border-stitch-graphite transition-colors text-left group" type="button">
      <span className="material-symbols-outlined text-stitch-ink-black mb-2" data-icon="build">build</span>
      <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black font-medium">Internal Tool</span>
      </button>
      </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 mt-stitch-gap-md pt-stitch-gap-xs">
      <button className="px-4 py-2 bg-transparent text-stitch-ink-black font-stitch-body-sm text-stitch-body-sm rounded hover:bg-stitch-surface-container-low transition-colors border border-transparent" type="button">
                      Cancel
                  </button>
      <button className="px-6 py-2 bg-stitch-ink-black text-stitch-snow-white font-stitch-body-sm text-stitch-body-sm font-medium rounded hover:bg-stitch-graphite transition-colors shadow-none" type="button">
                      Create Project
                  </button>
      </div>
      </div>
    </div>
  )
}
