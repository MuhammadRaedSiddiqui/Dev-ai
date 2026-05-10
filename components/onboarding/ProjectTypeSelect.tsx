'use client'

import { useState } from 'react'

interface ProjectTypeSelectProps {
  onSelect: (type: string, name: string) => void
}

const PROJECT_TYPES = [
  {
    id: 'saas',
    name: 'SaaS Application',
    description: 'Multi-tenant web application with user authentication and subscriptions',
    icon: '🚀',
  },
  {
    id: 'api',
    name: 'API Service',
    description: 'REST or GraphQL API with authentication, rate limiting, and versioning',
    icon: '🔌',
  },
  {
    id: 'internal_tool',
    name: 'Internal Tool',
    description: 'Admin dashboard or internal workflow automation tool',
    icon: '🛠️',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'iOS/Android app with backend API and offline support',
    icon: '📱',
  },
  {
    id: 'landing_page',
    name: 'Landing Page',
    description: 'Marketing site with waitlist and email collection',
    icon: '🌐',
  },
]

export default function ProjectTypeSelect({ onSelect }: ProjectTypeSelectProps) {
  const [projectName, setProjectName] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleSubmit = () => {
    if (projectName.trim() && selectedType) {
      onSelect(selectedType, projectName.trim())
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="project-name" className="block text-sm font-medium">
          Project Name
        </label>
        <input
          id="project-name"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="My Awesome Project"
          maxLength={100}
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Project Type</label>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`rounded-lg border p-4 text-left transition-colors ${
                selectedType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="font-medium text-sm">{type.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!projectName.trim() || !selectedType}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        Create Project
      </button>
    </div>
  )
}
